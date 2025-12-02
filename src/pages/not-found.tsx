import { Link } from "react-router";
import { Header } from "@components";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="main text-center p-5">
        <h1>404</h1>
        <p>
          Oops… the page you're looking for doesn't exist or may have been
          moved.
        </p>
        <Link to="/" className="button button--primary my-4">
          ← Back to Home
        </Link>
      </div>
    </>
  );
}
