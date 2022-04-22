import { useContext, useState } from "react"
import { UserStateContext } from "../../App.js"
import * as Api from '../../api'
import { Box, Button, Grid, Stack } from "@mui/material"
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'pink',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'pink',
      }, 
      width: '300px'
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
                    sx={{ mt: 3, alignItems:'center',justifyContent: "center"}}
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
                        onChange={(e) => setDescription(e.target.value)}
                    />
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


  