#!/usr/bin/env python
# coding: utf-8

# get_ipython().system('pip install missingno --quiet')
# get_ipython().system('pip install folium')
# get_ipython().system('pip install pycountry_convert')
# get_ipython().system('pip install geocoder')
# get_ipython().system('pip install plotly')
# get_ipython().system('pip install pycountry_convert --quiet')
# get_ipython().system('pip install plotly_express')
# get_ipython().system('pip install plotly --quiet')

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
                   'Explained by: Perceptions of corruption':'corruptionPerceptions','country':'country'},inplace=True)

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



df["Country"] = df["Country"].str.replace("*","")
df["Country"].replace("Palestinian Territories","Palestine",inplace = True)
df["Country"].replace("Hong Kong S.A.R. of China","Hong Kong",inplace = True)
df["Country"].replace("Russia","Russian Federation",inplace = True)
df["Country"].replace("Taiwan Province of China","Taiwan",inplace = True)

# Adding a column with country codes 🧭

def countryCode (country_name):
    try:
        return pc.country_name_to_country_alpha2(country_name)
    except:
        return None                  # None keyword adds a null value 🐹

if __name__ == "__main__":
    df['Country code']= df.apply(lambda x: countryCode(x.Country), axis = 1)

# Adding a column with continent 🌡️
def continent(country_code):
    try:
        return pc.country_alpha2_to_continent_code(country_code)
    except:
        return None                  # None keyword adds a null value 🐹
    
if __name__ == "__main__":
    df['Continent']= df["Country code"].apply(lambda x: continent(x))
df.dropna(inplace = True)



targets = ['Low', 'Low-Mid', 'Top-Mid', 'Top']
def pipe(df):
  df['target'] = pd.qcut(df[df.columns[2]],len(targets),labels=targets)
  g_d=df.set_index('Country') #어차피 1행씩 밖에 없으므로 그냥 index를 country로 바꿔주기만한것
  return g_d



df_t = pipe(df)
df_t

#------데이터 전처리 완료------#

#----여기서 부터 시각화--------#
## high/ mid / low pairplot
sns.pairplot(df_t[[
 'dystopia',
 'gdp',
 'socialSupport',
 'health',
 'freedom',
 'generosity',
 'corruptionPerceptions','target']], hue='target')
plt.savefig('pairplot', dpi=300)

# # 각 속성별로 TOP 10 국가들

fig, axes = plt.subplots(nrows=2, ncols=2,constrained_layout=True,figsize=(12,8))

sns.barplot(x='gdp',y='Country',data=df.nlargest(10,'gdp'),ax=axes[0,0],palette="Blues_d")

sns.barplot(x='socialSupport' ,y='Country',data=df.nlargest(10,'socialSupport'),ax=axes[0,1],palette="YlGn")

sns.barplot(x='health' ,y='Country',data=df.nlargest(10,'health'),ax=axes[1,0],palette='OrRd')

sns.barplot(x='freedom' ,y='Country',data=df.nlargest(10,'freedom'),ax=axes[1,1],palette='YlOrBr')
plt.savefig('barplot10-1', dpi=300)

fig, axes = plt.subplots(nrows=1, ncols=2,constrained_layout=True,figsize=(10,4))

sns.barplot(x='generosity' ,y='Country',data=df.nlargest(10,'generosity'),ax=axes[0],palette='Spectral')
sns.barplot(x='corruptionPerceptions' ,y='Country',data=df.nlargest(10,'corruptionPerceptions'),ax=axes[1],palette='RdYlGn')
plt.savefig('barplot10-2', dpi=300)


# Data copy 🧲
sample = df.copy()
# Create a column with standard names of countries 🍄
sample["StNames"] = sample["Country"].apply(lambda x : pc.country_name_to_country_alpha3(x))

# World Map for Happiness Ranking 🦞
fig = px.choropleth(sample, locations = "StNames", color = "RANK",
                    scope = 'world', title = "Happiness Ranking World Map", color_continuous_scale= "viridis")

# A data frame with top 20 values 🌐
data = df.head(20)

# Barplot for top 20 countries Happiness Index
plt.figure(figsize=(28,5))
plt.title("Top 20 Countries on Happiness Ranking")
sns.barplot(x = data["Country"], y = data["happinessScore"], data = data, palette='viridis', edgecolor='black')


fig.show()
plt.savefig('totalmap', dpi=300)

#---대륙별로 시각화------#

