import React from 'react';
import Comment from './Comment';
import { Row, Col, Container, Modal, Card} from 'react-bootstrap';
import{useState} from 'react';
import { HandThumbsUp,HandThumbsDown, ZoomIn} from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from './useFetch';
import {useParams} from "react-router-dom";

export default function ModelProfile() {
  const {id} =useParams();
  const {data: models,isPending,error}=useFetch('https://warm-nimble-warrior.glitch.me/models/'+id);
  const {data:reviews, isPending:isPendingReviews, error:errorReviews}=useFetch('https://warm-nimble-warrior.glitch.me/reviews');
  var reviewCount=0;
  var likeCount=0;
  var dislikeCount=0;
  const [showZoom, setShowZoom] = useState(false);
  const handleCloseZoom = () => setShowZoom(false);
  const handleShowZoom = () => setShowZoom(true);

  const [showRatings, setShowRatings] = useState(false);
  const handleCloseRatings = () => setShowRatings(false);
  const handleShowRatings = () => setShowRatings(true);

  const[like,setLike]=useState(false);
  const[dislike,setDislike]=useState(false);
  const[anon,setAnon]=useState(false);
  const[review,setReview]=useState('');
  const[reviewPending,setReviewPending]=useState(false);

  const handleSubmit=(e)=>{
    const newReview={like,dislike,anon,review,models};
    setReviewPending(true);
    fetch('https://warm-nimble-warrior.glitch.me/reviews',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(newReview)
    }).then(()=>{
      console.log("new review added");
      setReviewPending(false);
    })
  }
  return (
    <div className="model-profile">
      {error &&<div>{error}</div>}
      {isPending &&<div>Loading...</div>}
      {errorReviews &&<div>{errorReviews}</div>}
      {isPendingReviews &&<div>Loading...</div>}
      {models && reviews && (
      <div>
    <div className="container pt-5">
    <Row>
      <Col>
      <div className="card">
          <a onClick={handleShowZoom}>
            <p className="text-primary pt-2" style={{textAlign: "right", fontSize: "30px"}}><ZoomIn/></p>
            <img className="card-img-top" src={require('./assets/'+models.image+'.jpg')} alt="Card image"/>
          </a>
          <div className="card-body">
            <p className="h3">{models.full}</p>
            <div className="row">
              <div className="col"><p className="h5">{models.colorway}</p></div>
              <div className="col"><button type="button" className="btn btn-primary" onClick={handleShowRatings} href="#analytics">View Ratings</button>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                <p className="h6">Retail Price</p>
                <p className="h6">Recommended Sizing</p>
                <p className="h6">Purchase Link</p>
              </div>
              <div className="col">
                <p className="h6">${models.retailPriceUSD} USD</p>
                <p className="h6">{models.sizing}</p>
                <a className="nav-link" href={models.ebayPurchaseLink}>
                  <img className="img-fluid" src={require("./assets/ebay.png")} style={{maxWidth:"30%"}} alt="ebay" /></a>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col>
      <Container>
      <Card>
            <div className="card-header">
              <p className="card-title">Description:</p>
            </div>
            <div className="card-body">
              <p className="card-text">{models.body}</p>
            </div>
      </Card>
      <form onSubmit={handleSubmit}>
          <div className="container-fluid pt-2">
            <div className="mb-3 pt-3">
              <label htmlFor="review" className="form-label">Reviews:</label>
              <div className="row pt-1 pb-2">
                <div className="btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                  <input value={like}
                  onChange={()=>{setLike(true); setDislike(false);}}
                  type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio1"><HandThumbsUp/></label>
                  <input value={dislike}
                  onChange={()=>{setLike(false); setDislike(true);}}
                  type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio2"><HandThumbsDown/></label>
                </div>
              </div>
              <input type="text" 
              required
              value={review}
              onChange={(e)=>{setReview(e.target.value)}}
              className="form-control" id="rvw" placeholder="Enter review here..." name="rvw" />
            </div>
            <div className="form-check mb-3">
              <label className="form-check-label">
                <input value={anon}
                onChange={()=>setAnon(!anon)}
                className="form-check-input" type="checkbox" name="anonymous"/> 
                Post as anonymous
              </label>
            </div>
              {!reviewPending&&<button type="submit" className="btn btn-primary">Submit</button>}
              {reviewPending&&<button disabled type="submit" className="btn btn-primary">Adding Review...</button>}
            </div>
          </form>
          <Comment models={models}/>
      </Container>
      </Col>
    </Row>
      </div>
      <Modal centered size="xl" aria-labelledby="contained-modal-title-vcenter" show={showZoom} onHide={handleCloseZoom}>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="zoomlabel"></h5>
        </Modal.Header>
        <Modal.Body>
          <img className="img-fluid " src={require('./assets/'+models.image+'.jpg')} style={{maxWidth: "100%", height: "auto"}} alt="zoom" />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal centered show={showRatings} onHide={handleCloseRatings}>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="analyticslabel">Model Analytics</h5>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <p>Reviews:</p>
              <p>Likes <HandThumbsUp></HandThumbsUp>:</p>
              <p>Dislikes <HandThumbsDown></HandThumbsDown>:</p>
            </Col>
            <Col>
              <p>{reviewCount=(reviews.filter(
                (review)=>
                review.models.full===models.full
              )).length}</p>
              <p>{likeCount=(reviews.filter(
                (review)=>
                review.models.full===models.full 
                && review.like
              )).length}</p>
              <p>{dislikeCount=(reviews.filter(
                (review)=>
                review.models.full===models.full
                && review.dislike
              )).length}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      </div>
      )}
      </div>
  );
}