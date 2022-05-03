import React, {useEffect, useState} from "react"
import { ComposedChart, XAxis,  YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line} from 'recharts';
import * as Api from '../../../api'


function ChartComposed({active}){
  const [data, setData] = useState(null)
  useEffect(()=>{
    try{
      Api.get("graph/composed").then(res =>{
        console.log(res.data)
        setData(res.data)
      })
    } catch(err){
      console.log(err);
    }
  },[])
  
  
    return (
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="year" />
        <YAxis type="number" domain={[3, 7]}/>
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area isAnimationActive={active} type="monotone" dataKey="health" fill="#8884d8" stroke="#8884d8" />
        <Bar isAnimationActive={active} dataKey="happinessScore" barSize={20} fill="#413ea0" />
        <Line isAnimationActive={active} type="monotone" dataKey="socialSupport" stroke="#ff7300" />
        <Line type="monotone" dataKey="gdp" stroke="#9933ff" />
      </ComposedChart>
    )
}

export default ChartComposed