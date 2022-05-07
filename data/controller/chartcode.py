#-- coding: utf-8 --
from flask import Flask, jsonify, Blueprint
from sklearn.preprocessing import MinMaxScaler
import json
import pandas as pd
import numpy as np
df = pd.read_csv('./file/happy_data2.csv')
df_merged = pd.read_csv('./file/df_merged.csv')
cc = Blueprint('cc',__name__)
##----treemap.png------##
@cc.route('/tree',methods=['GET'])
def treemap():
  tree_data=[]
  children=[]
  df['continent']=df['continent'].replace('EU','Europe')
  df['continent']=df['continent'].replace('AS','Asia')
  df['continent']=df['continent'].replace('OC','Oceania')
  df['continent']=df['continent'].replace('NA','North America')
  df['continent']=df['continent'].replace('AF','Africa')
  df['continent']=df['continent'].replace('SA','South Africa')
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
    children=[]
    result2=eval(json.dumps(test2))
    tree_data.append(result2)
  return jsonify(tree_data)

##----맵차?�� ------##
@cc.route('/mapplot',methods=['GET'])
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

##---score per continent.png----#
# Grouping data on basis of continents ?��?
contData = df.groupby("continent")
# Average happinessScore per continent ?��?
happAvg = contData["happinessScore"].mean()
pd.DataFrame(happAvg)
@cc.route('/continent/bar',methods=['GET'])
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


#--------군집분석------#
@cc.route('/similar',methods=['GET'])
def similar():
  dict={'1':['India', 'Tanzania', 'Zimbabwe'],
        '2':['Finland', 'Denmark', 'Iceland', 'Switzerland', 'Netherlands', 'Luxembourg',
 'Sweden', 'Norway', 'Israel'],
        '3':['Cambodia', 'Uganda', 'Nigeria', 'Kenya', 'Pakistan', 'Madagascar', 'Ethiopia',
 'Yemen'],
        '4':['Thailand', 'Malaysia', 'China', 'Paraguay', 'Peru', 'Ecuador', 'Vietnam',
 'Armenia'],
        '5':['Costa Rica', 'Romania', 'Italy', 'Slovakia', 'Panama', 'Brazil' ,'Cyprus',
 'Serbia', 'Chile', 'Mexico', 'Greece'],
        '6':['New Zealand', 'Austria', 'Australia', 'Ireland', 'Germany', 'Canada',
 'United States', 'United Kingdom', 'Czechia' ,'Belgium'],
        '7':['Georgia', 'Iran' ,'Turkey'],
        '8':['Uzbekistan', 'Argentina', 'Philippines', 'Jamaica', 'Colombia', 'Mongolia',
 'Dominican Republic', 'Bolivia'],
        '9':['Russian Federation', 'Bulgaria', 'Indonesia', 'North Macedonia',
 'South Africa', 'Ukraine'],
        '10':['Venezuela'],
        '11':['Myanmar', 'Sri Lanka', 'Egypt', 'Jordan'],
        '12':['Tajikistan', 'Nepal', 'Bangladesh', 'Laos', 'Iraq', 'Ghana'],
        '13':['France', 'Slovenia', 'United Arab Emirates', 'Saudi Arabia', 'Taiwan',
 'Spain', 'Uruguay' ,'Malta'],
        '14':['Guatemala' ,'Honduras'],
        '15':['Gambia', 'Congo', 'Morocco'],
        '16':['Kazakhstan', 'Poland', 'Kuwait' ,'Hungary', 'Japan', 'Portugal', 'South Korea'],
        '17':['Singapore'],
        '18':['Hong Kong'],
  }
  return(dict)
#매개�??���? :country�? ?��?��?���? �? country�? ?��?�� 그룹?�� ?��?��?��?�� 모두 출력?��주는 로직

##???륙별�? TOP10 ?��보내�?##

