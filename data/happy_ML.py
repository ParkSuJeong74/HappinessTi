from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import joblib

model = joblib.load('./file/lgb1.pkl')
df = pd.read_csv("./file/happy.csv")

app = Flask(__name__)

@app.route('/')
def man():
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
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
    
    newCountry = {"GDP_PER_PERSON": [gdp] ,"HEALTHY_LIFE_EXPECTANCY": [lifeExpectancy] ,"SOCIAL_SUPPORT": [socialSupport] \
              ,"GENEROSITY": [generosity]}
    
    newCountry = pd.DataFrame(newCountry)

    y_prob = model.predict_proba(newCountry)
    
    happy = list(y_prob[:,0])[0]
    normal = list(y_prob[:,1])[0]
    unhappy = list(y_prob[:,2])[0]
    
    if (normal > happy and normal > unhappy):
        probability = round(normal*100, 2)
        happyType = 1
    elif (happy > normal and happy > unhappy):
        probability = round(happy*100, 2)
        happyType = 2
    else:
        probability = round(unhappy*100, 2)
        happyType = 3
        
    def find_nearest_country(gdp, hle, scl):
        def calculate_distance(x, gdp, hle, scl):
            gdp_dif = np.log((x["LOG_OF_GDP_PER_PERSON"] - float(gdp))**2)
            hle_dif = np.log((x["HEALTHY_LIFE_EXPECTANCY"] - float(hle))**2) 
            scl_dif = np.log((x["SOCIAL_SUPPORT"] - float(scl))**2)
            return gdp_dif + hle_dif + scl_dif
    
        data1 = df[["COUNTRY", "LOG_OF_GDP_PER_PERSON", "HEALTHY_LIFE_EXPECTANCY","SOCIAL_SUPPORT"]]
        data1['distances'] = data1.apply(lambda x: calculate_distance(x, gdp, hle, scl), axis=1)
        index = data1['distances'].values.argmin()
        found = data1.iloc[index, :]    
        return found
    
    hle = lifeExpectancy      
    scl = socialSupport  
    found_data = find_nearest_country(gdp, hle, scl)
    reCountryFlag = 'https://countryflagsapi.com/png/' + format(found_data[0])
    myCountryFlag = 'https://countryflagsapi.com/png/' + myCountry
    
    ###
    ### myCountry = 현재 나의 나라
    ### myCountryFlag = 나의 나라 국기
    ### probability = 현재 내(입력값 ex : 돈, 사회적지지, 관용)가 어떠한 행복(happyType)일지의 확률 ,어떤 타입의 행복일지에 확률(float) 
    ### happyType = 어떠한 타입인지 1 = 평범/ 2 = 행복/ 3 = 불행 
    ### reCountry = 나라 추천
    ### reCountryFlag = 추천된 나라의 국기
    ###
    
    return jsonify({"myCountry" : myCountry, "myCountryFlag" : myCountryFlag, "probability" : probability, "happyType" : happyType, "reCountry" : format(found_data[0]), "reCountryFlag" : reCountryFlag})

    #return render_template('after.html', probability_data= probability, country_data = format(found_data[0]),happy_data = happyType )

if __name__ == "__main__":
    app.run(debug=True)
