from flask import Flask, jsonify, Blueprint
from sklearn.preprocessing import MinMaxScaler
import json
import pandas as pd
import numpy as np

df = pd.read_csv('./file/happy_data2.csv')
df_merged = pd.read_csv('./file/df_merged.csv')
cc = Blueprint('cc',__name__)
scaler=MinMaxScaler()
##----treemap.png------##
@cc.route('/tree',methods=['GET'])
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
    children=[]
    result2=eval(json.dumps(test2))
    tree_data.append(result2)
  return jsonify(tree_data)

#barplot10-1.png#
#왼쪽부터 오른쪽 순서#
@cc.route('/gdp/bar',methods=['GET'])
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

@cc.route('/social/bar',methods=['GET'])
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

@cc.route('/health/bar',methods=['GET'])
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

@cc.route('/freedom/bar',methods=['GET'])
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
@cc.route('/generosity/bar',methods=['GET'])
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

@cc.route('/corruption/bar',methods=['GET'])
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
#매개변수로 :country가 들어오면 그 country가 속한 그룹의 나라들을 모두 출력해주는 로직

##대륙별로 TOP10 내보내기##

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
          'name':'dystopia',
          'uv':temp['dystopia'].to_list()[0],
          "fill":"#83a6ed",
      }
      test3={
          'name':'socialSupport',
          'uv':temp['socialSupport'].to_list()[0],
          "fill": "#8dd1e1",
      }
      test4={
          'name':'health',
          'uv':temp['health'].to_list()[0],
          "fill": "#82ca9d",
      }
      test5={
          'name':'freedom',
          'uv':temp['freedom'].to_list()[0],
          "fill": "#a4de6c",
      }
      test6={
          'name':'generosity',
          'uv':temp['generosity'].to_list()[0],
          "fill": "#d0ed57",
      }
      test7={
          'name':'corruptionPerceptions',
          'uv':temp['corruptionPerceptions'].to_list()[0],
          "fill": "#ffc658",
      }
      data.append(eval(json.dumps(test1)))
      data.append(eval(json.dumps(test2)))
      data.append(eval(json.dumps(test3)))
      data.append(eval(json.dumps(test4)))
      data.append(eval(json.dumps(test5)))
      data.append(eval(json.dumps(test6)))
      data.append(eval(json.dumps(test7)))
      test[i]=data
      dic.append(test)
  dic[0].get(country).sort(key=lambda x: x.get('uv'),reverse=False)
  return jsonify(dic[0].get(country))


##------결과페이지-------------##
@cc.route('/text/<country>',methods=['GET'])
def result(country):
  temp2=df[df['country']==country]
  temp2['rank_dys'] = df['dystopia'].rank(method='dense', ascending=False)
  temp2['rank_gdp']=df['gdp'].rank(method='dense', ascending=False)
  temp2['rank_social']=df['socialSupport'].rank(method='dense', ascending=False)
  temp2['rank_health']=df['health'].rank(method='dense', ascending=False)
  temp2['rank_free']=df['freedom'].rank(method='dense', ascending=False)
  temp2['rank_ge']=df['generosity'].rank(method='dense', ascending=False)
  temp2['rank_corr']=df['corruptionPerceptions'].rank(method='dense', ascending=False)
  rank=round(temp2['RANK'].values[0]/df.shape[0]*100)
  gdp_per=round(temp2['rank_corr'].to_list()[0]/df.shape[0]*100,3)
  dystopia_per=round(temp2['rank_dys'].to_list()[0]/df.shape[0]*100,3)
  social_per=round(temp2['rank_social'].to_list()[0]/df.shape[0]*100,3)
  health_per=round(temp2['rank_health'].to_list()[0]/df.shape[0]*100,3)
  freedom_per=round(temp2['rank_free'].to_list()[0]/df.shape[0]*100,3)
  generosity_per=round(temp2['rank_ge'].to_list()[0]/df.shape[0]*100,3)
  corruption_per=round(temp2['rank_corr'].to_list()[0]/df.shape[0]*100,3)
  return jsonify({'rank': rank, "gdpPer":gdp_per, 'dystopiaPer':dystopia_per, 'socialPer':social_per,'healthPer':health_per,'freedomPer':freedom_per,'generosityPer':generosity_per,'corruptionPer':corruption_per})
  # for i in ['rank','gdpPer','dystopiaPer','socialPer','healthPer','freedomPer','generosityPer','corruptionPer']:
  #   json['text']= '낮' if json[i]<=100 else '높'
  #return jsonify(json)
#----composed barchart----------#
@cc.route('/composed',methods=['GET'])
def composedBarchart():
  yearAvg=df_merged.groupby('Year')[['Happiness Score','Family (Social Support)','Economy (GDP per Capita)','Health (Life Expectancy)']].mean()
  #정규화하기
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
    
    

    
