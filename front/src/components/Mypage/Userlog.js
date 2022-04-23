import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
];

function Userlog(){
    return(
        <Accordion sx={{p: 2}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography variant="h5">HAPPY-TI 로그</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <div style={{ height: 300, width: '85%', margin: '0 auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default Userlog