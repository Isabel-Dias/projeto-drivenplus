import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export default function LogInPage() {
    
    const [email, setEmail] = useState('');
    const [password, setPasssword] = useState('');

    const loginObject = {
        email: email,
        password: password
    }

    function logInAuth(event) {
        event.preventDefault();
        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', loginObject);
        promise.then(p => {
            console.log(p.data);
        });
        promise.catch(p => alert(p.response.data.message));
    } 

    return (
        <SCLogInPage>
            <SCTopLogo>
                <p>Driven</p>
                <p>+</p>
            </SCTopLogo>
            <SCFormContainer>
                <form onSubmit={logInAuth}>
                    <input type="email" required placeholder="E-mail" onChange={e => {setEmail(e.target.value)}} value={email}/>
                    <input type="password" required placeholder="Senha" onChange={e => {setPasssword(e.target.value)}} value={password}/>
                    <button type="submit">Entrar</button>
                </form>
            </SCFormContainer>
            <Link to={"/sign-up"}>
                <p>Não Possui uma senha? Cadastre-se</p>
            </Link>

        </SCLogInPage>
    )
}

const SCLogInPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 150px;
`

const SCTopLogo = styled.div`
    display: flex;
    justify-content: center;
`

const SCFormContainer = styled.div`
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
