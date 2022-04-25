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

# df = pd.read_csv('./file/2022_google_csv.csv')
# df = df.dropna(axis=1)


# # 전처리
# data_info= pd.DataFrame()
# data_info['Column Names']= df.columns
# data_info['Datatype'] = df.dtypes.to_list()
# data_info['num_NA']= data_info['Column Names'].apply(lambda x: df[x].isna().sum())
# data_info['%_NA']= data_info['Column Names'].apply(lambda x: df[x].isna().mean())



# #이상치 제거 함수를 불러온다.
# def detect_outliers(df, n, features):
#     outlier_indices = []
#     for col in features:
#         Q1 = np.percentile(df[col], 25)
#         Q3 = np.percentile(df[col], 75)
#         IQR = Q3 - Q1
        
#         outlier_step = 1.5 * IQR
        
#         outlier_list_col = df[(df[col] < Q1 - outlier_step) | (df[col] > Q3 + outlier_step)].index
#         outlier_indices.extend(outlier_list_col) #outlier_inidices: 이상치가 발견된 행
#     outlier_indices = Counter(outlier_indices) #행의 빈도수를 세준다.
#     print(outlier_indices)
#     multiple_outliers = list(k for k, v in outlier_indices.items() if v > n) #이상치가 2개 이상 발견되면 return 해줌
#     return multiple_outliers


# col=[i for i in df.columns]
# Outliers_to_drop = detect_outliers(df, 2,['Happiness score',
#  'Dystopia (1.83) + residual',
#  'Explained by: GDP per capita',
#  'Explained by: Social support',
#  'Explained by: Healthy life expectancy',
#  'Explained by: Freedom to make life choices',
#  'Explained by: Generosity',
#  'Explained by: Perceptions of corruption'])

# df.loc[Outliers_to_drop]

# df = df.drop(Outliers_to_drop, axis = 0).reset_index(drop=True)
# print(df.shape)

# # Seaborn Style
# sns.set(color_codes = True)
# sns.set_style("white")
# #msno.matrix(df,color=(0.3, 0.5, 0.8))
# #plt.show()



# # 이상치가 발견된 행을 확인합니다.
# #print(data_info)

# #counry는 하나도 안겹친다.
# df["Country"] = df["Country"].str.replace("*","")
# df["Country"].replace("Palestinian Territories","Palestine",inplace = True)
# df["Country"].replace("Hong Kong S.A.R. of China","Hong Kong",inplace = True)
# df["Country"].replace("Russia","Russian Federation",inplace = True)
# df["Country"].replace("Taiwan Province of China","Taiwan",inplace = True)

# # Adding a column with country codes 🧭

# def countryCode (country_name):
#     try:
#         return pc.country_name_to_country_alpha2(country_name)
#     except:
#         return None                  # None keyword adds a null value 🐹

# if __name__ == "__main__":
#     df['Country code']= df.apply(lambda x: countryCode(x.Country), axis = 1)

# # Adding a column with continent 🌡️
# def continent(country_code):
#     try:
#         return pc.country_alpha2_to_continent_code(country_code)
#     except:
#         return None                  # None keyword adds a null value 🐹
    
# if __name__ == "__main__":
#     df['Continent']= df["Country code"].apply(lambda x: continent(x))




# df.dropna(inplace = True)


# # EDA

# # 데이터들의 왜도와 척도보기


# #피처들의 Skewness (비대칭도) 확인
# for col in [
#  'Dystopia (1.83) + residual',
#  'Explained by: GDP per capita',
#  'Explained by: Social support',
#  'Explained by: Healthy life expectancy',
#  'Explained by: Freedom to make life choices',
#  'Explained by: Generosity',
#  'Explained by: Perceptions of corruption']:
#     print('{:15}'.format(col), 
#           'Skewness: {:05.2f}'.format(df[col].skew()) , 
#           '   ' ,
#           'Kurtosis: {:06.2f}'.format(df[col].kurt())  
#          )
    
# #딱히 문제 있어보이는 컬럼은 없음


# # In[ ]:


