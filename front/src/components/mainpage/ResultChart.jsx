import { RadialBarChart, Tooltip, Legend, RadialBar} from 'recharts';
import data from "./data/data3.js"
function ResultChart(){
    return (
        <RadialBarChart 
        width={900} 
        height={450} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={data} 
        startAngle={180} 
        endAngle={0}
        >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
        <Legend iconSize={7} width={200} height={140} layout='vertical' verticalAlign='start' align="right" />
        <Tooltip />
        </RadialBarChart>
    )
} 
export default ResultChart