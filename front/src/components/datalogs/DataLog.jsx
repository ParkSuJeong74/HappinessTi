import { Container } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import data from '../../srcAssets/style/Data.module.css'
import ROUTES from '../../Route'

const columns = [
    { field: 'type', headerName: '유형', width: 160 },
    { field: 'icon', headerName: 'Icon', width: 130 },
    { field: 'happiness', headerName: '행복 지수', width: 130 },
    { field: 'freedom', headerName: '자유 지수', width: 130 },
    { field: 'gdp', headerName: 'GDP 지수', width: 130 },
    { field: 'trust', headerName: '정부 신뢰 지수', width: 130 },
    { field: 'health', headerName: '건강 지수', width: 130 },
];

// userlog api 호출받기
const rows = [
    { id: 1, type: 'Norway 형', icon: 'Jon', happiness: 75, freedom: 95, gdp: 323, trust: 509, health: 903 },
    { id: 2, type: 'Denmark 형', icon: 'Jon', happiness: 34, freedom: 955, gdp: 835, trust: 53, health: 950 },
    { id: 3, type: 'Korea 형', icon: 'Jon', happiness: 53, freedom: 34, gdp: 65, trust: 189, health: 354 },
    { id: 4, type: 'Denmark 형', icon: 'Jon', happiness: 34, freedom: 955, gdp: 835, trust: 53, health: 950 },
    { id: 5, type: 'Korea 형', icon: 'Jon', happiness: 53, freedom: 34, gdp: 65, trust: 189, health: 354 }
];

function DataLog(){
    const navigate = useNavigate()
    return (
        <Container sx={{py: 7, mt: 12}}>
            <div className={data.dataTitle1}>
                <span className={data.dataTitle2}>전체 행복 Ti 보기</span>
            </div>
            <div className={data.dataTitle3}>
                <span className={data.dataTitle4}>전체 행복 Ti 리스트입니다.</span>
            </div>

            <div className={data.dataHappyTi} style={{ height: 381, width: '85%', margin: '0 auto'}}>
                <DataGrid
                    onRowClick={(e) => {
                        const country = e.row.type.split(" ")[0]
                        console.log(country)
                        navigate(`/analysis/${country}`)
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Container>
    )
}
export default DataLog