# #label의 Skewness (비대칭도) 확인
# f, ax = plt.subplots(1, 1, figsize = (10,6))
# g = sns.distplot(df["Happiness score"], color = "b", label="Skewness: {:2f}".format(df["Happiness score"].skew()), ax=ax)
# g = g.legend(loc = "best")

# print("Skewness: %f" % df["Happiness score"].skew())
# print("Kurtosis: %f" % df["Happiness score"].kurt())
# plt.savefig('target_Skewness', dpi=300)
# # Target Feature인 Happiness score의 비대칭도와 첨도를 확인합니다. 
# # 그래프와 수치를 확인하면 정상적으로 분포되지 않는것을 확인할 수 있습니다. 
# # 예측의 정확도를 높히기 위해 로그 변환을 수행합니다.
# #왜도는 절댓값을 2를 안넘고 첨도는 절댓값을 7을 안넘으면 기준에 부합한다고 할 수 있다.
# #첨도가 너무 크면 이상치가 많다고 할 수 있다.

# #딱히 문제있어보이지 않는다 그냥 이대로 쓸것임


# # #데이터 파이프라인

# # In[ ]:


# targets = ['Low', 'Low-Mid', 'Top-Mid', 'Top']
# def pipe(df):
#   df['target'] = pd.qcut(df[df.columns[2]],len(targets),labels=targets)
#   g_d=df.set_index('Country') #어차피 1행씩 밖에 없으므로 그냥 index를 country로 바꿔주기만한것
#   return g_d


# # In[ ]:


# df_t = pipe(df)
# df_t


# # ###스피어만 상관계수
# #  데이터에 순위만 매길 수 있다면 적용이 가능하므로 연속형Continuous 데이터에 적합한 피어슨 상관 계수와 달리 이산형Discrete 데이터, 순서형Ordinal 데이터에 적용이 가능하다. 

# # In[ ]:


# spearman_cormatrix= df.corr(method='spearman')
# spearman_cormatrix


# # In[ ]:


# fig, ax = plt.subplots(figsize=(14, 12))
# sns.heatmap(spearman_cormatrix,vmin=-1, vmax=1,center=0, cmap=plt.cm.PuBu, annot=True)
# plt.savefig('target_Skewness', dpi=300)

# # (GDP , Social Support, life expectancy , Freedom)가 happiniess score와 연관이 깊다.
# # 
# # 다중공선성이 보이는 것들은 (GDP, life expectancy) / (GDP , social support)이다.

# # In[ ]:


# sns.pairplot(df_t[[
#  'Dystopia (1.83) + residual',
#  'Explained by: GDP per capita',
#  'Explained by: Social support',
#  'Explained by: Healthy life expectancy',
#  'Explained by: Freedom to make life choices',
#  'Explained by: Generosity',
#  'Explained by: Perceptions of corruption','target']], hue='target')
# plt.savefig('pairplot', dpi=300)

# # 각 속성별로 TOP 10 국가들

# # In[ ]:


# fig, axes = plt.subplots(nrows=2, ncols=2,constrained_layout=True,figsize=(12,8))

# sns.barplot(x='Explained by: GDP per capita',y='Country',data=df.nlargest(10,'Explained by: GDP per capita'),ax=axes[0,0],palette="Blues_d")

# sns.barplot(x='Explained by: Social support' ,y='Country',data=df.nlargest(10,'Explained by: Social support'),ax=axes[0,1],palette="YlGn")

# sns.barplot(x='Explained by: Healthy life expectancy' ,y='Country',data=df.nlargest(10,'Explained by: Healthy life expectancy'),ax=axes[1,0],palette='OrRd')

# sns.barplot(x='Explained by: Freedom to make life choices' ,y='Country',data=df.nlargest(10,'Explained by: Freedom to make life choices'),ax=axes[1,1],palette='YlOrBr')
# plt.savefig('barplot10-1', dpi=300)

# # In[ ]:


# fig, axes = plt.subplots(nrows=1, ncols=2,constrained_layout=True,figsize=(10,4))

