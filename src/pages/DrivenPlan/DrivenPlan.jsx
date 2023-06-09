import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { SelectedPlanContext } from "../../contexts/SelectedPlanContext";
import styled from "styled-components";

export default function DrivenPlan() {
    const { planID } = useParams();
    const [planInfo, setPlanInfo] = useState();
    const { userData } = useContext(UserContext);
    const { setSelectedPlan } = useContext(SelectedPlanContext);
    const navigate = useNavigate();

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardPin, setCardPin] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }

        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planID}`, config)
        promise.then(p => {
            setPlanInfo(p.data);
        })
        promise.catch(p => { console.log(p.response.data.message) });

    }, [])

    function registerCardInfo(event) {
        event.preventDefault();
        setIsVisible(true);

    }

    function sendCardInfo() {
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }

        const cardInfo = {
            membershipId: planInfo.id,
            cardName: cardName,
            cardNumber: cardNumber,
            securityNumber: cardPin,
            expirationDate: cardExpiry
        }
        console.log(cardInfo);
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", cardInfo, config)
        promise.then(p => {
            setSelectedPlan(p.data)
            localStorage.setItem('Selected_Plan', JSON.stringify(p.data));
            navigate("/home")
        })
        promise.catch(p => alert(p.response.data.message))
    }

    if (userData !== "empty" && userData !== null) {
        
        console.log(planInfo);
        return (
            <>
                <div onClick={() => {navigate("/subscriptions")}}>BackArrow</div>
                <img src={planInfo?.image} />
                <h1>{planInfo?.name}</h1>
                <div>
                    <div>
                        <div>list-icon</div>
                        <h2>Benefícios:</h2>
                    </div>
                    <div>
                        {planInfo?.perks.map((perk, i) => {
                            return (
                                <p key={perk.id}>
                                    {(i + 1)}. {perk.title}
                                </p>
                            )
                        })}
                    </div>
                    <div>
                        <div>money-icon</div>
                        <h2>Preço:</h2>
                    </div>
                    <p>R$ {planInfo?.price} cobrados mensalmente</p>

                    <div>
                        <form onSubmit={registerCardInfo}>
                            <input required type="text" placeholder="Nome impresso no cartão" value={cardName} onChange={e => { setCardName(e.target.value) }} />
                            <input required type="text" placeholder="Dígitos do cartão" value={cardNumber} onChange={e => { setCardNumber(e.target.value) }} />
                            <div>
                                <input required type="number" placeholder="Código de segurança" value={cardPin} onChange={e => { setCardPin(e.target.value) }} />
                                <input required type="text" placeholder="Validade" value={cardExpiry} onChange={e => { setCardExpiry(e.target.value) }} />
                            </div>
                            <button type="submit">ASSINAR</button>
                        </form>
                    </div>
                    <SCBackground visible={isVisible == true ? "inline" : "none"}></SCBackground>
                    <ConfirmBox visible={isVisible == true ? "inline" : "none"}>
                        <p>Tem certeza que deseja assinar o plano {planInfo?.name} (R$ {planInfo?.price})?</p>
                        <button onClick={() => { setIsVisible(false) }}>Não</button>
                        <button onClick={(sendCardInfo)}>Sim</button>
                    </ConfirmBox>

                </div>

            </>
        )
    } else {
        return <Navigate to="/" />
    }
}

const SCBackground = styled.div`
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    background-color:#000000B2;
    opacity: 0.7;

    display: ${props => props.visible};
`
const ConfirmBox = styled.div`
    position: fixed;
    z-index: 5;
    left: 64px;
    top: 229px;

    width: 248px;
    height: 210px;

    background-color: #FFFFFF;

    display: ${props => props.visible};
`