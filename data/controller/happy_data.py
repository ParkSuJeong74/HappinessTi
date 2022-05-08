import csv
from pymongo import MongoClient


with open ("../file/happy_data2.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)
    data = {"Happiness": []}
    for row in reader:
        data["Happiness"].append({"rank":row[0],"country":row[1], "happinessScore":float(row[2]),
        "dystopia":float(row[3]),"gdp":float(row[4]),"socialSupport":float(row[5]),"health":float(row[6]),
        "freedom":float(row[7]),"generosity":float(row[8]),"corruptionPerceptions":float(row[9]),  "continent":row[11], "count": 0 })


client = MongoClient("mongodb+srv://crackingdevs:elice1234@crackingdevs.guuao.mongodb.net/crackingdevs")
for i in data["Happiness"]:
    db = client['crackingdevs']
    dpInsert = db.happinesses.insert_one(i)