# sns.barplot(x='Explained by: Generosity' ,y='Country',data=df.nlargest(10,'Explained by: Generosity'),ax=axes[0],palette='Spectral')
# sns.barplot(x='Explained by: Perceptions of corruption' ,y='Country',data=df.nlargest(10,'Explained by: Perceptions of corruption'),ax=axes[1],palette='RdYlGn')
# plt.savefig('barplot10-2', dpi=300)

# # Social Support vs GDP per capita vs Healthy life expectancy

# # In[ ]:


# # Data copy 🧲
# sample = df.copy()
# # Create a column with standard names of countries 🍄
# sample["StNames"] = sample["Country"].apply(lambda x : pc.country_name_to_country_alpha3(x))


# # In[ ]:


# # World Map for Happiness Ranking 🦞
# fig = px.choropleth(sample, locations = "StNames", color = "RANK",
#                     scope = 'world', title = "Happiness Ranking World Map", color_continuous_scale= "viridis")

# # A data frame with top 20 values 🌐
# data = df.head(20)

# # Barplot for top 20 countries Happiness Index
# plt.figure(figsize=(28,5))
# plt.title("Top 20 Countries on Happiness Ranking")
# sns.barplot(x = data["Country"], y = data["Happiness score"], data = data, palette='viridis', edgecolor='black')


# fig.show()
# plt.savefig('barplot10-2', dpi=300)


# # In[ ]:


# # Asia Map for Happiness Ranking 🦂 
# fig = px.choropleth(sample, locations = "StNames", color = "RANK",
#                     scope = 'asia', title = "Asia Happiness Ranking Map", color_continuous_scale= "magma")

# # Barplot for top 10 Asian countries on Happiness Index
# data = df[df["Continent"] == "AS"].head(10)

# plt.figure(figsize=(28,5))
# plt.title("Top 10 Asian Countries Happiness Ranking")
# sns.barplot(x = data["Country"], y = data["Happiness score"], data = data, palette='magma', edgecolor='black')

# fig.show()
# plt.savefig('asia-map', dpi=300)


# # In[ ]:


# # Europian Map for Happiness Ranking 🦂 
# fig = px.choropleth(sample, locations = "StNames", color = "RANK",
#                     scope = 'europe', title = "Europian Happiness Ranking Map", color_continuous_scale= "viridis")

# # Barplot for top 10 Europian countries on Happiness Index
# data = df[df["Continent"] == "EU"].head(10)

# plt.figure(figsize=(28,5))
# plt.title("Top 10 Europian Countries Happiness Ranking")
# sns.barplot(x = data["Country"], y = data["Happiness score"], data = data, palette='viridis', edgecolor='black')

# fig.show()
# plt.savefig('europian-map', dpi=300)


# # In[ ]:


# # Africa Map for Happiness Ranking 🦂 
# fig = px.choropleth(sample, locations = "StNames", color = "RANK",
#                     scope = 'africa', title = "African Happiness Ranking Map", color_continuous_scale= "magma")


# # Barplot for top 10 Europian countries on Happiness Index
# data = df[df["Continent"] == "AF"].head(10)

# plt.figure(figsize=(28,5))
# plt.title("Top 10 African Countries Happiness Ranking")
# sns.barplot(x = data["Country"], y = data["Happiness score"], data = data, palette='magma', edgecolor='black')

# fig.show()
# plt.savefig('africa-map', dpi=300)


# # In[ ]:


# # North American Map for Happiness Ranking 🦂 
# fig = px.choropleth(sample, locations = "StNames", color = "RANK",
#                     scope = 'north america', title = "North American Happiness Ranking Map", color_continuous_scale= "viridis")


# # Barplot for top 10 Europian countries on Happiness Index
# data = df[df["Continent"] == "NA"].head(10)

# plt.figure(figsize=(28,5))
# plt.title("Top 10 North American Countries Happiness Ranking")
# sns.barplot(x = data["Country"], y = data["Happiness score"], data = data, palette='viridis', edgecolor='black')

# fig.show()
# plt.savefig('north-american-map', dpi=300)


