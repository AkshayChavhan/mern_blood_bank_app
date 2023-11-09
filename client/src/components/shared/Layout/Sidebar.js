import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userMenu } from './Menus/userMenu';
import "../../../styles/Layout.css";


const Sidebar = () => {

  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();


  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {
            userMenu.map((menu) => {
              const isActive = location.pathname === menu.path;

              return (
                <div key={menu.name} className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar