import { useParams, Navigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function DrivenPlan() {
    const { planID } = useParams();
    const [planInfo, setPlanInfo] = useState();
    const { userData } = useContext(UserContext);

    console.log(planID);
    console.log(userData.token);
    useEffect(() => {
        if (userData !== "empty" && userData.token !== undefined) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${userData.token}`
                }
            }

            const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planID}`, config)
        }
    }, [])

    if (userData !== "empty" && userData !== null) {
        return (
            <>
                <div>BackArrow</div>
                
            </>
        )
    } else {
        return <Navigate to="/"/>
    }
}