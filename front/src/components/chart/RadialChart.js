import { fontSize } from '@mui/system';
import { useEffect, useState } from 'react';
import { RadialBarChart, Tooltip, Legend, RadialBar} from 'recharts';
// import data from "../data/data3.js"
import * as Api from '../../api'

function RadialChart({nation}){
    const [radialData, setRadialData] = useState([])

    async function getRadialData() {
        try {
          const res = await Api.get(`result/${nation}`);
          setRadialData(res.data)
        } catch (err) {
          console.log(err);
        }
      }

    useEffect(() => {
        getRadialData()
    }, [])

    return (
        <RadialBarChart 
            width={900} 
            height={450} 
            innerRadius="10%" 
            outerRadius="80%" 
            data={radialData} 
            startAngle={180} 
            endAngle={0}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
        <Legend value={radialData.name} iconSize={40} width={240} height={140} layout='vertical' verticalAlign='start' align="right" wrapperStyle={{fontSize: "20px"}} />
        <Tooltip />
        </RadialBarChart>
    )
} 
export default RadialChart
