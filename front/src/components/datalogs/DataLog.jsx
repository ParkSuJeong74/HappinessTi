import { Container } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import data from '../../srcAssets/style/Data.module.css'
import * as Api from '../../api'
import React, {useEffect, useState} from "react"
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       width: 'auto',
//     },
//   }));
  

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//     },
//   }));

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
            console.log(res.data)
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
