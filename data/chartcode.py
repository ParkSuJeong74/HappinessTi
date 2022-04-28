from flask import Flask
import json
import pandas as pd
import numpy as np
from collections import Counter

import pycountry_convert as pc
import missingno as msno
from scipy.stats import norm
import matplotlib.pyplot as plt
import seaborn as sns

import plotly_express as px
import pycountry

df = pd.read_csv('./file/happy_data2.csv')

app = Flask(__name__)

#barplot10-1.png#
#왼쪽부터 오른쪽 순서#
@app.route('/gdp_barplot')
def gdp_barplot():
  gdp_data=[]
  for i in range(0,len(df.nlargest(10,'gdp'))):
      test={
        'country':df.nlargest(10,'gdp')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'gdp')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      gdp_data.append(result)
  return(gdp_data)

@app.route('/social_barplot')
def social_barplot():
  social_data=[]
  for i in range(0,len(df.nlargest(10,'socialSupport'))):
      test={
        'country':df.nlargest(10,'socialSupport')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'socialSupport')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      social_data.append(result)
  return(social_data)

@app.route('/health_barplot')
def health_barplot():
  health_data=[]
  for i in range(0,len(df.nlargest(10,'health'))):
      test={
        'country':df.nlargest(10,'health')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'health')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      health_data.append(result)
  return(health_data)

@app.route('/freedom_barplot')
def freedom_barplot():
  freedom_data=[]
  for i in range(0,len(df.nlargest(10,'freedom'))):
      test={
        'country':df.nlargest(10,'freedom')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'freedom')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      freedom_data.append(result)
  return(freedom_data)

##barplot10-2.png##
@app.route('/generosity_barplot')
def generosity_barplot():
  generosity_data=[]
  for i in range(0,len(df.nlargest(10,'generosity'))):
      test={
        'country':df.nlargest(10,'generosity')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'generosity')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      generosity_data.append(result)
  return(generosity_data)

@app.route('/corruption_barplot')
def corruption_barplot():
  corruptionPerceptions_data=[]
  for i in range(0,len(df.nlargest(10,'corruptionPerceptions'))):
      test={
        'country':df.nlargest(10,'corruptionPerceptions')['country'].to_list()[i],
        'happinessScore':df.nlargest(10,'corruptionPerceptions')['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      corruptionPerceptions_data.append(result)
  return(corruptionPerceptions_data)


##----맵차트 ------##
@app.route('/mapplot')
def mapplot():
  map_data=[]
  for i in range(0,len(df)):
      test={
        'StNames':df['StNames'].to_list()[i],
        'RANK':df['happinessScore'].to_list()[i],
      }
      result=eval(json.dumps(test))
      map_data.append(result)
  return(map_data)

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

@app.route('/continent_barplot')
def continent_barplot():
  group_data=[]
  for i in range(0,len(happAvg.index)):
      test={
        'continent':happAvg.index[i],
        'happinessScore':happAvg.values[i],
      }
      result=eval(json.dumps(test))
      group_data.append(result)
  return(group_data)

# highest vs lowest.png #
#highest
@app.route('/high_barplot')
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
  return(high_data)

#lowest
@app.route('/low_barplot')
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
  return(low_data)

#--------군집분석------#
@app.route('/similar')
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

