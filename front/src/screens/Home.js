import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";

const data = [
  {
    id: "AFG",
    value: 91587,
  },
  {
    id: "AGO",
    value: 493725,
  },
  {
    id: "ALB",
    value: 301122,
  },
  {
    id: "ARE",
    value: 600057,
  },
  {
    id: "ARG",
    value: 566157,
  },
  {
    id: "ARM",
    value: 34595,
  },
  {
    id: "ATA",
    value: 824510,
  },
  {
    id: "ATF",
    value: 425685,
  },
  {
    id: "AUT",
    value: 969036,
  },
  {
    id: "AZE",
    value: 962624,
  },
  {
    id: "BDI",
    value: 573772,
  },
  {
    id: "BEL",
    value: 274791,
  },
  {
    id: "BEN",
    value: 107678,
  },
  {
    id: "BFA",
    value: 908500,
  },
  {
    id: "BGD",
    value: 33750,
  },
  {
    id: "BGR",
    value: 311384,
  },
  {
    id: "BHS",
    value: 614616,
  },
  {
    id: "BIH",
    value: 786581,
  },
  {
    id: "BLR",
    value: 960391,
  },
  {
    id: "BLZ",
    value: 441613,
  },
  {
    id: "BOL",
    value: 411184,
  },
  {
    id: "BRN",
    value: 281500,
  },
  {
    id: "BTN",
    value: 748231,
  },
  {
    id: "BWA",
    value: 93613,
  },
  {
    id: "CAF",
    value: 942256,
  },
  {
    id: "CAN",
    value: 327492,
  },
  {
    id: "CHE",
    value: 429100,
  },
  {
    id: "CHL",
    value: 230471,
  },
  {
    id: "CHN",
    value: 687151,
  },
  {
    id: "CIV",
    value: 299574,
  },
  {
    id: "CMR",
    value: 795724,
  },
  {
    id: "COG",
    value: 277878,
  },
  {
    id: "COL",
    value: 223080,
  },
  {
    id: "CRI",
    value: 776057,
  },
  {
    id: "CUB",
    value: 693064,
  },
  {
    id: "-99",
    value: 966229,
  },
  {
    id: "CYP",
    value: 762509,
  },
  {
    id: "CZE",
    value: 391111,
  },
  {
    id: "DEU",
    value: 281700,
  },
  {
    id: "DJI",
    value: 968040,
  },
  {
    id: "DNK",
    value: 430662,
  },
  {
    id: "DOM",
    value: 557257,
  },
  {
    id: "DZA",
    value: 704895,
  },
  {
    id: "ECU",
    value: 571564,
  },
  {
    id: "EGY",
    value: 938205,
  },
  {
    id: "ERI",
    value: 366061,
  },
  {
    id: "ESP",
    value: 780882,
  },
  {
    id: "EST",
    value: 787161,
  },
  {
    id: "ETH",
    value: 337877,
  },
  {
    id: "FIN",
    value: 2200,
  },
  {
    id: "FJI",
    value: 444567,
  },
  {
    id: "FLK",
    value: 136890,
  },
  {
    id: "FRA",
    value: 582828,
  },
  {
    id: "GAB",
    value: 528585,
  },
  {
    id: "GBR",
    value: 119416,
  },
  {
    id: "GEO",
    value: 623346,
  },
  {
    id: "GHA",
    value: 295920,
  },
  {
    id: "GIN",
    value: 205199,
  },
  {
    id: "GMB",
    value: 212375,
  },
  {
    id: "GNB",
    value: 670149,
  },
  {
    id: "GNQ",
    value: 45840,
  },
  {
    id: "GRC",
    value: 609421,
  },
  {
    id: "GTM",
    value: 372732,
  },
  {
    id: "GUY",
    value: 682749,
  },
  {
    id: "HND",
    value: 504807,
  },
  {
    id: "HRV",
    value: 423850,
  },
  {
    id: "HTI",
    value: 569008,
  },
  {
    id: "HUN",
    value: 648905,
  },
  {
    id: "IDN",
    value: 908515,
  },
  {
    id: "IND",
    value: 360363,
  },
  {
    id: "IRL",
    value: 227214,
  },
  {
    id: "IRN",
    value: 608108,
  },
  {
    id: "IRQ",
    value: 802428,
  },
  {
    id: "ISL",
    value: 882711,
  },
  {
    id: "ISR",
    value: 421665,
  },
  {
    id: "ITA",
    value: 802195,
  },
  {
    id: "JAM",
    value: 43031,
  },
  {
    id: "JOR",
    value: 480716,
  },
  {
    id: "JPN",
    value: 604946,
  },
  {
    id: "KAZ",
    value: 554259,
  },
  {
    id: "KEN",
    value: 88567,
  },
  {
    id: "KGZ",
    value: 3813,
  },
  {
    id: "KHM",
    value: 194353,
  },
  {
    id: "OSA",
    value: 24666,
  },
  {
    id: "KWT",
    value: 734057,
  },
  {
    id: "LAO",
    value: 944629,
  },
  {
    id: "LBN",
    value: 297556,
  },
  {
    id: "LBR",
    value: 970392,
  },
  {
    id: "LBY",
    value: 159340,
  },
  {
    id: "LKA",
    value: 907431,
  },
  {
    id: "LSO",
    value: 1937,
  },
  {
    id: "LTU",
    value: 287100,
  },
  {
    id: "LUX",
    value: 141634,
  },
  {
    id: "LVA",
    value: 6128,
  },
  {
    id: "MAR",
    value: 741428,
  },
  {
    id: "MDA",
    value: 391187,
  },
  {
    id: "MDG",
    value: 264389,
  },
  {
    id: "MEX",
    value: 77480,
  },
  {
    id: "MKD",
    value: 771778,
  },
  {
    id: "MLI",
    value: 844816,
  },
  {
    id: "MMR",
    value: 868793,
  },
  {
    id: "MNE",
    value: 254688,
  },
  {
    id: "MNG",
    value: 261944,
  },
  {
    id: "MOZ",
    value: 46700,
  },
  {
    id: "MRT",
    value: 306663,
  },
  {
    id: "MWI",
    value: 8957,
  },
  {
    id: "MYS",
    value: 630768,
  },
  {
    id: "NAM",
    value: 826853,
  },
  {
    id: "NCL",
    value: 802501,
  },
  {
    id: "NER",
    value: 638998,
  },
  {
    id: "NGA",
    value: 367684,
  },
  {
    id: "NIC",
    value: 218867,
  },
  {
    id: "NLD",
    value: 970132,
  },
  {
    id: "NOR",
    value: 56154,
  },
  {
    id: "NPL",
    value: 270626,
  },
  {
    id: "NZL",
    value: 333136,
  },
  {
    id: "OMN",
    value: 552655,
  },
  {
    id: "PAK",
    value: 187483,
  },
  {
    id: "PAN",
    value: 954446,
  },
  {
    id: "PER",
    value: 816134,
  },
  {
    id: "PHL",
    value: 888788,
  },
  {
    id: "PNG",
    value: 35524,
  },
  {
    id: "POL",
    value: 550362,
  },
  {
    id: "PRI",
    value: 617581,
  },
  {
    id: "PRT",
    value: 712157,
  },
  {
    id: "PRY",
    value: 846920,
  },
  {
    id: "QAT",
    value: 928777,
  },
  {
    id: "ROU",
    value: 184918,
  },
  {
    id: "RUS",
    value: 312705,
  },
  {
    id: "RWA",
    value: 48114,
  },
  {
    id: "ESH",
    value: 656663,
  },
  {
    id: "SAU",
    value: 417509,
  },
  {
    id: "SDN",
    value: 975675,
  },
  {
    id: "SDS",
    value: 392056,
  },
  {
    id: "SEN",
    value: 73403,
  },
  {
    id: "SLB",
    value: 38638,
  },
  {
    id: "SLE",
    value: 415626,
  },
  {
    id: "SLV",
    value: 994799,
  },
  {
    id: "ABV",
    value: 305737,
  },
  {
    id: "SOM",
    value: 234055,
  },
  {
    id: "SRB",
    value: 617675,
  },
  {
    id: "SUR",
    value: 354142,
  },
  {
    id: "SVK",
    value: 839466,
  },
  {
    id: "SVN",
    value: 537928,
  },
  {
    id: "SWZ",
    value: 2793,
  },
  {
    id: "SYR",
    value: 140867,
  },
  {
    id: "TCD",
    value: 259283,
  },
  {
    id: "TGO",
    value: 774358,
  },
  {
    id: "THA",
    value: 913736,
  },
  {
    id: "TJK",
    value: 631801,
  },
  {
    id: "TKM",
    value: 619170,
  },
  {
    id: "TLS",
    value: 1894,
  },
  {
    id: "TTO",
    value: 998622,
  },
  {
    id: "TUN",
    value: 51122,
  },
  {
    id: "TUR",
    value: 580904,
  },
  {
    id: "TWN",
    value: 191678,
  },
  {
    id: "TZA",
    value: 199045,
  },
  {
    id: "UGA",
    value: 594825,
  },
  {
    id: "UKR",
    value: 944651,
  },
  {
    id: "URY",
    value: 230455,
  },
  {
    id: "USA",
    value: 803830,
  },
  {
    id: "UZB",
    value: 356548,
  },
  {
    id: "VEN",
    value: 760928,
  },
  {
    id: "VNM",
    value: 740652,
  },
  {
    id: "VUT",
    value: 333330,
  },
  {
    id: "PSE",
    value: 417776,
  },
  {
    id: "YEM",
    value: 814417,
  },
  {
    id: "ZAF",
    value: 837943,
  },
  {
    id: "ZMB",
    value: 219116,
  },
  {
    id: "ZWE",
    value: 443972,
  },
  {
    id: "KOR",
    value: 84433,
  },
];

