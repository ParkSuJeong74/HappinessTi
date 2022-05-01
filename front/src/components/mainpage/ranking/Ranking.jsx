import * as React from "react"
import List from "@mui/material/List"
import Box from "@mui/material/Box"

import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp"
import Item from "./Item"
import GoAllData from "./GoAllData"
import { useNavigate } from "react-router-dom"
import { Paper } from "@mui/material"

const rankingDatas = [
    {
        id: 1,
        grade: 1,
        nation: 'Denmark',
    },
    {
        id: 2,
        grade: 2,
        nation: 'Norway',
    },
    {
        id: 3,
        grade: 3,
        nation: 'The%20Republic%20Of%20Korea',
    },
    {
        id: 4,
        grade: 4,
        nation: 'Canada',
    },
    {
        id: 5,
        grade: 5,
        nation: 'Australia',
    }
]

function Ranking() {
    const naviage = useNavigate()

  return (
    <Paper elevation={12} sx={{ width: "320px", bgcolor: "#FFB3A3", p: 1, margin: 0 }}>
      
      <Box sx={{ margin: "1.3em", textAlign: "center" }}>
          <EmojiEventsSharpIcon sx={{ fontSize: "3.5rem", color: "#FFFA82" }} />
            <p style={{ color: "#fff" }}>
              ranking
            </p>
      </Box>

      <List
        sx={{ width: "100%", maxWidth: 600, bgcolor: "#fff", borderRadius: 5 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {rankingDatas.map((data) => (
            <Item
                key={data.grade} 
                data={data}
            />
        ))}
        <GoAllData />
      </List>

    </Paper>
  )
}

export default Ranking
