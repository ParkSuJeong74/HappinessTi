import styled from 'styled-components'

import Userlog from './Userlog';
import UserManagement from './UserManagement';

function ProfileInfo(){
    return (
        <>
            <InfoBox>
                <Userlog />
                <UserManagement />
            </InfoBox>
        </>
    )
}

export default ProfileInfo

const InfoBox = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid #E4E4E4;
    padding: 40px;
`;