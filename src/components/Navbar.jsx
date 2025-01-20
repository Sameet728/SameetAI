import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar fixed top-0 z-10 bg-base-100 shadow-md px-4 md:px-8">
      {/* Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          SameetAi
        </a>
      </div>

      {/* Menu for larger screens */}
      <div className="hidden md:flex space-x-4">
        <a className="btn btn-ghost" href="/home">Home</a>
        <a className="btn btn-ghost" href="/about">About</a>
        <a className="btn btn-ghost" href="/services">Services</a>
        <a className="btn btn-ghost" href="/contact">Contact</a>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>

        {/* Hamburger Menu for smaller screens */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBars size={20} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
