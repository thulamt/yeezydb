import React from 'react';
import {Link} from 'react-router-dom';
import { Image, Navbar, Nav, Container, Modal, Button, Row, Col} from 'react-bootstrap';
import { Person, PersonFill } from 'react-bootstrap-icons';
import{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from './useFetch';

export default function NavbarDefault() {
  var validation;
  const {data: users,isPending,error}=useFetch('https://warm-nimble-warrior.glitch.me/users');
  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const handleCloseCreateAccount = () => setShowCreateAccount(false);
  const handleShowCreateAccount = () => {
    setShowSignIn(false);
    setShowCreateAccount(true);
  }

  const [showSignOut, setShowSignOut] = useState(false);
  const handleCloseSignOut = () => setShowSignOut(false);
  const handleShowSignOut = () => setShowSignOut(true);
  const[signoutPending,setSignoutPending]=useState(false);
  const handleSignOut=(e)=>{
    e.preventDefault();
    setSignoutPending(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setUserID(-1);
    setSignoutPending(true);
    setLogin(false)
    console.log("user signed out");
    setSignoutPending(false);
    setShowSignOut(false);
    }

  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[passwordConfirm,setPasswordConfirm]=useState('');
  const[userID,setUserID]=useState(-1);

  const [login, setLogin]=useState(false);
  const[signupPending,setSignupPending]=useState(false);
  const[loginPending,setLoginPending]=useState(false);

  const handleSignup=(e)=>{
    setUserID(users.length+1);
    e.preventDefault();
    const user={firstName,lastName,email,password, passwordConfirm};
    setSignupPending(true);
    fetch('https://warm-nimble-warrior.glitch.me/users',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(user)
    }).then(()=>{
      console.log("new user added");
      setSignupPending(false);
      setShowCreateAccount(false);
      setLogin(true);
    })
    }

  const handleLogin=(e)=>{
    e.preventDefault();
    setLoginPending(true);
    validation=users.filter((user)=>user.email===email&&user.password===password);
    if (validation.length===1){
      console.log("user signed in");
      setUserID(validation[0].id);
      setFirstName(validation[0].firstName);
      setLastName(validation[0].lastName);
      setPasswordConfirm(validation[0].passwordConfirm);
      setLoginPending(false);
      setShowSignIn(false);
      setLogin(true);
    }else{
      console.log("user failed signin");
      setUserID(-1);
      setFirstName('');
      setLastName('');
      setPasswordConfirm('');
      setLoginPending(false);
      //throw error
    }
  }

  return (
    <div>
      {error &&<div>{error}</div>}
        {isPending &&<div>Loading...</div>}
        {users && (
          <div className="navbar-default">
      <Navbar bg="light" expand="sm">
        <Container fluid={true}>
        <Navbar.Brand>
          <Link to="/"><Image src={require('./assets/icon.png')} alt="Avatar Logo"  height="40px;"/></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <div className="nav-link"><Link id="RouterNavLink" style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}} to="/">Home</Link></div>
          <div className="nav-link"><Link id="RouterNavLink" style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}} to="/models">Browse Shoes</Link></div>
          {!login && <>
          <div className="nav-link" onClick={handleShowSignIn} style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}>My Ratings</div>
          <div className="nav-link" onClick={handleShowSignIn} style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}><Person size={25}/></div></>}
          {login && <>
          <div className="nav-link"><Link id="RouterNavLink" style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}} to={`/ratings/${userID}`}>My Ratings</Link></div>
          <div className="nav-link" onClick={handleShowSignOut} style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}><PersonFill size={25}/></div></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Modal show={showSignIn} onHide={handleCloseSignIn}>
      <form onSubmit={handleLogin}>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="loginlabel">Create or sign in to an account to post reviews</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
              <span className="input-group-text">Email Address:</span>
              <input 
              required
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              id="email" type="text" className="form-control" placeholder="JohnDoe@email.com"/>
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text">Password:</span>
              <input 
              required
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              id="password" type="text" className="form-control" placeholder="******"/>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
          {!loginPending&&<><button type="submit" className="btn btn-primary">Log-In</button></>}
            {loginPending&&<><button disabled type="submit" className="btn btn-primary">Logging In...</button></>}
          </div>
        </Modal.Body>
        </form>
        <Modal.Footer>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={handleShowCreateAccount}>Create New Account</button>
            <Button variant="secondary" onClick={handleCloseSignIn}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateAccount} onHide={handleCloseCreateAccount}>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="signupLabel">Create new account</h5>
        </Modal.Header>
        <form onSubmit={handleSignup}>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text">Enter Name:</span>
            <input 
            required
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
            id="FirstName" type="text" className="form-control" placeholder="First Name"/>
            <input 
            required
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
            id="LastName" type="text" className="form-control" placeholder="Last Name"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Email Address:</span>
            <input 
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="email" type="text" className="form-control" placeholder="JohnDoe@email.com"/>
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text">Password:</span>
              <input 
              required
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              id="password" type="text" className="form-control" placeholder="******"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Confirm Password:</span>
            <input  
              required
              value={passwordConfirm}
              onChange={(e)=>{setPasswordConfirm(e.target.value)}} 
              type="text" className="form-control" placeholder="******"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <div className="btn-group">
            {!signupPending&&<><button type="submit" className="btn btn-primary">Create New Account</button>
            <Button variant="secondary" onClick={handleCloseCreateAccount}>Close</Button></>}
            {signupPending&&<><button disabled type="submit" className="btn btn-primary">Creating New Account...</button>
            <button disabled variant="secondary" onClick={handleCloseCreateAccount}>Close</button></>}
          </div>
        </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showSignOut} onHide={handleCloseSignOut}>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="signoutlabel">Hello {firstName} {lastName}</h5>
        </Modal.Header>
        <Modal.Body>
          <p>Would you like to sign out of your account?</p>
        </Modal.Body>
        <Modal.Footer>
        <form onSubmit={handleSignOut}>
          <div className="btn-group">
            {!signoutPending&&<><button type="submit" className="btn btn-primary">Sign Out</button>
            <Button variant="secondary" onClick={handleCloseSignOut}>Close</Button></>}
            {signoutPending&&<><button disabled type="submit" className="btn btn-primary">Signing Out...</button>
            <button disabled variant="secondary" onClick={handleCloseSignOut}>Close</button></>}
          </div>
        </form>
        </Modal.Footer>
      </Modal>
      </div>)}
  </div>
  );
}