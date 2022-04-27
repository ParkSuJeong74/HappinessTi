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

df = pd.read_csv('./file/2022_google_csv.csv')
df = df.dropna(axis=1)


# # 전처리
#컬럼명 변경
df.rename(columns={'Happiness score':'happinessScore','Dystopia (1.83) + residual':'dystopia','Explained by: GDP per capita':'gdp','Explained by: Social support':'socialSupport',
                   'Explained by: Healthy life expectancy':'health','Explained by: Freedom to make life choices':'freedom','Explained by: Generosity':'generosity',
                   'Explained by: Perceptions of corruption':'corruptionPerceptions','Country':'country'},inplace=True)

print(df.columns)


# #이상치 제거 함수를 불러온다.
def detect_outliers(df, n, features):
    outlier_indices = []
    for col in features:
        Q1 = np.percentile(df[col], 25)
        Q3 = np.percentile(df[col], 75)
        IQR = Q3 - Q1
        
        outlier_step = 1.5 * IQR
        
        outlier_list_col = df[(df[col] < Q1 - outlier_step) | (df[col] > Q3 + outlier_step)].index
        outlier_indices.extend(outlier_list_col) #outlier_inidices: 이상치가 발견된 행
    outlier_indices = Counter(outlier_indices) #행의 빈도수를 세준다.
    print(outlier_indices)
    multiple_outliers = list(k for k, v in outlier_indices.items() if v > n) #이상치가 2개 이상 발견되면 return 해줌
    return multiple_outliers


col=[i for i in df.columns]
Outliers_to_drop = detect_outliers(df, 2,['happinessScore',
 'dystopia',
 'gdp',
 'socialSupport',
 'health',
 'freedom',
 'generosity',
 'corruptionPerceptions'])

df.loc[Outliers_to_drop]

df = df.drop(Outliers_to_drop, axis = 0).reset_index(drop=True)
print(df.shape)



df["country"] = df["country"].str.replace("*","")
df["country"].replace("Palestinian Territories","Palestine",inplace = True)
df["country"].replace("Hong Kong S.A.R. of China","Hong Kong",inplace = True)
df["country"].replace("Russia","Russian Federation",inplace = True)
df["country"].replace("Taiwan Province of China","Taiwan",inplace = True)

# Adding a column with country codes 🧭

def countryCode (country_name):
    try:
        return pc.country_name_to_country_alpha2(country_name)
    except:
        return None                  # None keyword adds a null value 🐹

if __name__ == "__main__":
    df['country code']= df.apply(lambda x: countryCode(x.country), axis = 1)

# Adding a column with continent 🌡️
def continent(country_code):
    try:
        return pc.country_alpha2_to_continent_code(country_code)
    except:
        return None                  # None keyword adds a null value 🐹
    
if __name__ == "__main__":
    df['Continent']= df["country code"].apply(lambda x: continent(x))
df.dropna(inplace = True)


#나라코드 컬럼추가#
df["StNames"] = df["country"].apply(lambda x : pc.country_name_to_country_alpha3(x))
print(df.head())
#----데이터 전처리 끝 !! --------#

#barplot10-1.png#
#왼쪽부터 오른쪽 순서#
gdp_data=[]
for i in range(0,len(df.nlargest(10,'gdp'))):
    test={
      'country':df.nlargest(10,'gdp')['country'].to_list()[i],
      'happinessScore':df.nlargest(10,'gdp')['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    gdp_data.append(result)
print(gdp_data)

social_data=[]
for i in range(0,len(df.nlargest(10,'socialSupport'))):
    test={
      'country':df.nlargest(10,'socialSupport')['country'].to_list()[i],
      'happinessScore':df.nlargest(10,'socialSupport')['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    social_data.append(result)
print(social_data)

health_data=[]
for i in range(0,len(df.nlargest(10,'health'))):
    test={
      'country':df.nlargest(10,'health')['country'].to_list()[i],
      'happinessScore':df.nlargest(10,'health')['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    health_data.append(result)
print(health_data)

freedom_data=[]
for i in range(0,len(df.nlargest(10,'freedom'))):
    test={
      'country':df.nlargest(10,'freedom')['country'].to_list()[i],
      'happinessScore':df.nlargest(10,'freedom')['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    freedom_data.append(result)
print(freedom_data)

##barplot10-2.png##
generosity_data=[]
for i in range(0,len(df.nlargest(10,'generosity'))):
    test={
      'country':df.nlargest(10,'generosity')['country'].to_list()[i],
      'happinessScore':df.nlargest(10,'generosity')['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    generosity_data.append(result)
print(generosity_data)

corruptionPerceptions_data=[]
for i in range(0,len(df.nlargest(10,'corruptionPerceptions'))):
    test={
      'country':df.nlargest(10,'corruptionPerceptions')['country'].to_list()[i],
      'happinessScore':df.nlargest(10,'corruptionPerceptions')['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    corruptionPerceptions_data.append(result)
print(corruptionPerceptions_data)


##----맵차트 ------##
map_data=[]
for i in range(0,len(df)):
    test={
      'StNames':df['StNames'].to_list()[i],
      'RANK':df['happinessScore'].to_list()[i],
    }
    result=eval(json.dumps(test))
    map_data.append(result)
print(map_data)
#---여기까지 json형태로 보내기 수정함----#

##----대륙별로 시각화----##
##찾아보니 nivo에서 zoom을 조절할 수 있는것같습니다##
##projectionScale로 확대해주시고
##projection Translation으로 위치를 조정해주셔서 대륙별로 보여주세요!!#

##---score per continent.png----#
# Grouping data on basis of continents 🐾
contData = df.groupby("Continent")


# Average happinessScore per Continent 🦨
happAvg = contData["happinessScore"].mean()
pd.DataFrame(happAvg)

print(happAvg.index)
print(happAvg.values)

# highest vs lowest.png #
#highest
x = df.sort_values('happinessScore', ascending=True).tail(10)
print(x['happinessScore'])
print(x['country'])

#lowest
z = df.sort_values('happinessScore', ascending=False).tail(10)
print(z['happinessScore'])
print(z['country'])







