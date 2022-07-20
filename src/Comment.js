import React from 'react';
import {Container } from 'react-bootstrap';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from './useFetch';

export default function Comment({models}) {
  const {data: reviews,isPending,error}=useFetch('http://localhost:8000/reviews');
  return (
      <div className="container pt-4">
        {error &&<div>{error}</div>}
        {isPending &&<div>Loading...</div>}
        {reviews &&
            reviews.map((review)=>(
            models.full===review.models.full&&
            <div className="container-fluid pt-4 mb-2 border" key={review.id}>
                <div className="row">
                  <div className="col">
                    {review.anon&& <p className="h6">Anonymous</p>}
                  </div>
                  <div className="col">
                    
                  </div>
                  <div className="col" style={{textAlign: "right", fontSize: "20px"}}>
                    {review.like&&
                    <p className="text-primary"><HandThumbsUpFill/></p>}
                    {review.dislike&&
                    <p className="text-primary"><HandThumbsDownFill/></p>}
                  </div>
                </div>
                <p>{review.review}</p>
          </div>
          ))
          }
      </div>
  );
}
//<p className="h6">posted 1 day ago</p>