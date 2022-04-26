from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import joblib
##경로 lgb1.pkl = ml 모델
##     happy.csv = 전처리 파일
model = joblib.load('./file/lgb1.pkl')
df = pd.read_csv("./file/happy.csv")

app = Flask(__name__)



##@app.route('/')
##def man():
##    return render_template('home.html')


# gdp는 usd 기준 kw로 입력 받고 환율 계산 kw를 'a'로 입력 받음
# life_expectancy = 'b'
# social = 'c'
# generosity = 'd'
@app.route('/predict', methods=['GET'])
def home():
    kw = request.form['a']
    gdp = 8 / float(kw)
    
    life_expectancy = request.form['b'] 
  
    social_num = request.form['c']
    social_support = float(social_num) / 100
    
    generosity_num = request.form['d'] 
    generosity = float(generosity_num) / 100
    
    new_country = {"GDP_PER_PERSON": [gdp] ,"HEALTHY_LIFE_EXPECTANCY": [life_expectancy] ,"SOCIAL_SUPPORT": [social_support] \
              ,"GENEROSITY": [generosity]}
    
    new_country = pd.DataFrame(new_country)

    y_prob = model.predict_proba(new_country)
    
    happy = list(y_prob[:,0])[0]
    normal = list(y_prob[:,1])[0]
    unhappy = list(y_prob[:,2])[0]
    
    if (normal > happy and normal > unhappy):
        probability = round(normal*100, 2)
        happy_type = 1
    elif (happy > normal and happy > unhappy):
        probability = round(happy*100, 2)
        happy_type = 2
    else:
        probability = round(unhappy*100, 2)
        happy_type = 3
        
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
    
    hle = life_expectancy      
    scl = social_support  
    found_data = find_nearest_country(gdp, hle, scl)
    
    ### probability_data = 어떤 타입의 행복일지에 확률(float) , happy_data = 어떠한 타입인지 1 = 평범/ 2 = 행복/ 3 = 불행 ,country_data = 나라 추천
    return jsonify({"probability_data" : probability, "country_data" : format(found_data[0]), "happy_data" : happy_type })

    #return render_template('after.html', probability_data= probability, country_data = format(found_data[0]),happy_data = happy_type )


if __name__ == "__main__":
    app.run(debug=True)