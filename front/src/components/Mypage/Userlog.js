import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {withStyles} from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const StyleDataGrid = withStyles({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '12px',
          height: '12px'
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#F6E7D8',
          borderRadius: '10px'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#FE8F8F',
          borderRadius: '10px'
        }
      },
})(DataGrid);

const columns = [
    { field: 'rank', headerName: '행복도 순위', width: 130 },
    { field: 'country', headerName: '국가', width: 130 },
    { field: 'happinessScore', headerName: '행복 지수', width: 130 },
    { field: 'dystopia', headerName: '디스토피아', width: 130 },
    { field: 'gdp', headerName: 'GDP 지수', width: 130 },
    { field: 'socialSupport', headerName: '사회적 지지도', width: 130 },
    { field: 'freedom', headerName: '자유도', width: 130 },
    { field: 'generosity', headerName: '관용도', width: 130 },
    { field: 'corruptionPerceptions', headerName: '부패 지수', width: 130 },
    { field: 'continent', headerName: '대륙', width: 130 },
    { field: 'health', headerName: '건강 지수', width: 130 },
    { field: 'updatedAt', headerName: '시간', width: 130 },
];

function Userlog({surveyLog}){
    const navigate = useNavigate()

    return(
        <Accordion sx={{p: 2}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography variant="h5" >HAPPY-TI 로그</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {surveyLog?.length !== 0
                ? 
                <div style={{ height: 400, width: '85%', margin: '0 auto', cursor: 'pointer'}}>
                    <StyleDataGrid
                        onRowClick={(e) => {
                            const country = e.row.country
                            navigate(`/analysis/${country}`)
                        }}
                        rows={surveyLog}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
                : <LogMessage>아직 HAPPY-TI를 한 번도 하지 않으셨습니다!</LogMessage>
                }
                
            </AccordionDetails>
        </Accordion>
    )
}

export default Userlog

const LogMessage = styled.div`
    color: #6587ff;
    font-size: 20px;
`;