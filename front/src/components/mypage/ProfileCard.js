import { Stack, Typography } from "@mui/material";
import Style from "../../srcAssets/style/Mypage.module.css";

function ProfileCard({ user, toggleEditForm }) {
  return (
    <div>
      <Stack className={Style.imageBox} onClick={() => toggleEditForm()}>
        <img
          src={`https://storage.googleapis.com/crashingdevstorage14/ProfileImg/${user?.profileImgUrl}`}
          className={Style.profileImg}
          alt="프로필 이미지"
        />
        <span className={Style.editButton}>편집하기</span>
      </Stack>

      <Typography variant="h2" component="div" sx={{ marginTop: "2rem" }}>
        {user?.nickname}
      </Typography>

      <Typography variant="h6" sx={{ marginTop: "1.5rem" }} component="div">
        {user?.description === "None"
          ? "설명이 아직 없습니다. 추가해 주세요."
          : user?.description}
      </Typography>
    </div>
  );
}
export default ProfileCard;