# # In[ ]:


# # South American Map for Happiness Ranking 🦂 
# fig = px.choropleth(sample, locations = "StNames", color = "RANK",
#                     scope = 'south america', title = "South American Happiness Ranking Map", color_continuous_scale= "magma")


# # Barplot for top 10 Europian countries on Happiness Index
# data = df[df["Continent"] == "SA"].head(10)

# plt.figure(figsize=(28,5))
# plt.title("Top 10 South American Countries Happiness Ranking")
# sns.barplot(x = data["Country"], y = data["Happiness score"], data = data, palette='magma', edgecolor='black')

# fig.show()
# plt.savefig('south-american-map', dpi=300)


# # 대륙별로 grouping하기

# # In[ ]:


# # Grouping data on basis of continents 🐾
# contData = df.groupby("Continent")


# # In[ ]:


# # Average Happiness Score per Continent 🦨
# happAvg = contData["Happiness score"].mean()
# pd.DataFrame(happAvg)


# # In[ ]:


# plt.title("Average Happiness Score", fontdict={'fontsize':15})
# plt.ylabel("Happiness Score")
# sns.barplot(x = happAvg.index, y = happAvg.values, palette = "viridis")
# plt.savefig('score per continent', dpi=300)




# plt.subplots(2,1,figsize=(12,14))
# plt.subplot(211)
# x = df.sort_values('Happiness score', ascending=True).tail(10)
# plt.barh(y='Country', width='Happiness score', data=x, color='deepskyblue')
# plt.xlim(xmin=7.0, xmax=7.8)
# plt.title('10 Countries with the Highest Happiness -2022')
# plt.subplot(212)
# x = df.sort_values('Happiness score', ascending=False).tail(10)
# plt.barh(y='Country', width='Happiness score', data=x, color='violet')
# plt.xlim(xmin=2.8, xmax=4.0)
# plt.title('10 Countries with the Lowest Happiness -2022')
# plt.savefig('highest vs lowest', dpi=300)


# #컬럼명 변경
# df.rename(columns={'Happiness score':'happinessScore','Dystopia (1.83) + residual':'dystopia','Explained by: GDP per capita':'gdp','Explained by: Social support':'socialSupport',
#                    'Explained by: Healthy life expectancy':'health','Explained by: Freedom to make life choices':'freedom','Explained by: Generosity':'generosity',
#                    'Explained by: Perceptions of corruption':'corruptionPerceptions','Country':'country'},inplace=True)

# df.columns
#--------  여기까지 수정함----------#
# 년도별 데이터셋을 추가해서 년도별로 어떻게 변하나 보기

war=pd.read_csv('./file/war.csv')
war
df2015 = pd.read_csv('./file/2015.csv')
df2016 = pd.read_csv('./file/2016.csv')
df2017 = pd.read_csv('./file/2017.csv')
df2018 = pd.read_csv('./file/2018.csv')
df2019 = pd.read_csv('./file/2019.csv')
df2020 = pd.read_csv('./file/2020.csv')
df2021 = pd.read_csv('./file/2021.csv')
df2022 = pd.read_csv('./file/2022_google_csv.csv')


#Add year column
yrs = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
dfs = [df2015, df2016, df2017, df2018, df2019, df2020, df2021, df2022]
for i in range(0,8):
    dfs[i]['Year'] = yrs[i]


common_cols = ['Happiness Rank', 'Country', 'Region', 'Happiness Score', 'Economy (GDP per Capita)', 'Family (Social Support)','Health (Life Expectancy)','Freedom', 'Trust (Government Corruption)','Generosity','Year']


df2015 = df2015.rename(columns={'Family':'Family (Social Support)'})
df2015.head(2)



df2016 = df2016.rename(columns={'Family':'Family (Social Support)'})



df2017 = df2017.rename(columns={'Happiness.Rank':'Happiness Rank', 'Happiness.Score':'Happiness Score','Economy..GDP.per.Capita.':'Economy (GDP per Capita)','Family':'Family (Social Support)','Health..Life.Expectancy.':'Health (Life Expectancy)','Trust..Government.Corruption.':'Trust (Government Corruption)'})



