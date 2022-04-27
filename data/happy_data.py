import csv
from pymongo import MongoClient

dict_from_csv = {}

with open ("./file/2022_google_csv.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)
    data = {"Happiness": []}
    for row in reader:
        data["Happiness"].append({"Rank":row[0],"country":row[1], "happinessScore":row[2],"dystopia":row[3],"gdp":row[4],"socialSupport":row[5],"health":row[6],"freedom":row[7],"generosity":row[8],"corruptionPerceptions":row[9] })
c = data["Happiness"]


client = MongoClient("")

for i in c: 
    db = client['crackingdevs']
    dpInsert = db.happinesses.insert_one(i)

db = client['test'] # test-db라는 이름의 데이터베이스에 접속
