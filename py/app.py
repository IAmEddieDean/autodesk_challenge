from flask import Flask, request, abort
from Bio.Seq import Seq
from Bio import SeqIO
import os, json

reference_organisms = {}

for filename in os.listdir('./db'):
    rec = SeqIO.read('./db/'+filename, 'fasta')
    reference_organisms[rec.id] = rec
    # print(rec.keys())

print('reference organisms available', reference_organisms.keys())

# entrez_filter = '"Chlorella PBCV-1 virus"[Organism] OR "EhV-86"[Organism] OR "Acanthocystis turfacea Chlorella virus 1"[Organism] OR "Chlorella virus AR158"[Organism] OR "Cafeteria roenbergensis virus BV-PW1"[Organism] OR "Acanthamoeba polyphaga moumouvirus"[Organism] OR "Pithovirus sibericum"[Organism] OR "Megavirus chiliensis"[Organism] OR "Bacillus megaterium"[Organism] OR "Mollivirus sibericum"[Organism]'
app = Flask(__name__)

@app.route('/')
def index():
    organisms = reference_organisms.keys()
    obj = {"msg": "these are the organisms available", "organisms": json.dumps(organisms)}
    return json.dumps(obj)

@app.route('/', methods=['POST'])
def find_match():
    try:
        req_json = request.get_json()
        query = req_json['sequence']
        seq = Seq(query)
    except:
        return abort(400)

    print(query)
    for ref in reference_organisms:
        idx = reference_organisms[ref].seq.find(seq, 0);
        print('this is the index', idx)
        if idx > -1:
            match = reference_organisms[ref]
            return_val = {
                "organism_id": match.id,
                "organism_desc": match.description,
                "sequence_location": idx
            }
            return json.dumps(return_val)
    abort(400)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

# example = "TCTGCTGTTCGTTTCATGTGTGCAACAACTCGATCTTTTCCATTCCGGCATGCTTTACAATAAACCCCAAAAAATCGTTCGCGATATAACTCATCACTTAAGCACGATAAACATGCTTTCTTGTACAAACGCCTAAGCTCTGGTGTTTTCTGACT"
# ex = Seq(example);
#
# def find_match():
#     for ref in reference_organisms:
#         idx = reference_organisms[ref].seq.find(ex, 0);
#         print('this is an index', idx)
#         if idx > -1:
#             match = reference_organisms[ref]
#             return_val = {
#                 "organism_id": match.id,
#                 "organism_desc": match.description,
#                 "sequence_location": idx
#             }
#             return json.dumps(return_val)
#
#
# match = find_match()
# print(match)
