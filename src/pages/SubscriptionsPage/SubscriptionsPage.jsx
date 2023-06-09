import SubscriptionCard from "../../components/SubscriptionCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function SubscriptionsPage() {
    const { userData } = useContext(UserContext);
    const [planOptions, setPlanOptions] = useState([]);

    useEffect(() => {
        if (userData !== "empty" && userData !== null) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${userData.token}`
                }
            }

            const promise = axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', config)
            promise.then(p => {setPlanOptions(p.data)})
            promise.catch(p => console.log(p.response.data.message))
        }
    }, [])

    if (userData !== "empty" && userData !== null) {

        localStorage.setItem('User_Data', JSON.stringify(userData));
        console.log(userData)


        return (
            <>
                <h1>Escolha seu plano</h1>
                {planOptions?.map(plan => {
                    return (
                        <SubscriptionCard cardInfo={plan} />
                    )
                })}

            </>
        );
    } else {
        return <Navigate to="/" />
    }
}