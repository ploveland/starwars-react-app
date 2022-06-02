import { useState } from "react";
import cn from "classnames";
import { ReplyFill as Icon } from "react-bootstrap-icons";

function FlipCard({ card }: any ) {
  const [showBack, setShowBack] = useState(false);

  function handleClick() {
    setShowBack(!showBack);
  }

  return (
    <div
      className={"flip-card-outer"}
      onClick={handleClick}
    >
      <div className={cn("flip-card-inner", { showBack })}>
        <div
          className="card front"
        >
          <div className="title">{card.name}</div>
          <div className="card-body position-relative d-flex justify-content-center">
            { card.image ? 
              <div>
                <img className="card-img" src={require(`../../assets/images/${card.image}`).default} alt="character" />
              </div> 
              : null
            }
            <div className="icon">
              <Icon size={15} />
            </div>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex flex-column justify-content-around align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="name">Name: {card.name}</p>
              <p className="name">Birth Year: {card.birth_year}</p>
              <p className="name">Height: {card.height}</p>
              <p className="name">Mass: {card.mass}</p>
              <p className="name">Hair Color: {card.hair_color}</p>
              <p className="name">Eye Color: {card.eye_color}</p>
            </div>
            <div className="icon">
              <Icon size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;