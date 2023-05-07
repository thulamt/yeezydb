import {useState, React} from 'react';
import{Route, Switch, Link, useHistory} from 'react-router-dom';
import useFetch from './useFetch';
import { Person, PersonFill, Github } from 'react-bootstrap-icons';
import { Image, Navbar, Nav, Container, Modal, Button} from 'react-bootstrap';

import Home from './Home'
import Models from './Models'
import ModelProfile from './ModelProfile'
import Ratings from './Ratings'
import NotFound from './NotFound'
import FAQ from './Faq'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  var validation;
  var emailUnique;
  const {data: users,isPending,error}=useFetch('https://warm-nimble-warrior.glitch.me/users');
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[passwordConfirm,setPasswordConfirm]=useState('');
  const[userID,setUserID]=useState(-1);
  const[login, setLogin]=useState(false);
  const history=useHistory();

  //Helper functions
  const clearUserFields = () =>{
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setUserID(-1);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /\S+@\S+\.\S+/
      );
  };

  // password visibility
  const [passwordShown, setPasswordSHown] = useState(false);

  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setPasswordSHown((passwordShown) => !passwordShown);
  };
  
  //Modals
  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => {
    setShowSignIn(false);
    clearUserFields();
  };
  const handleShowSignIn = () => setShowSignIn(true);

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const handleCloseCreateAccount = () => {
    setShowCreateAccount(false)
    clearUserFields();
  }
  const handleShowCreateAccount = () => {
    setShowSignIn(false);
    clearUserFields();
    setShowCreateAccount(true);
  }

  const [showSignOut, setShowSignOut] = useState(false);
  const handleCloseSignOut = () => setShowSignOut(false);
  const handleShowSignOut = () => setShowSignOut(true);
  const[signoutPending,setSignoutPending]=useState(false);

  const [showLoginConfirm, setShowLoginConfirm] = useState(false);
  const handleCloseLoginConfirm = () => setShowLoginConfirm(false);

  const[signupPending,setSignupPending]=useState(false);
  const[loginPending,setLoginPending]=useState(false);

  const handleSignup=(e)=>{
    e.preventDefault();
    const user={firstName,lastName,email,password, passwordConfirm};
    setSignupPending(true);
    emailUnique=users.filter((user)=>user.email===email);
    if (!validateEmail(email)){
      alert("Error: Email is not in the correct format.");
      setSignupPending(false);
    }else if (password!==passwordConfirm){
      alert("Error: Passwords are not the same. Please try again.");
      setSignupPending(false);
    }else if (password.length>32 ||password.length<8){
      alert("Error: Password length must be between 8 and 32 characters.");
      setSignupPending(false);
    }else if (firstName.length>50 ||lastName.length>50||email.length>50){
      alert("Error: You entered a field with too many characters, try again.");
      setSignupPending(false);
    }else if (emailUnique.length>0){
      alert("Error: Email already used by another account, try another.");
      setSignupPending(false);
    }

    else{
    fetch('https://warm-nimble-warrior.glitch.me/users',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(user)
    }).then(()=>{
      setUserID(users.length+1);
      console.log("new user added");
      setSignupPending(false);
      setShowCreateAccount(false);
      setLogin(true);
      setShowLoginConfirm(true);
    })}
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
      setShowLoginConfirm(true);
    }else if (!validateEmail(email)){
      alert("Error: Email is not in the correct format.");
      setUserID(-1);
      setFirstName('');
      setLastName('');
      setPasswordConfirm('');
      setLoginPending(false);
    }else{
      alert("Error: Email and or password do not match any available account.");
      setUserID(-1);
      setFirstName('');
      setLastName('');
      setPasswordConfirm('');
      setLoginPending(false);
    }
  }

  const handleSignOut=(e)=>{
    e.preventDefault();
    setSignoutPending(true);
    clearUserFields();
    setSignoutPending(true);
    setLogin(false);
    console.log("user signed out");
    setSignoutPending(false);
    setShowSignOut(false);
    history.replace('/');
  }

  return (
    <div className="app">
    <div className="home-navbar">
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
          <div className="nav-link"><Link id="RouterNavLink" style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}} to="/faq">FAQ</Link></div>
          {!login && <>
          <div className="nav-link" onClick={handleShowSignIn} style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}>My Ratings</div>
          <div className="nav-link" onClick={handleShowSignIn} style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}><Person size={25}/></div></>}
          {login && <>
          <div className="nav-link"><Link id="RouterNavLink" style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}} to={`/ratings/${userID}`}>My Ratings</Link></div>
          <div className="nav-link" onClick={handleShowSignOut} style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}><PersonFill size={25}/></div></>}
          <Link className="nav-link" to={{ pathname: "https://github.com/thulamt/yeezydb" }} target="_blank" style={{color: "blue", textDecoration: "none", display: "flex", justifyContent: "center"}}><Github size={25}/></Link>
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
              id="password" type={passwordShown ? "text" : "password"} className="form-control" placeholder="******"/>
          </div>
          <div className="checkbox-container">
          <input
                id="checkbox"
                type="checkbox"
                checked={passwordShown}
                onChange={togglePassword}
              />
              <label htmlFor="checkbox">Show password</label>
        </div>
          <div className="d-grid gap-2 col-6 mx-auto">
          {!loginPending&&<><button type="submit" className="btn btn-primary">Sign In</button></>}
            {loginPending&&<><button disabled type="submit" className="btn btn-primary">Signing In...</button></>}
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
              id="password" type={passwordShown ? "text" : "password"} className="form-control" placeholder="******"/>
          </div>
          <div className="checkbox-container">
          <input
                id="checkbox"
                type="checkbox"
                checked={passwordShown}
                onChange={togglePassword}
              />
              <label htmlFor="checkbox">Show password</label>
        </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Confirm Password:</span>
            <input  
              required
              value={passwordConfirm}
              onChange={(e)=>{setPasswordConfirm(e.target.value)}} 
              type="password" className="form-control" placeholder="******"/>
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
          <p>Once signed out, you will be redirected to the home page.</p>
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

      <Modal show={showLoginConfirm} onHide={handleCloseLoginConfirm}>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="login-confirm">Welcome {firstName} {lastName}!</h5>
        </Modal.Header>
        <Modal.Body>
          <p>You have successfully signed in.</p>
          <p>You can now view all reviews posted on your in "My Ratings".</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLoginConfirm}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>)}
  </div>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/models">
        <Models />
      </Route>
      <Route path="/models/:id">
        <ModelProfile firstName={firstName} lastName={lastName} userID={userID} login={login}/>
      </Route>
      <Route path="/ratings/:id">
        <Ratings login = {login}/>
      </Route>
      <Route path="/faq">
        <FAQ/>
      </Route>
      <Route path="*">
        <NotFound/>
      </Route>
    </Switch>
  </div>
  );
}

export default App;
