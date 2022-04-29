import {  ResponsiveChoropleth, ResponsiveChoroplethCanvas  } from '@nivo/geo'
import data from "./dataMap.js"
import countries from "./world_countries.json";

const MyResponsiveChoropleth = ({ data }) => (
    <ResponsiveChoroplethCanvas
      data={data}
      features={countries.features}
      colors="RdBu" /* RdBu */
      domain={[ 3, 8 ]}
      unknownColor="rgba(36, 34, 34, 0.045)"
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

function ChartMap() {
  return (
    <div style={{ height: "400px", width: "750px" }}>
      <MyResponsiveChoropleth data={data} />
    </div>
  )
}

export default ChartMap