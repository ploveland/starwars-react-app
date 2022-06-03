import { useState } from "react";
import { PersonType } from '../../types';
import cn from "classnames";
import { ReplyFill as Icon } from "react-bootstrap-icons";

interface PersonProps {
  person: PersonType
}

function Person({ person }: PersonProps) {
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
          <div className="title">{person.name}</div>
          <div className="card-body position-relative d-flex justify-content-center">
            { person.image ? 
              <div>
                <img className="card-img" src={require(`../../assets/images/${person.image}`).default} alt="character" />
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
              <p className="name">Name: {person.name}</p>
              <p className="name">Birth Year: {person.birth_year}</p>
              <p className="name">Height: {person.height}</p>
              <p className="name">Mass: {person.mass}</p>
              <p className="name">Hair Color: {person.hair_color}</p>
              <p className="name">Eye Color: {person.eye_color}</p>
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

export default Person
