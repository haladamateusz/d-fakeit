import os
import sys
from modelling.generate_transcripts import generate_transcripts_from_audio
from representations.Client import Client
import string

class BankClient:
    def __init__(self, file_path, bank_id=None):
        '''
            Initialize the BankClient object
            This takes a csv file as input and populates the clients dictionary.
            INPUTS:
            file_path: str: Path to the csv file containing the client information
            bank_id: str: Unique identifier for the bank
        '''
        if bank_id is None:
            bank_id = os.path.basename(file_path).split('.')[0]
        self.bank_id = bank_id
        self.clients = {}
        self.file_path = file_path

    def populate_clients(self, file_path):
        '''
            Populate the clients dictionary with the client information from the csv file
            INPUTS:
            file_path: str: Path to the csv file containing the client information
        '''
        ##TODO: Ensure that the clients have already not been populated. If they have been, return
        pass

    def get_embedding(self, audio_file_name):
        '''
            Get the embedding for the audio file
            INPUTS:
            audio_file_name: str: Path to the audio file
            OUTPUT:
            embedding: np.array: The embedding for the audio file
        '''
        pass

    def get_closest_client(self, embedding):
        '''
            Get the closest client to the embedding. Right now as first step, we will be using cosine similarity to obtain a ranking of the clients
            INPUTS:
            embedding: np.array: The embedding for the audio file
            OUTPUT:
            closest_client: Client: The closest client to the embedding
        '''
        pass