
import "./App.css";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ReactToastify.css";

import ScrollToTop from "./components/ScrollToTop";

import { LanguageProvider } from "./languages/index";
import Navbar from './components/navbar'
import Home from "./pages/Home";

import { initializeApp } from 'firebase/app';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgotpassword from './pages/Forgotpassword'
import Account from "./pages/Account";
function App() {
  // const firebaseConfig = {
  //   apiKey: env.apiKey,
  //   authDomain: env.authDomain,
  //   projectId: env.projectId,
  //   storageBucket: env.storageBucket,
  //   messagingSenderId: env.messagingSenderId,
  //   appId: env.appId,
  //   measurementId: env.measurementId
  // };
 
  initializeApp(firebaseConfig);

  return (
    <div className="App w-screen h-screen min-h-[700px] flex flex-col  bg-white font-c ">
      <LanguageProvider>
        <Router>
          <Navbar />
          <ScrollToTop />

          <div className="relative h-full overflow-auto sm:overflow-auto" id={"Scrollref"}>
            <Routes>
              <Route path={"/"} element={<Home/>}></Route>
              <Route path={"/Register"} element={<Register />}></Route>
              <Route path={"/Login"} element={<Login />}></Route>
              <Route path={"/Logout"} element={<Home/>}></Route>
              <Route path={"/Account"} element={<Account />}></Route>
              <Route path={"/Forgotpassword"} element={<Forgotpassword />}></Route>
            </Routes>
          </div>
          <ToastContainer
            icon={(type) =>
              type.type === "error" ? (
                <img
                  src="./images/toast/error.svg"
                  alt={type.type}
                ></img>
              ) : type.type === "info" ? (
                <img
                  src="./images/toast/info.svg"
                  alt={type.type}
                ></img>
              ) : type.type === "success" ? (
                <img
                  src="./images/toast/success.svg"
                  alt={type.type}
                ></img>
              ) : (
                <img
                  src="./images/toast/warning.svg"
                  alt={type.type}
                ></img>
              )
            }
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            limit={1}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className={"w-fit"}
          />
        </Router>
      </LanguageProvider>

    </div>
  );
}

export default App;
