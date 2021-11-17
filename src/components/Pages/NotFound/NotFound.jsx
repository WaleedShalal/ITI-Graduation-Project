
import { Link } from "react-router-dom";
import './NotFound.scss'

function NotFound() {
  return (
    <section className="not-found">
      <span><i class="fas fa-sad-tear fa-2x"></i></span>
      <h1>Oops!</h1>
      <h2>404 Not Found</h2>
      <div className="error-details">
        Sorry, an error has occured, Requested page not found!
      </div>
      <div className="my-3">
        <Link to="/" className="btn-error btn btn-primary">
          Take Me Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
