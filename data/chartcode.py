from flask import Flask, jsonify
import json
import pandas as pd
import numpy as np

df = pd.read_csv('./file/happy_data2.csv')
app = Flask(__name__)

##----treemap.png------##
@app.route('/tree',methods=['GET'])
def treemap():
  tree_data=[]
  children=[]
  for j in df['continent'].unique():
    test2={
      'name':j,
    }
    for i in range(0,len(df[df['continent']==j])):
          test={
            'name':df[df['continent']==j]['country'].to_list()[i],
            'size':df[df['continent']==j]['happinessScore'].to_list()[i],
          }
          result=eval(json.dumps(test))
          children.append(result)
    test2['children']=children
    result2=eval(json.dumps(test2))
    tree_data.append(result2)
  return jsonify(tree_data)

#barplot10-1.png#
#왼쪽부터 오른쪽 순서#
@app.route('/gdp/bar',methods=['GET'])
def gdp_barplot():
  gdp_data=[]
  for i in range(0,len(df.nlargest(10,'gdp'))):
      test={
        'country':df.nlargest(10,'gdp')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'gdp')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      gdp_data.append(result)
  return jsonify(gdp_data)

@app.route('/social/bar',methods=['GET'])
def social_barplot():
  social_data=[]
  for i in range(0,len(df.nlargest(10,'socialSupport'))):
      test={
        'country':df.nlargest(10,'socialSupport')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'socialSupport')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      social_data.append(result)
  return jsonify(social_data)

@app.route('/health/bar',methods=['GET'])
def health_barplot():
  health_data=[]
  for i in range(0,len(df.nlargest(10,'health'))):
      test={
        'country':df.nlargest(10,'health')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'health')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      health_data.append(result)
  return jsonify(health_data)

@app.route('/freedom/bar',methods=['GET'])
def freedom_barplot():
  freedom_data=[]
  for i in range(0,len(df.nlargest(10,'freedom'))):
      test={
        'country':df.nlargest(10,'freedom')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'freedom')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      freedom_data.append(result)
  return jsonify(freedom_data)

##barplot10-2.png##
@app.route('/generosity/bar',methods=['GET'])
def generosity_barplot():
  generosity_data=[]
  for i in range(0,len(df.nlargest(10,'generosity'))):
      test={
        'country':df.nlargest(10,'generosity')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'generosity')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      generosity_data.append(result)
  return jsonify(generosity_data)

@app.route('/corruption/bar',methods=['GET'])
def corruption_barplot():
  corruptionPerceptions_data=[]
  for i in range(0,len(df.nlargest(10,'corruptionPerceptions'))):
      test={
        'country':df.nlargest(10,'corruptionPerceptions')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'corruptionPerceptions')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      corruptionPerceptions_data.append(result)
  return jsonify(corruptionPerceptions_data)


##----맵차트 ------##
@app.route('/mapplot',methods=['GET'])
def mapplot():
  map_data=[]
  for i in range(0,len(df)):
      test={
        'StNames':df['StNames'].to_list()[i],
        'RANK':df['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      map_data.append(result)
  return jsonify(map_data)

##----대륙별로 시각화----##
##찾아보니 nivo에서 zoom을 조절할 수 있는것같습니다##
##projectionScale로 확대해주시고
##projection Translation으로 위치를 조정해주셔서 대륙별로 보여주세요!!#


##---score per continent.png----#
# Grouping data on basis of continents 🐾
contData = df.groupby("continent")
# Average happinessScore per continent 🦨
happAvg = contData["happinessScore"].mean()
pd.DataFrame(happAvg)

@app.route('/continent/bar',methods=['GET'])
def continent_barplot():
  group_data=[]
  for i in range(0,len(happAvg.index)):
      test={
        'continent':happAvg.index[i],
        'happinessScore':happAvg.values[i],
      }
      result=eval(json.dumps(test))
      group_data.append(result)
  return jsonify(group_data)

# highest vs lowest.png #
#highest
@app.route('/high/bar',methods=['GET'])
def high_barplot():
  x = df.sort_values('happinessScore', ascending=True).tail(10)
  high_data=[]
  for i in range(0,len(x)):
      test={
        'happinessScore':x['happinessScore'][i],
        'country':x['happinessScore'][i],
      }
      result=eval(json.dumps(test))
      high_data.append(result)
  return jsonify(high_data)

#lowest
@app.route('/low/bar',methods=['GET'])
def low_barplot():
  z = df.sort_values('happinessScore', ascending=False).tail(10)
  low_data=[]
  for i in range(0,len(z)):
      test={
        'happinessScore':z['happinessScore'].to_list()[i],
        'country':z['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      low_data.append(result)
  return jsonify(low_data)

#--------군집분석------#
@app.route('/similar',methods=['GET'])
def similar():
  dict={'1':['Israel', 'Costa Rica', 'Romania', 'Italy', 'Cyprus', 'Mexico', 'Greece',
  'Colombia', 'Peru', 'Ecuador', 'Georgia'],
        '2':['Luxembourg' ,'Ireland', 'United Arab Emirates', 'South Korea' ,'Hong Kong',
  'Morocco', 'Venezuela'],
        '3':['Singapore', 'Russian Federation' ,'Sri Lanka', 'Ethiopia'],
        '4':['Iceland' ,'United States' ,'Czechia' ,'Belgium', 'Slovenia', 'Saudi Arabia',
  'Taiwan', 'Uruguay', 'Slovakia', 'Panama', 'Kazakhstan', 'Serbia', 'Chile',
  'Argentina', 'Mongolia', 'Dominican Republic', 'North Macedonia'],
        '5':['Guatemala', 'Honduras', 'Tajikistan', 'Gambia', 'Iran', 'Kenya'],
        '6':['India'],
        '7':['Ukraine', 'Congo'],
        '8':['Thailand', 'Paraguay', 'Bulgaria', 'Laos'],
        '9':['France', 'Spain', 'Malta', 'Poland', 'Kuwait', 'Hungary', 'Japan' ,'Portugal',
  'Malaysia', 'China', 'Nepal', 'Indonesia'],
        '10':['Yemen'],
        '11':['Brazil', 'Philippines', 'Jamaica', 'Bolivia', 'Uganda' ,'Nigeria'],
        '12':['Pakistan', 'Jordan'],
        '13':['Finland', 'Denmark', 'Switzerland', 'Netherlands', 'Sweden', 'Norway',
  'New Zealand', 'Austria', 'Australia', 'Germany', 'Canada', 'United Kingdom'],
        '14':['South Africa', 'Myanmar'],
        '15':['Cambodia' ,'Egypt'],
        '16':['Ghana'],
        '17':['Iraq'] ,
  }
  return(dict)
#매개변수로 :country가 들어오면 그 country가 속한 그룹의 나라들을 모두 출력해주는 로직

##대륙별로 TOP10 내보내기##

##-------Asia-top10.png----------##
@app.route('/asia/bar',methods=['GET'])
def asia_barplot():
  asia_data=[]
  for i in range(0,len(df[df['continent']=='AS'].nlargest(10,'happinessScore'))):
      test={
        'country':df[df['continent']=='AS'].nlargest(10,'happinessScore')['country'].to_list()[i],
        'happinessScore':df[df['continent']=='AS'].nlargest(10,'happinessScore')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      asia_data.append(result)
  return jsonify(asia_data)


#----Europe-top10.png---------##
@app.route('/europe/bar',methods=['GET'])
def europe_barplot():
  europe_data=[]
  for i in range(0,len(df[df['continent']=='EU'].nlargest(10,'happinessScore'))):
      test={
        'country':df[df['continent']=='EU'].nlargest(10,'happinessScore')['country'].to_list()[i],
        'happinessScore':df[df['continent']=='EU'].nlargest(10,'happinessScore')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      europe_data.append(result)
  return jsonify(europe_data)

##-------Afica-top10---------##
@app.route('/africa/bar',methods=['GET'])
def africa_barplot():
  africa_data=[]
  for i in range(0,len(df[df['continent']=='AF'].nlargest(10,'happinessScore'))):
      test={
        'country':df[df['continent']=='AF'].nlargest(10,'happinessScore')['country'].to_list()[i],
        'happinessScore':df[df['continent']=='AF'].nlargest(10,'happinessScore')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      africa_data.append(result)
  return jsonify(africa_data)

##---------NorthAmerica-top10--------##
@app.route('/north/bar',methods=['GET'])
def north_barplot():
  north_data=[]
  for i in range(0,len(df[df['continent']=='NorthAmerica'].nlargest(10,'happinessScore'))):
      test={
        'country':df[df['continent']=='NorthAmerica'].nlargest(10,'happinessScore')['country'].to_list()[i],
        'happinessScore':df[df['continent']=='NorthAmerica'].nlargest(10,'happinessScore')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      north_data.append(result)
  return jsonify(north_data)


##--------SouthAmerica-top10-------##
@app.route('/south/bar',methods=['GET'])
def south_barplot():
  south_data=[]
  for i in range(0,len(df[df['continent']=='SouthAmerica'].nlargest(10,'happinessScore'))):
      test={
        'country':df[df['continent']=='SouthAmerica'].nlargest(10,'happinessScore')['country'].to_list()[i],
        'happinessScore':df[df['continent']=='SouthAmerica'].nlargest(10,'happinessScore')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      south_data.append(result)
  return jsonify(south_data)

if __name__ == "__main__":
    app.run(debug=True)
    
