import styled from "styled-components";
import Userlog from "./Userlog";
import UserManagement from "./UserManagement";

function UserInfo({ updateUser, surveyLog }) {
  return (
    <>
      <InfoBox>
        <Userlog surveyLog={surveyLog} />
        <UserManagement updateUser={updateUser} />
      </InfoBox>
    </>
  );
}

export default UserInfo;

const InfoBox = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #e4e4e4;
  padding: 40px;
`;
