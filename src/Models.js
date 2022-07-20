import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ModelList from './ModelList';
import useFetch from './useFetch';

export default function Models() {
  const {data: models,isPending,error}=useFetch('https://warm-nimble-warrior.glitch.me/models');
  
  return (
    <div className="container pt-5 my-4">
      <p className="h1">YEEZY Shoe Models</p>
      {error &&<div>{error}</div>}
      {isPending &&<div>Loading...</div>}
      {models && 
            <ModelList models={models}></ModelList>
      }
    </div>
  );
}