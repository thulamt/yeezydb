import {Link} from 'react-router-dom';
import {Row} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const HomeEN = () => {
    return (  
        <div className="home-en">
            <Row>
              <h3 className="pt-5">All adidas Yeezy shoe models in your hands</h3>
              <h4 className="pt-3 pb-3">Review the archive and legacy of YEEZY!</h4>
            </Row>
            <Link to="/models">
              <div className="container-fluid p-4 my-4 bg-primary text-white rounded-pill">
                <h1 className="text-center">View Yeezy Models</h1>
              </div>
            </Link>
        </div>
    );
}
 
export default HomeEN;