import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../Route'
import Swal from 'sweetalert2'
import * as Api from '../../api'
import { useContext } from 'react';
import { DispatchContext, UserStateContext } from '../../App';

function UserManagement(){
    const navigate = useNavigate()
    const userState = useContext(UserStateContext)
    const dispatch = useContext(DispatchContext)

    const loginUserId = userState.user?._id ?? userState.user?.id

    function withDrawlHandler(){
        Swal.fire({
            title: '계정 탈퇴',
            text: "정말로 HAPPY-TI를 떠나실 건가요?? 저희가 잘할게요..",
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: '넵',
            showCancelButton: true,
            cancelButtonText: '아니요!!',
            focusCancel: true,
            showCloseButton: true,
        }).then(async function(result) {
            if(result.isConfirmed){
                
                //TODO: user 계정 삭제 api 호출하기!
                await Api.delete("users", loginUserId)
                sessionStorage.removeItem("userToken")
                dispatch({
                    type: 'LOGOUT'      
                })

                Swal.fire({
                    title: '회원 탈퇴되었습니다!',
                    text: '당신, 쿨하시군요!',
                    icon: 'success'
                })
                
                navigate(ROUTES.MAIN_PAGE.link)
            }
            
        })
    }

    return (
        <Accordion sx={{mt: 3, p:2}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
            <Typography variant="h5" >회원 관리</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Stack direction="row" sx={{mb: 2}}>
                    <Typography sx={{fontWeight: 'bold'}} variant="h6">비밀번호를 변경하시나요?</Typography>
                    <Button variant="contained" color="secondary" onClick={() => navigate(ROUTES.PASSWORD.link)} sx={{ml: 2}}>비밀번호 변경</Button>
                </Stack>

                <Stack direction="row">
                    <Typography sx={{fontWeight: 'bold'}} variant="h6">HAPPY-TI를 <span style={{color: 'red'}}>탈퇴</span>하시나요?</Typography>
                    <Button onClick={() => withDrawlHandler()}variant="contained" color="error" sx={{verticalAlign: 'baseline', ml: 2}}>계정 삭제</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}
export default UserManagement