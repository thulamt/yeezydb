import React from 'react';
import YeezyOfTheDay from './YeezyOfTheDay'
import { Image, Row, Col, Container } from 'react-bootstrap';
import useFetch from './useFetch';
import HomeEN from './HomeEN';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const {data: models,isPending,error}=useFetch('https://warm-nimble-warrior.glitch.me/models');
  const yeezyOfTheDayIndex=Math.floor(Math.random()*23);//models.length); broken atm due to taking time to fetch data on models, fix later
  
  return (
    
    <div className="home">
      <Container>
        <Row>
          <Col sm="6">
            <Image fluid src={require('./assets/icon.png')} alt="Icon"/>
            <HomeEN></HomeEN>
          </Col>
          <Col sm="6">
      {error &&<div>{error}</div>}
      {isPending &&<div>Loading...</div>}
      {models && 
            <>
            <YeezyOfTheDay models={models.filter((model)=>model.id===yeezyOfTheDayIndex)}/>
            <p className="h4 text-center pt-2">Yeezy Highlight</p>
            </>}
      </Col>
      </Row>
      </Container>
  </div>
  );
}