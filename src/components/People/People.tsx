import React from 'react'
import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import { MDBCol } from "mdbreact";
import Person from './../Person/Person';

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState(""); 
  const [searchResult, setSearchResult] = React.useState<PersonType[]>([]);
  
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const result = filterByValue(searchValue);
    setSearchResult(result);
  }, [searchValue]);

  function filterByValue(value: any) {
    return people.filter(person => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

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
            <div className="search row d-flex flex-md-row justify-content-end align-items-center">
              <MDBCol md="6">
                <input 
                  className="form-control"
                  type="text"
                  placeholder="Name to Search"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => {setSearchValue(e.target.value)}}
                />
              </MDBCol>
            </div>
            <div className="col d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center">
              {searchResult && searchResult.length > 0 ?
                searchResult.map(person => <Person key={person.name} person={person} />)
                : people.map(person => <Person key={person.name} person={person} />)
              }
            </div>
          </div>
      </div>
    )
    }
  }

export default People
