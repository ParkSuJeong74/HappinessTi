import csv
from pymongo import MongoClient


with open ("./file/2022_google_csv.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        dic={'happinessScore': row['Happiness score'],
         'gdp': row['Explained by: GDP per capita']}


client = MongoClient("mongodb+srv://kimdahyeon:dnjs1569@cluster0.wrb2k.mongodb.net/myFirstDatabase")

# db = client.test_database
db = client['test'] # test-db라는 이름의 데이터베이스에 접속