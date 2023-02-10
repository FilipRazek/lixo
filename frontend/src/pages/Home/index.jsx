import { Link } from "react-router-dom";
import "./index.css";

export const Home = () => {
  return (
    <div>
      <Link to="/lobby">Visit lobby</Link>
    </div>
  );
};
