import { Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {ROUTES} from '../../../Route'

function Item({ data }){
  //url에 띄워쓰기는 %20으로 들어가야 함
  const originalNation = data?.country
  const navigate = useNavigate()
  /* //url에 띄워쓰기는 %20으로 들어가야 함
  const originalNation = data?.nation
  // 화면에 나타날 국가명은 %20을 지우고 띄워쓰기로 바꿔야 됨.
  const transformedNation = originalNation.split("%20").join(' ')  */

    return (
    <>
        <ListItemButton onClick={() => navigate(`analysis/${data?.country}`)}>
          <span
            style={{
              marginRight: "12px",
              color: "#DDD518",
              fontSize: "1.5rem",
            }}
          >
            {data?.grade}
          </span>
          <ListItemAvatar>
            
            <Avatar
              sx={{ width: "2rem", height: "2rem" }} alt="국기"
              src={`https://countryflagsapi.com/png/${data?.country}`}
            />
          </ListItemAvatar>

          <ListItemText primary={data?.country} />
        </ListItemButton>

        <Divider variant="inset" component="li" />
    </>
    )
}
export default Item