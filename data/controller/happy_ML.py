from flask import Flask, render_template, request, jsonify, Blueprint
import numpy as np
import pandas as pd
import joblib

LinModel = joblib.load('./file/Linhappy99x7.pkl')

df = pd.read_csv("./file/happy_data2.csv")

ml = Blueprint('ml',__name__)

@ml.route('/')
def man():
    return render_template('home.html')

@ml.route('/predict', methods=['POST'])
def home():
    params = request.get_json()
    
    myCountry = params["myCountry"]

    kw = params["kw"]
    gdp = kw * 8
    
    life_expectancy = params["lifeExpectancy"]
  
    social_num = params["social"]
    social_support = social_num / 100
    
    generosity_num = params["generosity"]
    generosity = generosity_num / 100
    
    freedom_num = params["freedom"]
    freedom = freedom_num / 100
    
    perceptions_num = params["perceptions"]
    perceptions = perceptions_num / 100
    
    NorDystopia = params["NorDystopia"]

    
    lin_country = {"GDP_PER_PERSON": [gdp] ,"HEALTHY_LIFE_EXPECTANCY": [life_expectancy] ,"SOCIAL_SUPPORT": [social_support] 
              ,"GENEROSITY": [generosity], "FREEDOM": [freedom], "PERCEPTIONS_OF_CORRUPTION": [perceptions], "NorDystopia" : [NorDystopia]}
    
    lin_country = pd.DataFrame(lin_country)

    lin_prob = LinModel.predict(lin_country)
    
    reHAPPINESS_SCORE = abs(df['happinessScore'] - lin_prob).idxmin()
    reCountry = df.iloc[reHAPPINESS_SCORE,1]
    
    myCountryScoreList = df[df['country'] == myCountry]
    myCountryScore = myCountryScoreList['happinessScore']
    

    if str(lin_prob) > str(myCountryScore):
        happyType = "행복"
    elif str(lin_prob) == str(myCountryScore):
        happyType = "동일"
    else:
        happyType = "불행"
   
    reCountry_flag = 'https://countryflagsapi.com/png/' + reCountry.replace(" ", "%20")
    myCountryFlag = 'https://countryflagsapi.com/png/' + myCountry.replace(" ", "%20")
    
    return jsonify({"myCountry" : myCountry, "myCountryFlag" : myCountryFlag,  "happyType" : happyType, "reCountry" : reCountry, "reCountryFlag" : reCountry_flag,"lin_prob" :str(lin_prob), "myCountryScore" :str(myCountryScore) })
