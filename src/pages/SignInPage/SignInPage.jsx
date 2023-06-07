import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react"
import axios from "axios";


export default function SignInPage() {

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userInfo = {
        email: email,
        name: name,
        cpf: cpf,
        password: password
    };

    function sendUserInfo(event) {
        console.log(userInfo);
        
        event.preventDefault();

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', userInfo);
        promise.then(p => {navigate('/')});
        promise.catch(p => {alert(p.response.data.message)});
    }

    return (
        <SCSignInPage>
            <SCFormContainer>
                <form onSubmit={sendUserInfo}>
                    <input type="text" placeholder="Nome" required value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="CPF" required value={cpf} onChange={e => setCpf(e.target.value)} />
                    <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" required value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">Cadastrar</button>
                </form>
            </SCFormContainer>
            <Link to={"/"}>
                <p>Já possuí uma conta? Entre</p>
            </Link>
        </SCSignInPage>
    )
}

const SCSignInPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 150px;
`

const SCFormContainer = styled.div`
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`