@cc.route('/bar/<continent>',methods=['GET'])
def barplot(continent):
  continent_data=[]
  for i in range(0,len(df[df['continent']==continent].nlargest(10,'happinessScore'))):
      test={
        'country':df[df['continent']==continent].nlargest(10,'happinessScore')['country'].to_list()[i],
        'happinessScore':df[df['continent']==continent].nlargest(10,'happinessScore')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      continent_data.append(result)
  return jsonify(continent_data)


##------radar chart----------##
@cc.route('/result/<country>',methods=['GET'])
def radar(country):
  dic=[]
  test={}
  for i in df['country'].unique():
      data=[]
      temp=df[df['country']==i]
      test1={
          'name':'gdp',
          'uv':temp['gdp'].to_list()[0],
          "fill": "#8884d8",
      }
      test2={
          'name':'디스토피아',
          'uv':temp['dystopia'].to_list()[0],
          "fill":"#83a6ed",
      }
      test3={
          'name':'사회적지지',
          'uv':temp['socialSupport'].to_list()[0],
          "fill": "#8dd1e1",
      }
      test4={
          'name':'건강',
          'uv':temp['health'].to_list()[0],
          "fill": "#82ca9d",
      }
      test5={
          'name':'자유',
          'uv':temp['freedom'].to_list()[0],
          "fill": "#a4de6c",
      }
      test6={
          'name':'관용',
          'uv':temp['generosity'].to_list()[0],
          "fill": "#d0ed57",
      }
      test7={
          'name':'부패인식',
          'uv':temp['corruptionPerceptions'].to_list()[0],
          "fill": "#ffc658",
      }
      for j in range(1,8):
        data.append(eval(json.dumps(locals()['test{}'.format(j)])))
      test[i]=data
      dic.append(test)
  dic[0].get(country).sort(key=lambda x: x.get('uv'),reverse=False)
  return jsonify(dic[0].get(country))


##------결과?��?���?-------------##
@cc.route('/text/<country>',methods=['GET'])
def result(country):
  temp2=df[df['country']==country]
  for i in ['dystopia','gdp','socialSupport','health','freedom','generosity','corruptionPerceptions']:
    temp2['rank_{}'.format(i)] = df[i].rank(method='dense', ascending=False)
    globals()['{}_per'.format(i)]=round(temp2['rank_{}'.format(i)].to_list()[0]/df.shape[0]*100,3)
    globals()['{}_text'.format(i)]= '높' if globals()['{}_per'.format(i)]<=50 else '낮'
  rank=round(temp2['RANK'].values[0]/df.shape[0]*100)
  return jsonify({'rank': rank, "gdpPer":[gdp_per,gdp_text], 'dystopiaPer':[dystopia_per,dystopia_text], 'socialPer':[socialSupport_per,socialSupport_text],'healthPer':[health_per,health_text],'freedomPer':[freedom_per,freedom_text],'generosityPer':[generosity_per,generosity_text],'corruptionPer':[corruptionPerceptions_per,corruptionPerceptions_text]})

#----composed barchart----------#
@cc.route('/composed',methods=['GET'])
def composedBarchart():
  yearAvg=df_merged.groupby('Year')[['Happiness Score','Family (Social Support)','Economy (GDP per Capita)','Health (Life Expectancy)']].mean()
  #?��규화?���?
  yearAvg.values
  data=[]
  for i in yearAvg.index:
    test={
        'year':i,
        "happinessScore":list(yearAvg[yearAvg.index==i]['Happiness Score'].values)[0],
        "socialSupport":list(yearAvg[yearAvg.index==i]['Family (Social Support)'].values*4)[0],
        'gdp':list(yearAvg[yearAvg.index==i]['Economy (GDP per Capita)'].values*4)[0],
        'health':list(yearAvg[yearAvg.index==i]['Health (Life Expectancy)'].values*8)[0],
    }
    data.append(eval(json.dumps(test)))
  return jsonify(data)
