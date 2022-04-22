import { useState } from "react"
import * as Api from '../api.js'

function Register(){
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await Api.post("users/register", {
                email,
                password,
                nickname,
            })
            alert("회원가입 성공")
        
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