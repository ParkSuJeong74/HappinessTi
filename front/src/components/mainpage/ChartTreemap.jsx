import { Treemap } from 'recharts';
import data from './dataTreemap'

const MyTreeMap = ({ data }) => {
    console.log("여기data", data)
    return (
        
        <Treemap
            width={730}
            height={250}
            data={data}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            />
    )
}

function ChartTreemap() {
    return (
      <div style={{ height: "400px" }}>
        <MyTreeMap data={data} />
      </div>
    )
  }
  
  export default ChartTreemap