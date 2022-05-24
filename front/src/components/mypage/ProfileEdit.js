import { useState } from "react";
import * as Api from "../../api";
import { Button, Grid, Stack, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import errorHandler from "../../errorHandler";
import Style from "../../srcAssets/style/Mypage.module.css";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#6587FF",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#6587FF",
    },
    width: "280px",
  },
})(TextField);

function ProfileEdit({ toggleEditForm, updateUser, user }) {
  const currentDescription =
    user?.description === "None"
      ? "설명이 아직 없습니다. 추가해 주세요."
      : user?.description;

  const [imageInfo, setImageInfo] = useState(null);

  const [form, setForm] = useState({
    nickname: user?.nickname,
    description: currentDescription,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // user 수정 api 호출
      const UserInfoEdit = await Api.put(`users`, form);

      let formData = new FormData();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      };
      formData.append("profileImgUrl", imageInfo);

      const ImageEdit = await axios.post(
        `http://${window.location.hostname}:5005/users/profile/image`,
        formData,
        config
      );

      const result = await Promise.allSettled([UserInfoEdit, ImageEdit]);

      console.log("result", result);
      const InfoData = result[0].value.data;
      const ImageData = result[1].value.data.updatedUser;

      ImageData ? updateUser(ImageData) : updateUser(InfoData);
      alert("회원정보가 정상적으로 변경되었습니다!");

      toggleEditForm();
    } catch (error) {
      console.log("error", error);
      errorHandler("회원 정보 수정 오류", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack className={Style.imageBox}>
        <img
          src={`https://storage.googleapis.com/crashingdevstorage14/ProfileImg/${user?.profileImgUrl}`}
          className={Style.EditImg}
          alt="프로필 이미지"
        />

        <label for="uploadFile">
          <span className={Style.uploadButton}>
            <CameraAltIcon
              sx={{
                color: "gray",
              }}
            />
          </span>
        </label>
        <input
          id="uploadFile"
          style={{ display: "none" }}
          type="file"
          name="attachment"
          accept="image/*"
          onChange={(e) => setImageInfo(e.target.files[0])}
        />
      </Stack>
      <Stack>
        <span>👉 파일이름: {imageInfo?.name}👈</span>
      </Stack>

      <Stack
        direction="column"
        spacing={1.3}
        sx={{ p: 2, alignItems: "center", justifyContent: "center" }}
      >
        <CssTextField
          id="Nickname"
          name="nickname"
          label="Nickname 수정"
          placeholder={user?.nickname}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />

        <CssTextField
          id="Description"
          name="description"
          label="Description 수정"
          placeholder={currentDescription}
          multiline
          row={3}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
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
        >
          {" "}
          확인{" "}
        </Button>
        <Button
          type="reset"
          onClick={() => toggleEditForm()}
          variant="outlined"
        >
          {" "}
          취소{" "}
        </Button>
      </Stack>
    </form>
  );
}
export default ProfileEdit;
