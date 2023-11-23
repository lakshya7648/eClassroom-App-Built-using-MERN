import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../helpers/Vaildation";
import { useNavigate } from "react-router-dom";
import { fetchRequestedData } from "../../helpers/FetchData";

const TeacherLogin = ({ setProgress, setAlert }) => {
  const nav = useNavigate();
  const [ credentials, setCredentials ] = useState({email : "", password : ""});
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const handleValidation = (event) => {
    // setting the credentials in state
    setCredentials({...credentials, [event.target.name]:event.target.value});

    // validating the filled credentials
    if (event.target.type == "email") {
      setEmailValid(validateEmail(event.target.value));
      if (isEmailValid) {
        event.target.style.borderColor = "green";
      } else {
        document
          .getElementById("login_button")
          .setAttribute("disabled", "true");
        event.target.style.borderColor = "red";
      }
    }
    if (event.target.type == "password") {
      setPasswordValid(validatePassword(event.target.value));
      if (isPasswordValid) {
        event.target.style.borderColor = "green";
      } else {
        document
          .getElementById("login_button")
          .setAttribute("disabled", "true");
        event.target.style.borderColor = "red";
      }
    }
    if (isEmailValid && isPasswordValid) {
      document.getElementById("login_button").removeAttribute("disabled");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setProgress(30);
    let result = {success:false};
    try {
      result = await fetchRequestedData("http://localhost:5000/api/teacher/login", "POST", {"Content-Type":"application/json"}, credentials);

    } catch (error) {
      setAlert("text-red-800", "bg-red-100", `error occurred : ${error.message || error}`);
      setCredentials({...credentials, password:""});
      // console.log(error);
    }

    setProgress(70);
  
    
    if (result.success) {
      localStorage.setItem("authToken", result.authToken);
      localStorage.setItem("type", "teacher");
      nav("/teacher/dashboard");
    }

    setProgress(100);
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setAlert("text-red-800", "bg-red-100", "Logged In Successfull!!");
      nav("/teacher/dashboard");
    }
    document.title = "E Class : Teacher's Login";
  }, []);

  return (
    <>
      <div className="w-full h-[88vh] overflow-hidden p-10 bg-gradient-to-br from-white  via-slate-50 to-slate-200 flex flex-wrap justify-center align-middle items-center">
        <div className="title">
          <h1 className="text-5xl text-green-700 font-bold font-Young-Serif text-center md:text-start md:text-8xl">
            E Class
          </h1>
          <p className="block text-lg text-slate-900 font-Young-Serif font-light md:text-xl">
            Your Favorite Class is with you.
          </p>
        </div>
        <div className="login_page w-96 flex flex-col justify-center my-2 md:ml-80 border bg-white shadow-sm relative z-20 overflow-hidden">
          <h1 className="px-4 py-6 font-Young-Serif bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white text-center text-xl md:text-2xl">
            Login
          </h1>
          <div className="form p-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-3 text-md font-bold font-Young-Serif text-gray-900 dark:text-white hover:text-green-700"
                >
                  Your email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    className="bg-white border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-700 dark:focus:border-green-700"
                    placeholder="abc@xyz.com"
                    required
                    onChange={handleValidation}
                  />
                </label>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-3 text-md font-bold font-Young-Serif text-gray-900 dark:text-white hover:text-green-700"
                >
                  Your Password
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    className="bg-white border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-700 dark:focus:border-green-700"
                    placeholder="********"
                    required
                    onChange={handleValidation}
                  />
                </label>
              </div>
              <div className="mb-2 mt-4 flex justify-center">
                <input
                  type="submit"
                  id="login_button"
                  value="Login"
                  disabled
                  className="text-md font-Young-Serif font-semibold text-center bg-white text-green-800 border border-green-800 hover:bg-green-800 hover:text-white px-4 py-2 rounded-full w-64 cursor-pointer active:bg-green-900 disabled:opacity-20 disabled:cursor-not-allowed"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherLogin;
