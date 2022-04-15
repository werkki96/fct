from django.db import models

# Create your models here.
from neo4j import GraphDatabase
NEO4J_IP = '223.195.38.211'
NEO4J_PORT = '7687'
NEO4J_DATABASE = 'asn'
NEO4J_URL = f'bolt://{NEO4J_IP}:{NEO4J_PORT}/{NEO4J_DATABASE}'
NEO4J_ID = 'fct'
NEO4J_PW = 'alfoehwjs'
class Neo4jDriver:
    def __init__(self, uri=NEO4J_URL, user=NEO4J_ID, password=NEO4J_PW, database=NEO4J_DATABASE):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))
        self.session = self.driver.session(database=database)

    def close(self):
        self.session.close()
        self.driver.close()

    def run_query(self, query):
        results = self.session.run(query)
        return results

    '''
    session = Neo4JDriver()
    query = '[query]'
    response = session.run_query(query=query)
    row["추출 속성"] for row in response]
    '''