import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Api from '../api.js'
import { DispatchContext } from "../App.js";

function Login(){
    const navigate = useNavigate()
    const dispatch = useContext(DispatchContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Api.post("users/login", {
                email,
                password,
            })
            console.log(res.data)
            const user = res.data
            const jwtToken = user.token
            sessionStorage.setItem("userToken", jwtToken)
            alert("성공! 유저토큰 설정 완료!")

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

            const userdata = await Api.get(`users/${user.id}`)
            console.log(userdata)
        
        } catch (error) {
            alert(error.response.data)
        }
    }
    return (
        <>
        <div>로그인 페이지</div>
        <form onSubmit={handleSubmit}>
            <div>Email</div>
            <input type="text"
                onChange={(e) => setEmail(e.target.value)}></input>
            <div>password</div>
            <input type="text"
                onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">로그인하기</button>
        </form>
        <button onClick={() => navigate("/register")}>회원가입하러 가기</button>
        </>
    )
}
export default Login