df2017 = df2017.merge(df2015[["Country","Region"]], on="Country", how="left")
df2017["Region"] = df2017["Region"].fillna('-')
df2017.head()



df2018 = df2018.rename(columns={'Overall rank':'Happiness Rank', 'Country or region':'Country', 'Score':'Happiness Score', 'GDP per capita':'Economy (GDP per Capita)','Social support':'Family (Social Support)','Healthy life expectancy':'Health (Life Expectancy)','Freedom to make life choices':'Freedom','Perceptions of corruption':'Trust (Government Corruption)'})


df2018 = df2018.merge(df2015[["Country","Region"]], on="Country", how="left")
df2018["Region"] = df2018["Region"].fillna('-')
df2018.tail(2)


df2019 = df2019.rename(columns={'Overall rank':'Happiness Rank', 'Country or region':'Country', 'Score':'Happiness Score', 'GDP per capita':'Economy (GDP per Capita)','Social support':'Family (Social Support)','Healthy life expectancy':'Health (Life Expectancy)','Freedom to make life choices':'Freedom','Perceptions of corruption':'Trust (Government Corruption)'})


df2019 = df2019.merge(df2015[["Country","Region"]], on="Country", how="left")
df2019["Region"] = df2019["Region"].fillna('-')
df2019.head(2)



df2020 = df2020.rename(columns={'Country name':'Country','Regional indicator': 'Region','Ladder score':'Happiness Score','Explained by: Social support':'Family (Social Support)','Explained by: Healthy life expectancy':'Health (Life Expectancy)','Explained by: Freedom to make life choices':'Freedom','Explained by: Perceptions of corruption':'Trust (Government Corruption)','Explained by: Log GDP per capita':'Economy (GDP per Capita)','Explained by: Generosity':'Generosity'})



df2020['Happiness Rank'] = [i for i in range(1, len(df2020.index)+1)]



df2020 = df2020.loc[:,~df2020.columns.duplicated(keep='last')]
df2020.head(2)


df2021 = df2021.rename(columns={'Country name':'Country','Regional indicator': 'Region','Ladder score':'Happiness Score','Explained by: Social support':'Family (Social Support)','Explained by: Healthy life expectancy':'Health (Life Expectancy)','Explained by: Freedom to make life choices':'Freedom','Explained by: Perceptions of corruption':'Trust (Government Corruption)','Explained by: Log GDP per capita':'Economy (GDP per Capita)','Explained by: Generosity':'Generosity'})


df2021 = df2021.loc[:,~df2021.columns.duplicated(keep='last')]
df2021['Happiness Rank'] = [i for i in range(1, len(df2021.index)+1)]
df2021.head(2)



df2022 = df2022.merge(df2015[["Country","Region"]], on="Country", how="right")
df2022["Region"] = df2022["Region"].fillna('-')
df2022.head()



df2022 = df2022.rename(columns={'RANK':'Happiness Rank','Happiness score':'Happiness Score','Explained by: GDP per capita':'Economy (GDP per Capita)', 'Explained by: Social support':'Family (Social Support)','Explained by: Healthy life expectancy':'Health (Life Expectancy)','Explained by: Freedom to make life choices':'Freedom','Explained by: Generosity':'Generosity', 'Explained by: Perceptions of corruption':'Trust (Government Corruption)'})
df2022.head(2)


dfs = [df2015[common_cols], df2016[common_cols], df2017[common_cols], df2018[common_cols], df2019[common_cols], df2020[common_cols], df2021[common_cols], df2022[common_cols]]


df_merged = pd.DataFrame(columns=common_cols)


df_merged = df_merged.append(dfs)


df_merged.shape



df_merged.dropna(axis='rows',inplace=True)



df_merged.shape