function Home() {
  //   const MyResponsiveChoropleth = { data /* see data tab */ };
  return (
    <>
      <div>메인페이지</div>
      <div>
        <MyResponsiveChoropleth data={data} />
      </div>
    </>
  );
}

const MyResponsiveChoropleth = ({ data }) => (
  <ResponsiveChoropleth
    data={data}
    features={countries.features}
    // margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    // colors="nivo"
    // // domain={[0, 1000000]}
    // unknownColor="#666666"
    // label="properties.name"
    // valueFormat=".2s"
    // projectionTranslation={[0.5, 0.5]}
    // // projectionRotation={[0, 0, 0]}
    // enableGraticule={true}
    // graticuleLineColor="#dddddd"
    // borderWidth={0.5}
    // borderColor="#152538"
    // legends={[
    //   {
    //     anchor: "bottom-left",
    //     direction: "column",
    //     justify: true,
    //     translateX: 20,
    //     translateY: -100,
    //     itemsSpacing: 0,
    //     itemWidth: 94,
    //     itemHeight: 18,
    //     itemDirection: "left-to-right",
    //     itemTextColor: "#444444",
    //     itemOpacity: 0.85,
    //     symbolSize: 18,
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemTextColor: "#000000",
    //           itemOpacity: 1,
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);

export default Home;
