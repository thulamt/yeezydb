import React from 'react';
import icon from './assets/icon.png';
import { Image, Row, Col, Container, Card} from 'react-bootstrap';
import{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ModelList from './ModelList';
import useFetch from './useFetch';

export default function Models() {
  const {data: models,isPending,error}=useFetch('http://localhost:8000/models');
  
  return (
    <div className="container pt-5 my-4">
      {error &&<div>{error}</div>}
      {isPending &&<div>Loading...</div>}
      {models && 
            <ModelList models={models}></ModelList>
      }
    </div>
  );
}