import React, { useEffect, useState } from "react"
import {List, Box, Paper} from "@mui/material"
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp"
import * as Api from '../../../api'
import Item from "./Item"
import GoAllData from "./GoAllData"
import errorHandler from "../../../errorHandler"
import Style from '../../../srcAssets/style/Mainpage.module.css'

function Ranking() {
    const [rankingDatas, setRankingDatas] = useState([])

    useEffect(()=>{
      try{
        Api.get("rank").then(res =>{
          setRankingDatas(res.data)
          console.log(res.data)
        })
      } catch(err){
        errorHandler("랭킹 정보 오류", err.response.data)
        console.log(err);
      }
    },[])
  
  return (
    <>
    <Paper elevation={12} sx={{ width: "320px", bgcolor: "#FFB3A3", p: 1, }}>
      <div className={Style.resource}>(설문 결과 랭킹)</div>
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
                key={data.country} 
                data={data}
            />
        ))}
        <GoAllData />
      </List>
    </Paper>

    
    </>
  )
}

export default Ranking
