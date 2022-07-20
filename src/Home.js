import React from 'react';
import YeezyOfTheDay from './YeezyOfTheDay'
import { Image, Row, Col, Container, Button } from 'react-bootstrap';
import useFetch from './useFetch';
import HomeEN from './HomeEN';
import HomeFR from './HomeFR';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';

export default function Home() {
  const {data: models,isPending,error}=useFetch('https://warm-nimble-warrior.glitch.me/models');
  const yeezyOfTheDayIndex=Math.floor(Math.random()*5);//models.length); broken atm due to taking time to fetch data on models, fix later
  const storedLangValue = (localStorage.getItem('lang')=== 'true');
  const [showLang, setShowLang] = useState(
    typeof storedLangValue == "boolean" ? storedLangValue : false
  );
  const handleLangFR = () => setShowLang(true);
  const handleLangEN = () => setShowLang(false);

  useEffect(() => {
    localStorage.setItem('lang', String(showLang));
  }, [showLang]);

  return (
    
    <div className="home">
      <Container>
        <Row>
          <Col sm="6">
            <Image fluid src={require('./assets/icon.png')} alt="Icon"/>
            {!showLang && <HomeEN></HomeEN>}
            {showLang && <HomeFR></HomeFR>}
          </Col>
          <Col sm="6">
      {error &&<div>{error}</div>}
      {isPending &&<div>Loading...</div>}
      {models && 
            <>
            {!showLang && 
            <>
            <p className="text-primary pt-2" onClick={handleLangFR} style={{textAlign: "right", fontSize: "40px"}}>EN</p>
            <YeezyOfTheDay models={models.filter((model)=>model.id===yeezyOfTheDayIndex)}/>
            <p className="h4 text-center pt-2">Yeezy Highlight</p>
            </>}
            {showLang && 
            <>
            <p className="text-primary pt-2" onClick={handleLangEN} style={{textAlign: "right", fontSize: "40px"}}>FR</p>
            <YeezyOfTheDay models={models.filter((model)=>model.id===yeezyOfTheDayIndex)}/>
            <p className="h4 text-center pt-2">Surbrillance Yeezy</p>
            </>}
            </>}
      </Col>
      </Row>
      </Container>
  </div>
  );
}