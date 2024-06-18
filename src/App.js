
import "./App.css";

import React, { useMemo, useState, useRef, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "./ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import Modal from "react-modal";

import { useCookies } from "react-cookie";
import { LanguageContext, LanguageProvider } from "./languages/index";
import Navbar from './components/navbar'
import Home from "./pages/Home";

import { initializeApp } from 'firebase/app';
import Register from "./pages/Register";
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth";
import env from "react-dotenv";
import Login from "./pages/Login";
import Forgotpassword from './pages/Forgotpassword'
function App() {
  const { dictionnaire } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [divModal, setDivModal] = useState(<></>);
  const [connected, setConnected] = useState(false);
  const openModal = (element) => {
    setIsModalOpen(true);
    setDivModal(element);
  };

  const closeModal = (Login) => {
    setConnected(Login);
    setIsModalOpen(false);
    setDivModal(<></>);
  };
  const customStyles = {
    overlay: { zIndex: 1000 },
  };
  
  // const firebaseConfig = {
  //   apiKey: env.apiKey,
  //   authDomain: env.authDomain,
  //   projectId: env.projectId,
  //   storageBucket: env.storageBucket,
  //   messagingSenderId: env.messagingSenderId,
  //   appId: env.appId,
  //   measurementId: env.measurementId
  // };

  const FirebaseApp = initializeApp(firebaseConfig);

  return (
    <div className="App w-screen h-screen min-h-[700px] flex flex-col  bg-white font-c ">
      <LanguageProvider>
        <Router>
          <Navbar />
          <ScrollToTop />
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className={"bg-transparent w-screen h-screen z-[10000] flex center"}
            style={customStyles}
          >
            {divModal}
          </Modal>

          <div className="relative h-full overflow-auto sm:overflow-auto" id={"Scrollref"}>
            <Routes>
              <Route path={"/"} element={<Home/>}></Route>
              <Route path={"/Register"} element={<Register />}></Route>
              <Route path={"/Login"} element={<Login />}></Route>
              <Route path={"/Forgotpassword"} element={<Forgotpassword />}></Route>
            </Routes>
          </div>
          <ToastContainer
            icon={(type) =>
              type.type === "error" ? (
                <img
                  src="./images/svg-site/toast/error.svg"
                  alt={type.type}
                ></img>
              ) : type.type === "info" ? (
                <img
                  src="./images/svg-site/toast/info.svg"
                  alt={type.type}
                ></img>
              ) : type.type === "success" ? (
                <img
                  src="./images/svg-site/toast/success.svg"
                  alt={type.type}
                ></img>
              ) : (
                <img
                  src="./images/svg-site/toast/warning.svg"
                  alt={type.type}
                ></img>
              )
            }
            position="bottom-center"
            autoClose={10000}
            hideProgressBar={false}
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
