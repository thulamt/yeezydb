import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const ratingRatio = ({like, dislike}) => {
    const max=like+dislike;
    const ratio=Math.floor(like/max*100);
    return ( 
        <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: `${ratio}%`}} ariaValuenow={ratio.toString()} ariaValuemin="0" ariaValuemax="100">{ratio}%</div>
        </div>
     );
}
 
export default ratingRatio;