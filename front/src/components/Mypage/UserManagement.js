import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../Route'
import Swal from 'sweetalert2'
import * as Api from '../../api'
import { useContext } from 'react';
import { DispatchContext } from '../../App';
import errorHandler from '../../errorHandler';
import { LOGOUT } from '../../reducer';

function UserManagement({updateUser}){
    const navigate = useNavigate()
    const dispatch = useContext(DispatchContext)
    
    function updatePassword() {
        Swal.fire({
            title: '비밀번호 변경',
            text: "변경하고 싶은 비밀번호를 아래에 작성해주세요!",
            icon: 'info',
            input: 'password',
            inputPlaceholder: "새로운 비밀번호",
            showConfirmButton: true,
            confirmButtonText: '변경',
            showCancelButton: true,
            cancelButtonText: '취소',
            showCloseButton: true,
        }).then(async function(result) {
            const newPassword = result.value

            if(result.isConfirmed){
                if(!newPassword)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '아무것도 적지 않으셨어요!',
                    })
                else{
                    try{
                        //password 변경하기 
                        const res = await Api.put("users/password", {password: newPassword})
                        updateUser(res.data)
                        Swal.fire({
                            title: '비밀번호 변경이 성공하였습니다!',
                            icon: 'success'
                        })
                    }
                    catch(err){
                        errorHandler('회원 관리 오류', err.response.data)
                    }
                }
                
            }            
        })
    }

    function withDrawlUser(){
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
                try{
                    //user 계정 삭제 
                    await Api.delete("users")
                    sessionStorage.removeItem("userToken")
                    dispatch({
                        type: LOGOUT      
                    })

                    Swal.fire({
                        title: '회원 탈퇴되었습니다!',
                        text: '당신, 쿨하시군요!',
                        icon: 'success'
                    })
                    
                    navigate(ROUTES.MAIN_PAGE.link)
                } catch(err){
                    errorHandler('회원 관리 오류', err.response.data)
                }
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
                    <Button onClick={() => updatePassword()} variant="contained" color="secondary" sx={{ml: 2}}>비밀번호 변경</Button>
                </Stack>

                <Stack direction="row">
                    <Typography sx={{fontWeight: 'bold'}} variant="h6">HAPPY-TI를 <span style={{color: 'red'}}>탈퇴</span>하시나요?</Typography>
                    <Button onClick={() => withDrawlUser()} variant="contained" color="error" sx={{verticalAlign: 'baseline', ml: 2}}>계정 삭제</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}
export default UserManagement
