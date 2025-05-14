import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pixalive from "../Assests/Images/pts_logo.jpg";
import { CiSearch } from "react-icons/ci";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { getServices } from "../Api/services";
import {getDevelopers} from "../Api/hireDevelopers"
import { saveSearchQuery ,getSearchQuery} from "../Utils/storage";
import  '../App.css';
const MainHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("/");
    const [showSearch, setShowSearch] = useState(false); // State to show/hide the full-screen search
    const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
       saveSearchQuery(searchTerm);
      navigate(`/search?query=${getSearchQuery()}`); // Navigate to Search.jsx with search term

  };

    const handleSearchClick = () => {
        setActiveItem("Search");
        setShowSearch(true); // Show the full-screen search pop-up
    };



    const closeSearch = () => {
        setShowSearch(false); // Close the search pop-up when the close button or overlay is clicked
    };
      
        const [services, setServices] = useState([]);
        useEffect(() => {
            getservices();
        },[])
        const getservices = async() => {
        try {
            const res = await getServices();
            setServices(res?.data?.result || []);
            console.log("res",res)
        } catch (error) {
            console.log("error",error);
        }
        }
        useEffect(() => {
            fetchDevelopers();
          }, []);
          const [developers, setDevelopers] = useState([]);
          const fetchDevelopers = async () => {
        
            try {
              const res = await getDevelopers();
              setDevelopers(res?.data?.result || []);
            } catch (error) {
              console.log("Error fetching Developers", error);
            }
          };
          
    return (
        <div>

            <div className="w-full flex items-center gap-6 lg:justify-center lg:items-center justify-between px-5 lg:px-20 py-1 bg-white shadow-md">
                <div>
                    <img src={pixalive} alt="pixalive" className="w-20 h-20" />
                </div>

                {/* Navigation for Desktop */}
                <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-6 text-gray-700 font-semibold">
                    {[
                        { name: "Home", path: "/" },
                        { name: "About", path: "/About" },
                        { name: "Our Clients", path: "/Our-Clients" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`hover-border ${activeItem === item.name
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 flex pb-2 w-28 justify-center`}
                            onClick={() => setActiveItem(item.name)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Services Dropdown */}
                     <div className="relative group ">
            <button
              className={`${activeItem === "Services"
                ? "text-yellow-600 border-b-4 border-yellow-600"
                : ""
                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
              onClick={() => setActiveItem("Services")}
            >
              Services <FiChevronDown className="text-sm" />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-56 z-10">
              {services.map((sub) => (
                <Link
                  key={sub._id}
                  to={{ pathname: "/services", search: `?id=${sub._id}` }}
                  className="block px-4 py-2 hover:bg-pink-100"
                  onClick={() => setActiveItem(sub.title)}
                >
                  {sub.title}
                </Link>
              ))}
              {[
                { name: "Coworking Space", path: "/Co-working-Space" },
                { name: "Laptops Rental", path: "/Laptop-Rental" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-2 hover:bg-pink-100 ${activeItem === item.name ? "text-yellow-600" : ""
                    }`}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

                    {/* Hire Developers Dropdown */}
                    <div className="relative group ">
                        <button
                            className={`${activeItem === "Hire Developers"
                                    ? "text-yellow-600 border-b-4 border-yellow-600 w-40"
                                    : "w-40"
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2  flex items-center gap-1`}
                            onClick={() => setActiveItem("Hire Developers")}
                        >
                            Hire Developers <FiChevronDown className="text-sm" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-60">
                            {developers.map((dev) => (
                                <Link
                                    key={dev}
                                    to={{
                                                      pathname: "/Hire-Developers",
                                                      search: `?id=${dev?._id}`,
                                                    }}
                                    className="block px-4 py-2 hover:bg-pink-100"
                                >
                                    {dev.role}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {[
                        { name: "Contact Us", path: "/Contact-us" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`hover-border ${activeItem === item.name
                                    ? "text-yellow-600 border-b-4 border-yellow-600 w-28 flex justify-center align-center"
                                    : "w-28 flex justify-center align-center"
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2`}
                            onClick={() => setActiveItem(item.name)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Careers Dropdown */}
                    <div className="relative group">
                        <button
                            className={`${activeItem === "Careers"
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                            onClick={() => setActiveItem("Careers")}
                        >
                            Careers <FiChevronDown className="text-sm" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-48">
                            {[
                                { name: "Career Policy", path: "/Careers/Career-Policy" },
                                { name: "Job Openings", path: "/Careers/Job-Openings" },
                            ].map((career) => (
                                <Link
                                    key={career.name}
                                    to={career.path}
                                    className="block px-4 py-2 hover:bg-pink-100"
                                    onClick={() => setActiveItem(career.name)}
                                >
                                    {career.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="hidden lg:flex">
                    <CiSearch
                        className={`${activeItem === "Search" ? "text-yellow-600" : ""} cursor-pointer`}
                        onClick={handleSearchClick}
                    />
                </div>
                {showSearch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-10 w-full max-w-md">
                        <button
                            onClick={closeSearch}
                            className="relative  bottom-5 left-[98%] text-yellow-950 hover:text-gray-700 text-2xl font-bold"
                        >
                            ✕
                        </button>
                        <form onSubmit={handleSearch} className="flex flex-col items-center">
                            <input
                                type="text"
                                value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter your search..."
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button
                                type="submit"
                                className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-500"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            )}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-gray-700"
                >
                    {menuOpen ? <IoClose className="h-8 w-8" /> : <IoMenu className="h-8 w-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
{menuOpen && (
  <div className="lg:hidden bg-white shadow-xl py-6 px-6 relative z-50">
    <nav className="flex flex-col space-y-4 text-gray-800 font-semibold">
      {/* Static Links */}
      {[
        { name: "Home", path: "/" },
        { name: "About", path: "/About" },
        { name: "Our Clients", path: "/Our-Clients" },
      ].map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`transition-all duration-200 ${
            activeItem === item.name
              ? "text-yellow-600 border-l-4 border-yellow-600 bg-yellow-50 pl-4"
              : "hover:text-yellow-600 hover:pl-4"
          } py-2`}
          onClick={() => setActiveItem(item.name)}
        >
          {item.name}
        </Link>
      ))}

      {/* Services Dropdown */}
      <div className="relative">
        <button
          className={`w-full text-left flex justify-between items-center transition-all duration-200 ${
            activeItem === "Services"
              ? "text-yellow-600 border-l-4 border-yellow-600 bg-yellow-50 pl-4"
              : "hover:text-yellow-600 hover:pl-4"
          } py-2`}
          onClick={() =>
            setActiveItem((prev) => (prev === "Services" ? "" : "Services"))
          }
        >
          Services <FiChevronDown className="text-sm ml-2" />
        </button>
        {activeItem === "Services" && (
          <div className="bg-gray-50 rounded-lg mt-2 p-3 space-y-2 shadow-inner transition-all duration-300">
            {services.map((sub) => (
              <Link
                key={sub._id}
                to={{ pathname: "/services", search: `?id=${sub._id}` }}
                className="block px-3 py-2 rounded-md hover:bg-yellow-100 transition"
                onClick={() => setActiveItem(sub.title)}
              >
                {sub.title}
              </Link>
            ))}
            {[
              { name: "Coworking Space", path: "/Co-working-Space" },
              { name: "Laptops Rental", path: "/Laptop-Rental" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md hover:bg-yellow-100 transition ${
                  activeItem === item.name ? "text-yellow-600 font-medium" : ""
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Hire Developers Dropdown */}
      <div className="relative">
        <button
          className={`w-full text-left flex justify-between items-center transition-all duration-200 ${
            activeItem === "Hire Developers"
              ? "text-yellow-600 border-l-4 border-yellow-600 bg-yellow-50 pl-4"
              : "hover:text-yellow-600 hover:pl-4"
          } py-2`}
          onClick={() =>
            setActiveItem((prev) =>
              prev === "Hire Developers" ? "" : "Hire Developers"
            )
          }
        >
          Hire Developers <FiChevronDown className="text-sm ml-2" />
        </button>
        {activeItem === "Hire Developers" && (
          <div className="bg-gray-50 rounded-lg mt-2 p-3 space-y-2 shadow-inner transition-all duration-300">
            {developers.map((dev) => (
              <Link
                key={dev._id}
                to={{
                  pathname: "/Hire-Developers",
                  search: `?id=${dev._id}`,
                }}
                className="block px-3 py-2 rounded-md hover:bg-yellow-100 transition"
              >
                {dev.role}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Contact Us */}
      <Link
        to="/Contact-us"
        className={`transition-all duration-200 ${
          activeItem === "Contact Us"
            ? "text-yellow-600 border-l-4 border-yellow-600 bg-yellow-50 pl-4"
            : "hover:text-yellow-600 hover:pl-4"
        } py-2`}
        onClick={() => setActiveItem("Contact Us")}
      >
        Contact Us
      </Link>

      {/* Careers Dropdown */}
      <div className="relative">
        <button
          className={`w-full text-left flex justify-between items-center transition-all duration-200 ${
            activeItem === "Careers"
              ? "text-yellow-600 border-l-4 border-yellow-600 bg-yellow-50 pl-4"
              : "hover:text-yellow-600 hover:pl-4"
          } py-2`}
          onClick={() =>
            setActiveItem((prev) => (prev === "Careers" ? "" : "Careers"))
          }
        >
          Careers <FiChevronDown className="text-sm ml-2" />
        </button>
        {activeItem === "Careers" && (
          <div className="bg-gray-50 rounded-lg mt-2 p-3 space-y-2 shadow-inner transition-all duration-300">
            {[
              { name: "Career Policy", path: "/Careers/Career-Policy" },
              { name: "Job Openings", path: "/Careers/Job-Openings" },
            ].map((career) => (
              <Link
                key={career.name}
                to={career.path}
                className="block px-3 py-2 rounded-md hover:bg-yellow-100 transition"
                onClick={() => setActiveItem(career.name)}
              >
                {career.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>

    {/* Search Icon */}
    <div className="flex justify-start mt-6">
      <CiSearch
        className={`text-2xl cursor-pointer transition-transform hover:scale-110 ${
          activeItem === "Search" ? "text-yellow-600" : "text-gray-700"
        }`}
        onClick={handleSearchClick}
      />
      
    </div>

    {/* Search Modal */}
    {showSearch && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
          <button
            onClick={closeSearch}
            className="absolute top-2 right-4 text-gray-600 hover:text-yellow-600 text-2xl font-bold"
          >
            ✕
          </button>
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter your search..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <button
              type="submit"
              className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition "
            >
              Search
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
)}



        </div>
    );
};

export default MainHeader;
