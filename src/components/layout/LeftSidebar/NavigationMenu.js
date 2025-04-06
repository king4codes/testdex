import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const NavigationMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="rs-header text-center mb-2">
        Grand Exchange Menu
      </h3>
      <nav className="space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rs-button w-full flex items-center px-4 py-2 text-sm ${
              isActive ? "brightness-125" : ""
            }`
          }
        >
          <span className="mr-3 w-5 text-center">🗡️</span>
          Market Trends
        </NavLink>
        <NavLink
          to="/swap"
          className={({ isActive }) =>
            `rs-button w-full flex items-center px-4 py-2 text-sm ${
              isActive ? "brightness-125" : ""
            }`
          }
        >
          <span className="mr-3 w-5 text-center">💰</span>
          Exchange Items
        </NavLink>
        <NavLink
          to="/pumpfun"
          className={({ isActive }) =>
            `rs-button w-full flex items-center px-4 py-2 text-sm ${
              isActive ? "brightness-125" : ""
            }`
          }
        >
          <span className="mr-3 w-5 text-center">⚔️</span>
          Rare Items
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            `rs-button w-full flex items-center px-4 py-2 text-sm ${
              isActive ? "brightness-125" : ""
            }`
          }
        >
          <span className="mr-3 w-5 text-center">🎒</span>
          My Inventory
        </NavLink>
      </nav>
    </div>
  );
};

export default NavigationMenu;
