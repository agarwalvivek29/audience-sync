import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SignIn from '../pages/auth/SignIn';

export default function Navbar() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="#"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            <SignIn />
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                   
                
                 <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li> 
                                <NavLink 
                                to="/"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                > 
                                    Home
                                </NavLink>
                            </li>
                            <li> 
                                <NavLink to="/onboarding/BusinessDetails"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                > 
                                    Business Details
                                </NavLink>
                            </li>
                            <li> 
                                <NavLink to="/onboarding/DatabaseDetails"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                > 
                                    Database Integration
                                </NavLink>
                            </li>
                            <li> 
                                <NavLink to="/onboarding/ChannelIntegration"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                > 
                                    Channel Integration
                                </NavLink>
                            </li>
                            <li> 
                                <NavLink to="/onboarding/UserEventIntegration"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                > 
                                    Database Selection
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    </div>
            </nav>
        </header>
    );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <nav className="px-4 lg:px-6 py-2.5 border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              alt="Logo"
              className="h-12"
            />
          </Link>

          {/* Right-side Buttons */}
          <div className="flex items-center lg:order-2">
            <Link
              to="#"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              <SignIn />
            </Link>
            <Link
              to="#"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Get Started
            </Link>
            <Link
              to="/TablePage"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              Visualizer
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {['Learn', 'About', 'Contact', 'Github'].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