# Asia Map for Happiness Ranking 🦂 
fig = px.choropleth(sample, locations = "StNames", color = "RANK",
                    scope = 'asia', title = "Asia Happiness Ranking Map", color_continuous_scale= "magma")

# Barplot for top 10 Asian countries on Happiness Index
data = df[df["Continent"] == "AS"].head(10)

plt.figure(figsize=(28,5))
plt.title("Top 10 Asian Countries Happiness Ranking")
sns.barplot(x = data["Country"], y = data["happinessScore"], data = data, palette='magma', edgecolor='black')

fig.show()
plt.savefig('asia-map', dpi=300)


# Europian Map for Happiness Ranking 🦂 
fig = px.choropleth(sample, locations = "StNames", color = "RANK",
                    scope = 'europe', title = "Europian Happiness Ranking Map", color_continuous_scale= "viridis")

# Barplot for top 10 Europian countries on Happiness Index
data = df[df["Continent"] == "EU"].head(10)

plt.figure(figsize=(28,5))
plt.title("Top 10 Europian Countries Happiness Ranking")
sns.barplot(x = data["Country"], y = data["happinessScore"], data = data, palette='viridis', edgecolor='black')

fig.show()
plt.savefig('europian-map', dpi=300)



# Africa Map for Happiness Ranking 🦂 
fig = px.choropleth(sample, locations = "StNames", color = "RANK",
                    scope = 'africa', title = "African Happiness Ranking Map", color_continuous_scale= "magma")


# Barplot for top 10 Europian countries on Happiness Index
data = df[df["Continent"] == "AF"].head(10)

plt.figure(figsize=(28,5))
plt.title("Top 10 African Countries Happiness Ranking")
sns.barplot(x = data["Country"], y = data["happinessScore"], data = data, palette='magma', edgecolor='black')

fig.show()
plt.savefig('africa-map', dpi=300)



# North American Map for Happiness Ranking 🦂 
fig = px.choropleth(sample, locations = "StNames", color = "RANK",
                    scope = 'north america', title = "North American Happiness Ranking Map", color_continuous_scale= "viridis")


# Barplot for top 10 Europian countries on Happiness Index
data = df[df["Continent"] == "NA"].head(10)

plt.figure(figsize=(28,5))
plt.title("Top 10 North American Countries Happiness Ranking")
sns.barplot(x = data["Country"], y = data["happinessScore"], data = data, palette='viridis', edgecolor='black')

fig.show()
plt.savefig('north-american-map', dpi=300)




# South American Map for Happiness Ranking 🦂 
fig = px.choropleth(sample, locations = "StNames", color = "RANK",
                    scope = 'south america', title = "South American Happiness Ranking Map", color_continuous_scale= "magma")


# Barplot for top 10 Europian countries on Happiness Index
data = df[df["Continent"] == "SA"].head(10)

plt.figure(figsize=(28,5))
plt.title("Top 10 South American Countries Happiness Ranking")
sns.barplot(x = data["Country"], y = data["happinessScore"], data = data, palette='magma', edgecolor='black')

fig.show()
plt.savefig('south-american-map', dpi=300)

#-------여기까지가 대륙별로 시각화한것 ------#

#---------대륙별로 grouping하기-------------#

# Grouping data on basis of continents 🐾
contData = df.groupby("Continent")


# Average happinessScore per Continent 🦨
happAvg = contData["happinessScore"].mean()
pd.DataFrame(happAvg)


#대륙별 행복 score barchart
plt.title("Average happinessScore", fontdict={'fontsize':15})
plt.ylabel("happinessScore")
sns.barplot(x = happAvg.index, y = happAvg.values, palette = "viridis")
plt.savefig('score per continent', dpi=300)

#Top10 / Low10 barchart
plt.subplots(2,1,figsize=(12,14))
plt.subplot(211)
x = df.sort_values('happinessScore', ascending=True).tail(10)
plt.barh(y='Country', width='happinessScore', data=x, color='deepskyblue')
plt.xlim(xmin=7.0, xmax=7.8)
plt.title('10 Countries with the Highest Happiness -2022')
plt.subplot(212)
x = df.sort_values('happinessScore', ascending=False).tail(10)
plt.barh(y='Country', width='happinessScore', data=x, color='violet')
plt.xlim(xmin=2.8, xmax=4.0)
plt.title('10 Countries with the Lowest Happiness -2022')
plt.savefig('highest vs lowest', dpi=300)

#--------  여기까지 수정함----------#