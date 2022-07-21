import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
    return (  
        <div className="not-found container pt-5 my-4">
            <h1>Well...</h1>
            <p>Looks like this page cannot be found.</p>
            <Link to="/">Take me back to the homepage!</Link>
        </div>
    );
}
 
export default NotFound;