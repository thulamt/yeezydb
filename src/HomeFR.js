import {Link} from 'react-router-dom';
import {Row} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const HomeFR = () => {
    return (  
        <div className="home-fr">
            <Row>
              <h3 className="pt-5">Tous les modèles Yeezy entre vos mains</h3>
              <h4 className="pt-3 pb-3">Consultez les archives et l'héritage de YEEZY!</h4>
            </Row>
            <Link to="/models">
              <div className="container-fluid p-4 my-4 bg-primary text-white rounded-pill">
                <h1 className="text-center">Voir les modèles Yeezy</h1>
              </div>
            </Link>
        </div>
    );
}
 
export default HomeFR;