import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function UserManagement(){
    return (
        <Accordion sx={{mt: 3}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
            <Typography variant="h5">회원 관리</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Stack direction="row">
                    <Typography sx={{fontWeight: 'bold'}} variant="h6">HAPPY-TI를 <span style={{color: 'red'}}>탈퇴</span>하시나요?</Typography>
                    <Button variant="contained" color="error" sx={{verticalAlign: 'baseline', ml: 2}}>계정 삭제</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}
export default UserManagement