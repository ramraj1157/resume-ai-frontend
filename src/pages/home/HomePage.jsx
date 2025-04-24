import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData("")); // Clear user data if not found
        }
      } catch (error) {
        console.log("Error fetching user data: ", error.message);
        dispatch(addUserData("")); // Clear user data if error occurs
      }
    };
    fetchResponse();
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard"); // Redirect to the dashboard if the user is logged in
    } else {
      navigate("/auth/sign-in"); // Redirect to sign-in page if no user found
    }
  };

  return (
    <>
      <Header user={user} />
      <section className="pt-24 pb-20 bg-white">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span>Create</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-green-500 lg:inline">
                Your AI-Generated Resume
              </span>{" "}
              <span>for Campus Bridge Opportunities</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
              Build a standout resume with the power of AI and get noticed by
              top companies.
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <Button
                className="w-full sm:w-auto sm:mb-0 text-lg text-white bg-blue-500 rounded-2xl px-6 py-3"
                onClick={handleGetStartedClick}
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button
                className="w-full sm:w-auto sm:mb-0 text-lg bg-gray-100 rounded-2xl bg-green-600 px-6 py-3 mt-2 sm:mt-0"
                onClick={() => window.scrollTo(0, document.body.scrollHeight)}
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 bg-gradient-to-r from-blue-400 to-green-500 h-11 rounded-t-xl">
                  <div className="flex space-x-1.5">
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                  </div>
                  <FaInfoCircle className="text-white hover:text-gray-300 transition duration-300 transform hover:rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white" aria-labelledby="footer-heading">
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 p-5 flex justify-between">
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2024 Campus Bridge. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
