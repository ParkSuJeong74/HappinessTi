import { useContext, useState } from "react"
import { UserStateContext } from "../../App.js"
import * as Api from '../../api'
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#6587FF',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#6587FF',
      }, 
      width: '280px'
    },
})(TextField);

function ProfileEditForm({setEditOpen}){
    const userState = useContext(UserStateContext)
    const loginUserId = userState.user?.id
    const [nickname, setNickname] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Api.put(`users/${loginUserId}`, {
                nickname,
                description,
            })
            console.log(res.data)
            
            alert("회원정보 변경완료!")
            setEditOpen(false)
        
        } catch (error) {
            alert(error.response.data)
        }
    }
    return (
        <>
        <Grid item xs={5}>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{ mt: 0.5, alignItems:'center',justifyContent: "center"}}
                >
                    <CssTextField
                        id="Nickname"
                        label="Nickname 수정"
                        placeholder="원래닉네임"
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <CssTextField 
                        id="Description"
                        label="Description 수정"
                        placeholder="원래설명"
                        multiline
                        row={3}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Stack
                        direction="column"
                        spacing={1}
                        sx={UploadBox}
                    >
                        <UploadFileIcon sx={{alignItems: 'center', color:'gray'}}/>
                        <Typography sx={{opacity: 1}}>
                            Image Upload Button!
                        </Typography>
                        <Button>Upload</Button>
                    </Stack>

                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 2, justifyContent: "center" }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disableRipple
                    > 확인 </Button>
                    <Button
                        type="reset"
                        onClick={() => setEditOpen(false)}
                        variant="outlined"
                    > 취소 </Button>
                </Stack>

            </Box>
        </Grid>

        </>
    )
}
export default ProfileEditForm


const UploadBox = {
    border: '1px dashed gray', 
    bgcolor: 'rgba(0, 0, 0, 0.05)',
    width: '280px',
    alignItems:'center',
    justifyContent: "center",
    p:1
}