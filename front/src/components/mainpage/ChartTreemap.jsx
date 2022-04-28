import { Treemap } from 'recharts';
import data from './dataTreemap'

const MyTreeMap = ({ data }) => {
    return (
        
        <Treemap
            width={1000}
            height={500}
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
      <div>
        <MyTreeMap data={data} />
      </div>
    )
  }
  
  export default ChartTreemap