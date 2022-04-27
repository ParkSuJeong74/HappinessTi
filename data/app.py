import joblib
from pymongo import MongoClient
import datetime
import pandas as pd
import numpy as np
import json
db='mongodb+srv://crackingdevs:elice1234@crackingdevs.guuao.mongodb.net/crackingdevs'
collection=db.my_collection
df=pd.read_csv('2022_google_csv.csv')
test={
    'name':df[df['country']=='South Korea']['country'].to_list(),
    'Happiness score':df[df['country']=='South Korea']['Happiness Score'].to_list(),
}
result=json.dumps(test)
collection.insert_one(result)
