from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import joblib

LinModel = joblib.load('Linhappy99x7.pkl')

df = pd.read_csv("happy99x7.csv")

app = Flask(__name__)

@app.route('/')
def man():
    return render_template('home.html')

@app.route('/predict', methods=['GET'])
def home():
    
    params = request.get_json()
    
    myCountry = params["myCountry"]
    
    kw = params["kw"]
    gdp = kw * 8
    
    lifeExpectancy = params["lifeExpectancy"]
  
    socialNum = params["social"]
    socialSupport = socialNum / 100
    
    generosity_num = params["generosity"]
    generosity = generosity_num / 100
    
    freedom_num = params["freedom"]
    freedom = freedom_num / 100
    
    perceptions_num = params["perceptions"]
    perceptions = perceptions_num / 100
    
    NorDystopia = params["NorDystopia"]

    
    lin_country = {"GDP_PER_PERSON": [gdp] ,"HEALTHY_LIFE_EXPECTANCY": [lifeExpectancy] ,"SOCIAL_SUPPORT": [socialSupport] 
              ,"GENEROSITY": [generosity], "FREEDOM": [freedom], "PERCEPTIONS_OF_CORRUPTION": [perceptions], "NorDystopia" : [NorDystopia]}
    
    lin_country = pd.DataFrame(lin_country)

    lin_prob = LinModel.predict(lin_country)
    
    reHAPPINESS_SCORE = abs(df['HAPPINESS_SCORE'] - lin_prob).idxmin()
    reCountry = df.iloc[reHAPPINESS_SCORE,1]
   
    if reHAPPINESS_SCORE<5:
        happyType = "불행"
    elif 5<=reHAPPINESS_SCORE<=6:
        happyType = "보통"
    else:
        happyType = "행복"
   
    reCountry_flag = 'https://countryflagsapi.com/png/' + reCountry
    myCountryFlag = 'https://countryflagsapi.com/png/' + myCountry
    
    return jsonify({"myCountry" : myCountry, "myCountryFlag" : myCountryFlag,  "happyType" : happyType, "reCountry" : reCountry, "reCountry_flag" : reCountry_flag})

if __name__ == "__main__":
    app.run(debug=True)