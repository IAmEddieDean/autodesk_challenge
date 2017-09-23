                                                                                      
                                                                                      
                 // | |                                                               
                //__| |            __  ___  ___      ___   /  ___      ___     / ___  
               / ___  |   //   / /  / /   //   ) ) //   ) / //___) ) ((   ) ) //\ \   
              //    | |  //   / /  / /   //   / / //   / / //         \ \    //  \ \  
             //     | | ((___( (  / /   ((___/ / ((___/ / ((____   //   ) ) //    \ \ 
                                                                                      
                                                                                      
                  //   ) )                                                            
                 //        / __      ___     // //  ___       __      ___      ___    
                //        //   ) ) //   ) ) // // //___) ) //   ) ) //   ) ) //___) ) 
               //        //   / / //   / / // // //       //   / / ((___/ / //        
              ((____/ / //   / / ((___( ( // // ((____   //   / /   //__   ((____     




Thanks for a fun and demanding code challenge!
A couple quick things to note:
* I'm not certain this does what it's supposed to do, more below
* I'm not skilled with Python or Docker/Compose... yet
* I am an extremely curious person by nature, so the science-y bits were an additional bit of fun, though frequently perplexing

## Setup
Assuming you have git and docker/compose on your machine -

Clone this repo
```sh
git clone ....
```
Run
```sh
docker-compose up
```
Go to `http://localhost:3000` in your browser - (optional: marvel at my lack of design skills)

## What it does (and hopefully it's the right thing)
Upon entering a snippet of a DNA sequence into the text field, a node process sends a request to a python service.
This python service creates a Seq object from the provided snippet and compares it to the list of available genomes.
If a match is found, the service returns a simple JSON object containing the id of the organism, the organism's
long name, and the index of the genome where the beginning of the match is found. Node takes this object and stores
it in redis as a string, which can be parsed later. Once the node process responds to the frontend, the table is
refreshed and the new data is seen as a new row.

## Comments on the challenge
Without pointing out too much in a public readme, there were a couple flaws in the challenge prompt:
* The provided list are all complete genomes, not proteins
* The above bullet makes it pretty challenging to figure out what you *should* do, and even after a clarification over email, I was still perhaps confused... I guess that's up to you to decide.
* Hopefully redis will serve the purpose of data retention in this case, as the prompt does mention this is to be treated as a PoC. Besides, I love redis.
* I did not go through the trouble of managing concurrent requests in python... sorry. I wasn't ignoring the challenge prompt, it simply wasn't necessary (in my humble opinion,) for this first pass. Not only that, I don't know what framework - if any - Autodesk is using in python, and they all do it a bit differently.

### In closing
Thank you very much for this fun and - for me - unique challenge. I sincerely hope it's up to snuff (enough) to warrant an in-office interview.
*- Chris*
