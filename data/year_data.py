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
