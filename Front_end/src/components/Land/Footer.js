import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookSquare, faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

export default function Foot() {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [rated, setRated] = useState(false); // State to track whether the system has been rated

  // Function to handle rating and display alert
  const handleRating = (index) => {
    setRating(index);
    setRated(true);
    // alert("Thank you for rating!");
  };

  return (
    <footer className="relative bg-gray-300 pt-8 pb-6">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: "80px" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-300 fill-current"
            points="2560 0 2560 101 0 101"
          ></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-700">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 flex items-center">
              <FontAwesomeIcon icon={faTwitter} className="text-blue-400" style={{ fontSize: '2rem', padding: '10px' }} />
              <FontAwesomeIcon icon={faFacebookSquare} className="text-blue-600" style={{ fontSize: '2rem', padding: '10px' }} />
              <FontAwesomeIcon icon={faDribbble} className="text-pink-400" style={{ fontSize: '2rem', padding: '10px' }} />
              <FontAwesomeIcon icon={faGithub} className="text-gray-900" style={{ fontSize: '2rem', padding: '10px' }} />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="/">About Us
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="/dashboard/contact">Contact Us
                    </a>
                  </li> 
                  <li>
                    <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://jaljeevanmission.gov.in/">Awareness Program
                    </a>
                  </li> 
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Rate Our System:
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStarSolid}
                          className={index <= rating ? "text-yellow-400" : "text-gray-400"}
                          onClick={() => handleRating(index)}
                          style={{ fontSize: '1.5rem', cursor: 'pointer', margin: '0.1rem' }}
                        />
                      ))}
                    </div>
                  </li>
                    {
                     rated && <li>Thank you for rating!</li>
                    }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900"
              >
                AquaSense.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}