import {  ResponsiveChoropleth, ResponsiveChoroplethCanvas  } from '@nivo/geo'
import countries from "./world_countries.json";
import * as Api from '../../../api'
import React, {useEffect, useState} from "react"
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid';
import errorHandler from '../../../errorHandler';

function ChartMap() {
  const [data, setData] = useState(null)
  useEffect(()=>{
    try{
      Api.get("graph/mapplot").then(res =>{
        setData(res.data)
      })
    } catch(err){
      errorHandler("map chart 오류", err.response.data)
      console.log(err);
    }
  },[])

  const MyResponsiveChoropleth = () => (
    <ResponsiveChoroplethCanvas
      data={data}
      features={countries.features}
      colors="RdBu" /* RdBu */
      domain={[ 3, 8 ]}
      unknownColor="rgba(53, 44, 48, 0.063)"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[0.5, 0.5]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      onClick={(e) => console.log(e.id)}
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: "#444444",
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
                itemOpacity: 1
              }
            },
          ]
        }
      ]}
    />
  );
  return (
    <div style={{ height: "30em", width: "60em" }}>
      {data&&<MyResponsiveChoropleth />}
    </div>
  )
}

export default ChartMap