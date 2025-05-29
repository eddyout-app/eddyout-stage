
import { Link } from 'react-router-dom';
import './Error.css'; // Optional: Add custom styling for the error page

const ErrorPage = () => {
    return (
        <div className= "error-page" >
        <h1>404: Lost in the Current </h1>
            < p > Oops! It seems you've paddled into uncharted waters.</p>
                < Link to = "/" > Paddle Back to Home </Link>
                    </div>
    );
};

export default ErrorPage;