df_merged["Country"].replace("Palestinian Territories","Palestine",inplace = True)
df_merged["Country"].replace("Hong Kong S.A.R. of China","Hong Kong",inplace = True)
df_merged["Country"].replace("Russia","Russian Federation",inplace = True)
df_merged["Country"].replace("Taiwan Province of China","Taiwan",inplace = True)
df_merged["Country"].replace("Congo (Brazzaville)","Congo",inplace = True)
df_merged["Country"].replace("Congo (Kinshasa)","Congo",inplace = True)
df_merged["Country"].replace("Hong Kong S.A.R., China","Hong Kong",inplace = True)


# ##이제 버블차트를 그려볼것이다.


gapminder_indicators=pd.read_csv('./file/gapminder.tsv',sep='\t')


gapminder_indicators["country"].replace('Congo, Dem. Rep.',"Congo",inplace = True)
gapminder_indicators["country"].replace("Hong Kong, China","Hong Kong",inplace = True)
gapminder_indicators["country"].replace("Korea, Dem. Rep.","Korea",inplace = True)
gapminder_indicators["country"].replace("Yemen, Rep.","Yemen",inplace = True)



def countryCode (country_name):
    try:
        return pc.country_name_to_country_alpha2(country_name)
    except:
        return None                  # None keyword adds a null value 🐹

if __name__ == "__main__":
    gapminder_indicators['Country code']= gapminder_indicators.apply(lambda x: countryCode(x.country), axis = 1)


# Adding a column with continent 🌡️
def continent(country_code):
    try:
        return pc.country_alpha2_to_continent_code(country_code)
    except:
        return None                  # None keyword adds a null value 🐹
    
if __name__ == "__main__":
    gapminder_indicators['Continent']= gapminder_indicators["Country code"].apply(lambda x: continent(x))


gapminder_indicators.columns



df_merged.columns



df_merged.rename(columns={'Country':'country','Year':'year','Economy (GDP per Capita)':'gdpPercap','Health (Life Expectancy)':'lifeExp'},inplace=True)



df_merged.columns



def countryCode (country_name):
    try:
        return pc.country_name_to_country_alpha2(country_name)
    except:
        return None                  # None keyword adds a null value 🐹

if __name__ == "__main__":
    df_merged['Country code']= df_merged.apply(lambda x: countryCode(x.country), axis = 1)


# Adding a column with continent 🌡️
def continent(country_code):
    try:
        return pc.country_alpha2_to_continent_code(country_code)
    except:
        return None                  # None keyword adds a null value 🐹
    
if __name__ == "__main__":
    df_merged['Continent']= df_merged["Country code"].apply(lambda x: continent(x))


# Let's inspect if there are any duplicate values 💣
data_info= pd.DataFrame()
data_info['Column Names']= df_merged[df_merged['year']=='2021'].columns
data_info['Datatype'] = df_merged[df_merged['year']=='2021'].dtypes.to_list()
data_info['Duplicate']= data_info['Column Names'].apply(lambda x: df_merged[df_merged['year']=='2021'][x].duplicated().sum())
data_info


# Data copy 🧲
sample2 = df_merged.copy()
# Create a column with standard names of countries 🍄
def stname(country_name):
    try:
        return pc.country_name_to_country_alpha3(country_name)
    except:
        return None                  # None keyword adds a null value 🐹
    
if __name__ == "__main__":
    sample2['StNames']= sample2["country"].apply(lambda x: stname(x))


# World Map for Happiness Ranking 🦞
fig = px.choropleth(sample2, locations = "StNames", color = 'Happiness Rank',
                    scope = 'world', title = "Happiness Ranking World Map", color_continuous_scale= "viridis")

# A data frame with top 20 values 🌐
data = df_merged[df_merged['year']=='2021'].head(20) #다른연도를 보고싶으면 2021을 바꾸세요(2015~2022)

# Barplot for top 20 countries Happiness Index
plt.figure(figsize=(28,5))
plt.title("Top 20 Countries on Happiness Ranking")
sns.barplot(x = data["country"], y = data["Happiness Score"], data = data, palette='viridis', edgecolor='black')


fig.show()
plt.savefig('2021 map chart', dpi=300)



