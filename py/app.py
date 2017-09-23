# @file app.py
# @author Chris Oyler <christopher.oyler@gmail.com>
# @date 9/23/2017
# @desc an extremely simple python app that spins up a webserver with two routes -
# - and creates a "database" of organisms' fasta formatted genomes, which allows -
# - a user to search for a match based on a sequence of DNA

from flask import Flask, request, abort
from Bio.Seq import Seq
from Bio import SeqIO
import os, json

reference_organisms = {}

for filename in os.listdir('./db'):
    rec = SeqIO.read('./db/'+filename, 'fasta')
    reference_organisms[rec.id] = rec

print('reference organisms available', reference_organisms.keys())

# I feel like I should have left in the code that actually used this Entrez filter
# c'est la vie... it was working, it was just really slow going
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
