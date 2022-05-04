import { Container } from "@mui/material"
import { useParams } from "react-router-dom"

function Analysis(){
    const {country} = useParams()
    console.log(country)

    return (
        <Container sx={{py: 7, mt: 12}}>
            <h1>{country}</h1>
        </Container>
    )
}
export default Analysis