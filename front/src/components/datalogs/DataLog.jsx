import { Container, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DataGrid } from '@mui/x-data-grid';
import data from '../../srcAssets/style/Data.module.css'
import {withStyles} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import * as Api from '../../api'
import React, {useEffect, useState} from "react"
import { styled } from '@mui/material/styles';
import loading from '../../srcAssets/img/loading.gif'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    border: '1px solid #dadde9',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'white',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    cursor: 'pointer'
  },
  [`&.${tableCellClasses.body}:hover`]: {
    backgroundColor: '#F2F2F2',
  },
}));

const columns = [
    { field: 'rank', headerName: 'rank', width: 100 },
    { field: 'country', headerName: 'country', width: 160 },
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
    const navigate = useNavigate()
    
    const [IsfetchCompleted, setIsfetchCompleted] = useState(false)

    async function getLists() {
      try{
        await Api.get("happiness/lists").then((res) =>{
          setDatas(res.data)
        })
      } catch(err){
        console.log(err);
      }
      setIsfetchCompleted(true)
    }

    useEffect(()=>{
      getLists()
    },[])

    if(!IsfetchCompleted){
      return (
        <div className={data.loading}>
          <img src={loading} alt="로딩중.." className={data.loadingImg} />
          <h1 className={data.loadingText}>데이터 불러오는 중입니다...</h1>
        </div>
      );
    }

    return (
        <div className={data.dataContainer}>
          <div className={data.dataTitle1}>
              <span className={data.dataTitle2}>전체 행복 Ti 보기</span>
          </div>
          <div className={data.dataTitle3}>
              <span className={data.dataTitle4}>
                전체 행복 Ti 리스트입니다. 
                <HtmlTooltip
                  placement="right"
                  title={
                      <Typography component="h1">
                        각 나라를 클릭하면 해당 나라의 행복도를 분석한 페이지로 이동됩니다!
                      </Typography>
                  }
                >
                  <HelpOutlineIcon />
                </HtmlTooltip>
              </span>
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
          {/* <div className={data.dataHappyTi} style={{ height: 400, width: '85%', margin: '0 auto'}}>
            <DataGrid
                onRowClick={(e) => {
                  console.log(e.row.country)
                  const nation = e.row.country
                  navigate(`/analysis/${nation}`)
                }}
                rows={datas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
          </div> */}

          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <StyledTableCell align="right" sx={{}}>rank</StyledTableCell>
                  <StyledTableCell align="right">country</StyledTableCell>
                  <StyledTableCell align="right">happinessScore</StyledTableCell>
                  <StyledTableCell align="right">corruptRecog</StyledTableCell>
                  <StyledTableCell align="right">dystopia</StyledTableCell>
                  <StyledTableCell align="right">freedom</StyledTableCell>
                  <StyledTableCell align="right">gdpIndices</StyledTableCell>
                  <StyledTableCell align="right">generosity</StyledTableCell>
                  <StyledTableCell align="right">health</StyledTableCell>
                  <StyledTableCell align="right">socialSupport</StyledTableCell>
                  <StyledTableCell align="right">continent</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {datas.map((data) => (
                  <TableRow key={data?.id} onClick={() => navigate(`/analysis/${data?.country}`)} sx={{margin: '50px'}}>
                    <StyledTableCell component="th" scope="row"> 
                      {data?.rank}
                    </StyledTableCell>
                    <StyledTableCell align="right">{data?.country}</StyledTableCell>
                    <StyledTableCell align="right">{data?.happinessScore}</StyledTableCell>
                    <StyledTableCell align="right">{data?.corruptionPerceptions}</StyledTableCell>
                    <StyledTableCell align="right">{data?.dystopia}</StyledTableCell>
                    <StyledTableCell align="right">{data?.freedom}</StyledTableCell>
                    <StyledTableCell align="right">{data?.gdp}</StyledTableCell>
                    <StyledTableCell align="right">{data?.generosity}</StyledTableCell>
                    <StyledTableCell align="right">{data?.health}</StyledTableCell>
                    <StyledTableCell align="right">{data?.socialSupport}</StyledTableCell>
                    <StyledTableCell align="right">{data?.continent}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    )
}
export default DataLog
