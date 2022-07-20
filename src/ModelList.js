import { Row, Col,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const ModelList = ({models}) => {
    return (  
        <div className="model-list">
            <Row>
            {models.map((model)=>(
            <Col xs="4" key={model.id}>
            <div className="model-preview" >
              <Link to={`/models/${model.id}`} className="text-decoration-none">
                <div className="card border-0" style={{width:"400px", height:"400px"}}>
                  <img className="card-img-top" src={require('./assets/'+model.image+'.jpg')} style={{paddingTop: "20px"}} alt="Card image"/>
                  <div className="card-body">
                    <h4 className="card-title text-center">{model.title}</h4>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
        ))}
        </Row>
        </div>
    );
}
 
export default ModelList;