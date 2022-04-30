import csv
from pymongo import MongoClient


with open ("../file/2022_google_csv.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)
    data = {"Happiness": []}
    for row in reader:
        data["Happiness"].append({"Rank":row[0],"country":row[1], "happinessScore":row[2],
        "dytopia":row[3],"gdp":row[4],"socialSupport":row[5],"health":row[6],
        "freedom":row[7],"generosity":row[8],"corruptionPerceptions":row[9], "count": 0 })


client = MongoClient("mongodb+srv://crackingdevs:elice1234@crackingdevs.guuao.mongodb.net/crackingdevs")
for i in data["Happiness"]:
    db = client['crackingdevs']
    dpInsert = db.happinesses.insert_one(i)