import React from 'react'
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layout/Layout';

function Homepage() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // if (user?.role === "admin") {
  //   navigate("/admin");
  // }

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? <Spinner /> :
        <div className="container">
          Homepage
        </div>
      }
    </Layout>
  )
}

export default Homepage;




