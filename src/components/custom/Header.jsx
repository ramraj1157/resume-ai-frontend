import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md py-4 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Campus Bridge</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-white text-gray-900 hover:bg-white hover:text-blue-600 transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="bg-white text-gray-900 hover:bg-blue-100 transition"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button className="bg-white text-blue-600 hover:bg-blue-100 transition">
            Get Started
          </Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
