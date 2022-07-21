import React from 'react';
import { Row, Col,} from 'react-bootstrap';
import { HandThumbsUpFill, HandThumbsDownFill} from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from './useFetch';
import {Link,useParams} from 'react-router-dom';

export default function Ratings({login}) {
  const {id} =useParams();
  const{data:users,isPendingUser,errorUser}=useFetch('https://warm-nimble-warrior.glitch.me/users/'+id);
  const {data:reviews, isPending:isPendingReviews, error:errorReviews}=useFetch('https://warm-nimble-warrior.glitch.me/reviews');
  return (
    <div className="user-ratings container pt-5 my-4">
      <p className="h1">User Ratings</p>
      <Row>
      {errorUser &&<div>{errorUser}</div>}
    {isPendingUser &&<div>Loading...</div>}
    {errorReviews &&<div>{errorReviews}</div>}
    {isPendingReviews &&<div>Loading...</div>}
    {!login && <div>No reviews available. Please sign in to a valid account.</div>}
    {login && users && reviews && reviews.filter((check)=>Number(check.userID)===Number(id)).length===0 && 
    <div><h6>You haven't rated any Yeezys yet.</h6>
    <p><Link to="/models">Browse shoes</Link> and start reviewing!</p></div>
    }
    {login && users && reviews && reviews.filter((check)=>Number(check.userID)===Number(id)).map((review)=>(
    <Col xs="4" key={review.id}>
    <div className="container pt-1" >
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
  </div>
  </Col>))}
  </Row>
  </div>
  );
}