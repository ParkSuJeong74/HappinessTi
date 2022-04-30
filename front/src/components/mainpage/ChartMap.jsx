import { ResponsiveChoropleth } from '@nivo/geo'
import data from "./data/data2.js"
import countries from "./world_countries.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveChoropleth = ({ data }) => (
    <ResponsiveChoropleth
      data={data}
      features={countries.features}
      colors="nivo"
      domain={[ 0, 1000000 ]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[0.5, 0.5]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
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
            }
          ]
        }
      ]}
    />
  );

function ChartMap() {
  return (
    <div style={{ height: "400px" }}>
      <MyResponsiveChoropleth data={data} />
    </div>
  )
}

export default ChartMap