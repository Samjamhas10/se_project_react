import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  console.log("NotFound component rendered");
  return (
    <div className="not-found">
      <h2>Page not found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
