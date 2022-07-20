import React from 'react';
import { Image, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom'

const YeezyOfTheDay = ({models}) => {
  return (
    <div className="yeezy-of-the-day">
      {models.map((model)=>(
        <Container key={model.id}>
          <Link to={`/models/${model.id}`}>
              <Image fluid src={require('./assets/'+model.image+'.jpg')} alt="yeezyoftheday" />
          </Link>
          
          <p className="h4 text-center pt-2">{model.full+": "+model.colorway}</p>
        </Container>
      ))}
    </div>
);
}

export default YeezyOfTheDay;