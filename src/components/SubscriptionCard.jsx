import { Link } from "react-router-dom";

export default function SubscriptionCard(props) {
    console.log(props);
    const { cardInfo: { id, image, price } } = props;

    return (
        <Link to={`/subscriptions/${id}`} >
            <div key={id}>
                <img src={image} alt="logo" />
                <p>R$ {price}</p>
            </div>
        </Link>
    )
}