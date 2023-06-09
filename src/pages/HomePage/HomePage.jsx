import { Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { SelectedPlanContext } from "../../contexts/SelectedPlanContext";
import axios from "axios";

export default function HomePage() {
    const { userData } = useContext(UserContext);
    const { selectedPlan, setSelectedPlan } = useContext(SelectedPlanContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData !== "empty" && userData !== null) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${userData.token}`
                }
            }
            const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${userData.membership.id}`, config)
            promise.then(p => {
                setSelectedPlan(p.data)
            })
        }
    }, [])

    function cancelPlan() {
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }

        const promise = axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', config)
        promise.then(p => {
            setSelectedPlan({});
            navigate("/subscriptions")
        })
        promise.catch(p => {console.log(p.response.data.message)})
    }

    console.log(selectedPlan);
    if (userData !== "empty" && userData !== null && selectedPlan !== "empty") {

        localStorage.setItem('User_Data', JSON.stringify(userData));
        localStorage.setItem('Selected_Plan', JSON.stringify(selectedPlan));
        
        return (
            <>
                <div>
                    <img src={selectedPlan.image} alt="membership_logo" />
                    usericon
                </div>
                <div>
                    Solicitar brindes
                </div>
                {selectedPlan.perks.map((perk, i) => {
                    return (
                        <div key={(i+1)}>
                            <a href={perk.link}>{perk.title}</a>
                        </div>
                    )
                })}
                <div onClick={() => {navigate("/subscriptions")}}>
                    Mudar Plano
                </div>
                <div onClick={cancelPlan}>
                    Cancelar plano
                </div>

            </>
        )
    } else if(userData !== "empty" && userData !== null && selectedPlan == "empty") {
        return <Navigate to="/subscriptions" />
    } else{
        return <Navigate to="/" />
    }
}