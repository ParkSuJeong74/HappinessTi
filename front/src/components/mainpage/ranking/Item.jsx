import { Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

function Item({ data }){
    return (
    <>
        <ListItemButton>
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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAADDCAMAAABeUu/HAAAAQlBMVEXGDDD////XdH/FACjEACPci5TRUWTqtbzDABzciZLioajWcHvDABnmsLXWcXzejpjwy9DVa3fQTGDCAA/BAAXy09cuMSbdAAABo0lEQVR4nO3dS5LTQBRFwfNsA7LV7g8N+98qRM/RRDUjzwauIqelqOqxXxb3+jb/7v1j9dzJ9kf7dl3c7ecBwY/P1XMn2/Yu1xZ3/X5EsK2eO9n1ggABAgQIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCvgj2l9vitsMrH3+tnjvZy97z/m1x98cBwe/lcye7Pzv43P8kBAgQDIJBMAgGwSAYBINgEAyCQTAIBsEgGASDYBAMgkEwCAbBIBgEg+BvzhSfTpY9JugXCwQIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEISgL4J9uy7udnjl4+fquZNte4/9srjXtwOC94/VcyfbH38A8gxdj+yBD1MAAAAASUVORK5CYII="
            />
          </ListItemAvatar>

          <ListItemText primary={data?.nation} />
        </ListItemButton>

        <Divider variant="inset" component="li" />
    </>
    )
}
export default Item