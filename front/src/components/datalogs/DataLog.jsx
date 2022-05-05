import { Container } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import data from '../../srcAssets/style/Data.module.css'
import * as Api from '../../api'
import React, {useEffect, useState} from "react"

const columns = [
    { field: 'country', headerName: 'country', width: 130 },
    { field: 'happinessScore', headerName: 'happinessScore', width: 130 },
    { field: 'socialSupport', headerName: 'socialSupport', width: 130 },
    { field: 'freedom', headerName: 'freedom', width: 130 },
    { field: 'gdp', headerName: 'gdp', width: 130 },
    { field: 'generosity', headerName: 'generosity', width: 130 },
    { field: 'corruptionPerceptions', headerName: 'corruptionPerceptions', width: 130 },
    { field: 'dystopia', headerName: 'dystopia', width: 130 },
    { field: 'continent', headerName: 'continent', width: 130 },
];

function DataLog(){
    const [datas, setDatas] = useState(null)
    useEffect(()=>{
        try{
        Api.get("happiness/lists").then(res =>{
            setDatas(res.data)
        })
        } catch(err){
        console.log(err);
        }
    },[])
    return (
        <Container sx={{py: 7, mt: 12}}>
            <div className={data.dataTitle1}>
                <span className={data.dataTitle2}>전체 행복 Ti 보기</span>
            </div>
            <div className={data.dataTitle3}>
                <span className={data.dataTitle4}>전체 행복 Ti 리스트입니다.</span>
            </div>
            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
            <div className={data.dataHappyTi} style={{ height: 381, width: '85%', margin: '0 auto'}}>
                <DataGrid
                    onRowClick={(e) => console.log(e.row.type.split(" ")[0])}
                    rows={datas}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Container>
    )
}
export default DataLog
