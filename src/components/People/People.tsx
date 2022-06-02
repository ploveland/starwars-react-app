import React from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
// import Person from '../Person'
import FlipCard from './../Shared/FlipCard';

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])
  const [isLoading, setIsLoading] = React.useState(true);
  
  const imagesArray = [
    'Luke_Skywalker.png',
    'C3PO.jpg',
    'R2D2.jpg',
    'Darth_Vader.jpg',
    'Leia_Organa.jpg',
    'Owen_Lars.png',
    'Beru_Whitesun_Lars.jpg',
    'R5D4.jpg',
    'Biggs.png',
    'ObiWan.jpg'
  ]

  React.useEffect(() => {
    
    fetchJson<{ results: PersonType[] }>('people')
      .then(peopleResponse => {
      
        peopleResponse.results.forEach(function(element, index) {
          element.id = index;
          element.image = imagesArray[index];
        });

        setPeople(peopleResponse.results);
      });

      setIsLoading(false);
      console.log(people);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <div className="row h-100">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div style={{color: '#fff', fontSize: 36}}>Loading...</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="overlay-background" />
        <div className="overlay-border" />
          <div className="row h-100">
            <div className="col d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center">
              {people.map(person => <FlipCard key={person.name} card={person} />)}
            </div>
          </div>
      </div>
    )
    }
  }

export default People
