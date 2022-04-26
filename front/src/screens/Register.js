import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Api from '../api.js'

function Register(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //TODO: user 회원가입 api 호출
            await Api.post("users/register", {
                email,
                password,
                nickname,
            })
            alert("회원가입이 성공하였습니다!")
            navigate("/login")
        
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <div>회원가입 페이지</div>
        <form onSubmit={handleSubmit}>
            <div>Email</div>
            <input type="text"
                onChange={(e) => setEmail(e.target.value)} />
            <div>Nickname</div>
            <input type="text"
                onChange={(e) => setNickname(e.target.value)}></input>
            <div>password</div>
            <input type="text"
                onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">회원가입하기</button>
        </form>
        
        </>
    )
}
export default Register