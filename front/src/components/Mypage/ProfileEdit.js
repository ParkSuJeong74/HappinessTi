import { useContext, useState } from "react"
import { UserStateContext } from "../../App.js"
import * as Api from '../../api'
import { Button, Grid, Stack, Typography } from "@mui/material"
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from "axios";

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

function ProfileEdit({setEditOpen, updateUser, user}){
  const userState = useContext(UserStateContext)
  const loginUserId = userState.user?._id ?? userState.user?.id
  const [nickname, setNickname] = useState(user?.nickname)
  const currentDescription = user?.description === "None" ? "설명이 아직 없습니다. 추가해 주세요." : user?.description
  const [description, setDescription] = useState(currentDescription)
  const [imageInfo, setImageInfo] = useState(null)

  const handleSubmit2 = async (e) => {
    e.preventDefault()

    // user 수정 api 호출
    const UserInfoEdit = await Api.put(`users/${loginUserId}`, {
      nickname,
      description,
    }) 

    let formData = new FormData()
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      }
    } 
    formData.append("profileImgUrl", imageInfo)

    // 이미지를 넣었을 경우에만 업로드 api 호출
    const ImageEdit = imageInfo && 
      await axios
      .post(
        `http://${window.location.hostname}:5005/users/${loginUserId}/profile/image`,
        formData,
        config
      )
    
    const Edit = async() => {
      try{
        return await Promise.all([UserInfoEdit, ImageEdit])
      } catch(error) {
        throw error
      }
    }

    Edit().then((res) => {
      const InfoData = res[0].data
      const ImageData = res[1]?.data?.updatedUser // 이미지 안넣었을 땐 res[1]이 null 값.

      ImageData ? updateUser(ImageData) : updateUser(InfoData)
      alert("회원정보가 정상적으로 변경되었습니다!")

      setEditOpen(false)
    }).catch((error) => {
      alert("회원 정보 수정이 실패하였습니다.")
      console.log("error", error.response.data)
    })
  }


  return (
    <Grid item xs={5}>
      <form onSubmit={handleSubmit2}>
        <Stack
          direction="column"
          spacing={2}
          sx={{ mt: 1.3, alignItems:'center',justifyContent: "center"}}
        >
          <CssTextField
            id="Nickname"
            label="Nickname 수정"
            placeholder={user?.nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <CssTextField 
            id="Description"
            label="Description 수정"
            placeholder={currentDescription}
            value={description}
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
                Image Upload Here!
            </Typography>

            <input 
              style={{padding: '10px 0 0 85px'}} 
              type="file"
              name="attachment"
              accept="image/*"               
              onChange={(e) => setImageInfo(e.target.files[0])}/>

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

      </form>
    </Grid>
  )
}
export default ProfileEdit

const UploadBox = {
    border: '1px dashed gray', 
    bgcolor: 'rgba(0, 0, 0, 0.05)',
    width: '280px',
    alignItems:'center',
    justifyContent: "center",
    p:1
}

// const handleSubmit = async (e) => {
//   e.preventDefault()
  
//   //TODO: user 수정 api 호출!
//   await Api.put(`users/${loginUserId}`, {
//     nickname,
//     description,
//   })
//     .then((res) => {
//       updateUser(res.data)
//     })
//     .catch((err) => alert(err.response.data))

//   let formData = new FormData()

//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
//     }
//   } 

//   formData.append("profileImgUrl", imageInfo)

//   //TODO: 프로필 업로드 api 호출!
//   if(imageInfo){
//     await axios
//     .post(
//       `http://${window.location.hostname}:5005/users/${loginUserId}/profile/image`,
//       formData,
//       config
//     )
//     .then((res) => {
//       updateUser(res.data.updatedUser)
//     })
//     .catch((err) => alert(err.response.data))
//   }
  
//   alert("회원정보가 정상적으로 변경되었습니다!")

//   setEditOpen(false)
// }