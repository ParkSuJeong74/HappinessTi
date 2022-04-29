import { ComposedChart, XAxis,  YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line} from 'recharts';

const data = [
    {
      "name": "EU",
      "socialSupport": 4000,
      "gdp": 2400,
      "happyScore": 2400,
      "lifeExpectancy": 5000,
    },
    {
      "name": "AS",
      "socialSupport": 3000,
      "gdp": 1398,
      "happyScore": 2210,
      "lifeExpectancy": 3477,
    },
    {
      "name": "OC",
      "socialSupport": 2000,
      "gdp": 9800,
      "happyScore": 2290,
      "lifeExpectancy": 2000,
    },
    {
      "name": "SA",
      "socialSupport": 2780,
      "gdp": 3908,
      "happyScore": 2000,
      "lifeExpectancy": 3488,
    },
    {
      "name": "AF",
      "socialSupport": 1890,
      "gdp": 4800,
      "happyScore": 2181,
      "lifeExpectancy": 2399,
    },
    {
      "name": "North America",
      "socialSupport": 2390,
      "gdp": 3800,
      "happyScore": 2500,
      "lifeExpectancy": 1099,
    },
   
]
  
function Chart({active}){
    return (
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area isAnimationActive={active} dataKey="happyScore" type="monotone" fill="#8884d8" stroke="#8884d8" />
        <Bar isAnimationActive={active} dataKey="gdp" barSize={20} fill="#413ea0" />
        <Bar isAnimationActive={active} dataKey="lifeExpectancy" barSize={20} fill="#8E3200" />
        <Line isAnimationActive={active} dataKey="socialSupport" type="monotone" stroke="#ff7300" />
      </ComposedChart>
    )
}

export default Chart