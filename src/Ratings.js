import React from 'react';
import Comment from './Comment';
import { Image, Row, Col, Container, Card} from 'react-bootstrap';
import{useState} from 'react';
import { HandThumbsUpFill, HandThumbsDownFill, HandThumbsUp,HandThumbsDown, ZoomIn} from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from './useFetch';
import {Link,useParams} from 'react-router-dom';

export default function Ratings() {
  const {id} =useParams();
  const{data:users,isPendingUser,errorUser}=useFetch('http://localhost:8000/users/'+id);
  const {data:reviews, isPending:isPendingReviews, error:errorReviews}=useFetch('http://localhost:8000/reviews');
  return (
    <div className="user-ratings">
      {errorUser &&<div>{errorUser}</div>}
    {isPendingUser &&<div>Loading...</div>}
    {errorReviews &&<div>{errorReviews}</div>}
    {isPendingReviews &&<div>Loading...</div>}
    {users && reviews && reviews.filter((check)=>check.userID==id).map((review)=>(
    <div className="container-fluid pt-5" key={review.id}>
    <Link to={`/models/${review.models.id}`} className="text-decoration-none">
      <div className="container p-4 my-4 border" style={{borderRadius: "5px"}}>
        <div className="row">
          <div className="col" style={{textAlign: "right", fontSize: "30px"}} >
            {review.like&&<div><HandThumbsUpFill/></div>}
            {review.dislike&&<div><HandThumbsDownFill/></div>}
            <img className="img-fluid" src={require("./assets/"+review.models.image+".jpg")}  alt="review" />
          </div>
          <div className="col">
            <p className="h3">My Review:</p>
            <p className="h6">{review.review}</p>
          </div>
        </div>               
      </div>
    </Link>
  </div>))}
  </div>
  );
}
//
/*
export default function Ratings() {
  const {id} =useParams();
  const{data:users,isPendingUser,errorUser}=useFetch('http://localhost:8000/users/'+id);
  const {data:reviews, isPending:isPendingReviews, error:errorReviews}=useFetch('http://localhost:8000/reviews');
  return (
    <div className="user-ratings">
      {errorUser &&<div>{errorUser}</div>}
    {isPendingUser &&<div>Loading...</div>}
    {errorReviews &&<div>{errorReviews}</div>}
    {isPendingReviews &&<div>Loading...</div>}
    {users && reviews && (reviews.filter((review)=>review.userID===id)).map((review)=>(
    <div className="container-fluid pt-5" key={review.id}>
    <Link to={`/models/${review.models.id}`} className="text-decoration-none">
      <div className="container p-4 my-4 border" style={{borderRadius: "5px"}}>
        <div className="row">
          <div className="col" style={{textAlign: "right", fontSize: "30px"}} >
            {review.like&&<div><HandThumbsUpFill/></div>}
            {review.dislike&&<div><HandThumbsDownFill/></div>}
            <img className="img-fluid" src={require("./assets/"+review.models.image+".jpg")}  alt="review" />
          </div>
          <div className="col">
            <p className="h3">My Review:</p>
            <p className="h6">{review.review}</p>
          </div>
        </div>               
      </div>
    </Link>
  </div>))}
  </div>
  );
}
*/