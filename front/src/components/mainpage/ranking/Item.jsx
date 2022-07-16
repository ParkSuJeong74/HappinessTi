import { Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

let grade=0
function Item({ data }){
  const navigate = useNavigate()

  if(grade >= 5){
    grade = 0
  }

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
          {grade+=1}
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