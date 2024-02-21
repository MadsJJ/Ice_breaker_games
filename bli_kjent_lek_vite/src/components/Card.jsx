import "./style/Card.css";

function Card() {
    return (
        <div className="card">
            <img className="image" src="https://placekitten.com/150/200" alt="" />    
            <h2 className="gameName">Test Text</h2>
            <p className="desc">This is just some text, do not think about it too hard.</p>
        </div>
    );
}

export default Card;