# from bubbly.bubbly import bubbleplot 
# import plotly.express as px
# from plotly.offline import iplot
# figure = bubbleplot(dataset=gapminder_indicators, x_column='gdpPercap', y_column='lifeExp', 
#     bubble_column='country', time_column='year', size_column='pop', color_column='continent', 
#     x_title="GDP per Capita", y_title="Life Expectancy", title='Gapminder Global Indicators',
#     x_logscale=True, scale_bubble=3, height=650)

# iplot(figure, config={'scrollzoom': True})


# 지도위에 내전이 일어난곳을 점으로 찍을것이다.


war=war.replace(0,2021)


war['bin']=war['yearend']-war['yearstart']


war['yearstart']


war.groupby(['yearstart','country']).size().values
#모두 1인것을 확인함



concap = pd.read_csv('./file/concap.csv')
concap.head()


data_full = pd.merge(concap[['CountryName', 'CapitalName', 'CapitalLatitude', 'CapitalLongitude']],         war,left_on='CountryName',right_on='country')


data_full=pd.merge(data_full,gapminder_indicators,left_on='CountryName',right_on='country')


print(sorted(data_full['yearstart'].unique()))
print(sorted(data_full['year'].unique()))
#겹치는 년도가 2002년, 1997도 밖에없음..


import plotly.graph_objects as go
data_full[data_full['year']==2002]['gdpPercap'] = data_full[data_full['year']==2002]['gdpPercap'].apply(lambda x: int(100*x))
data_full[data_full['year']==2002]['bin'] = data_full[data_full['year']==2002]['bin'].apply(lambda x: int(x))
fig = go.Figure()

fig.add_trace(go.Scattergeo(
                         lat = data_full[data_full['year']==2002]['CapitalLatitude'],
                     lon = data_full[data_full['year']==2002]['CapitalLongitude'],
                     text = data_full[data_full['year']==2002]['CountryName'],
#                     mode="markers+text",|
                     marker={
                        "color": data_full[data_full['year']==2002]['gdpPercap'],
                        "line": {"width": 1},
                 "size": data_full[data_full['year']==2002]['bin']}
                           ))

fig.update_layout(
    title_text="World wars"
)

plt.savefig('2002 war location', dpi=300)


# Data copy 🧲
sample3 = gapminder_indicators.copy()
# Create a column with standard names of countries 🍄
def stname(country_name):
    try:
        return pc.country_name_to_country_alpha3(country_name)
    except:
        return None                  # None keyword adds a null value 🐹
    
if __name__ == "__main__":
    sample3['StNames']= sample3["country"].apply(lambda x: stname(x))


gapminder_indicators.columns



# World Map for Happiness Ranking 🦞
fig = px.choropleth(sample3, locations = "StNames", color = 'gdpPercap',
                    scope = 'world', title = "Happiness Ranking World Map", color_continuous_scale= "viridis")

# A data frame with top 20 values 🌐
data = gapminder_indicators[gapminder_indicators['year']==2002].head(20) #다른연도를 보고싶으면 2021을 바꾸세요(2015~2022)

# Barplot for top 20 countries Happiness Index
plt.figure(figsize=(28,5))
plt.title("Top 20 Countries on Happiness Ranking")
sns.barplot(x = data["country"], y = data['gdpPercap'], data = data, palette='viridis', edgecolor='black')

import plotly.graph_objects as go
data_full[data_full['year']==2002]['bin'] = data_full[data_full['year']==2002]['bin'].apply(lambda x: int(x))
fig = go.Figure()

fig.add_trace(go.Scattergeo(
                         lat = data_full[data_full['year']==2002]['CapitalLatitude'],
                     lon = data_full[data_full['year']==2002]['CapitalLongitude'],
                     text = data_full[data_full['year']==2002]['CountryName'],
#                     mode="markers+text",|
                     marker={
                        "line": {"width": 1},
                 "size": data_full[data_full['year']==2002]['bin']}
                           ))

fig.update_layout(
    title_text="World wars"
)
fig.show()
plt.savefig('2002 war location with gdp', dpi=300)
