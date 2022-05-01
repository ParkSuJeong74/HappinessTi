import { ComposedChart, XAxis,  YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line} from 'recharts';
import data from "./data/data1.js"
  
function Chart(){
    return (
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="year" />
        <YAxis type="number" domain={[3, 8]}/>
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="health" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="happinessScore" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="socialSupport" stroke="#ff7300" />
        <Line type="monotone" dataKey="gdp" stroke="#9933ff" />
      </ComposedChart>
    )
}

export default Chart