import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { useNavigate } from "react-router-dom"
import {ROUTES} from '../../../Route'
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined"

function GoAllData() {
    const navigate = useNavigate()
    const actions = [
        {
            icon: <FileCopyIcon onClick={() => navigate('/datalogs')} />,
            name: "Data list 보러가기",
        },
    ]

    return (
        <Box sx={{ height: 100, transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}

export default GoAllData