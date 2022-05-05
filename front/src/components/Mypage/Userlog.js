import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Api from '../../api'
import styled from 'styled-components'

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

// userlog api 호출받기
// const rows = [
//     { id: 1, type: 'Norway 형', icon: 'Jon', happiness: 75, freedom: 95, gdp: 323, trust: 509, health: 903 },
//     { id: 2, type: 'Denmark 형', icon: 'Jon', happiness: 34, freedom: 955, gdp: 835, trust: 53, health: 950 },
//     { id: 3, type: 'Korea 형', icon: 'Jon', happiness: 53, freedom: 34, gdp: 65, trust: 189, health: 354 },
// ];

function Userlog(){
    const navigate = useNavigate()
    const [rows, setRows] = useState([])

    async function getSurveyLogs() {
        try {
          const res = await Api.get("users/survey/logs");
          const listData = res.data;

          for(let i=0; i< listData.length; i++){
            listData[i]['id'] = i+1;
            let time = listData[i]['updatedAt'].split("T")[0]
            listData[i]['updatedAt'] = time
          }

          setRows(listData)
        } catch (err) {
          console.log(err);
        }
      }

    useEffect(() => {
        getSurveyLogs()
    }, [])

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
                {console.log(rows)}
                {rows.length !== 0
                ? 
                <div style={{ height: 300, width: '85%', margin: '0 auto', cursor: 'pointer'}}>
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