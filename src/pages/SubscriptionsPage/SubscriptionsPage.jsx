import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function SubscriptionsPage() {
    const { userData, setUserData } = useContext(UserContext);
    if (userData !== "empty" && userData !== null) {
        
        localStorage.setItem('User_Data', JSON.stringify(userData));
        
        return (
            <>
                Subscriptions
                {console.log(userData)}
            </>
        );
    } else {
        return <Navigate to="/" />
    }
}