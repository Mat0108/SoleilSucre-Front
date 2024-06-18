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


function App() {
  const { dictionnaire } = useContext(LanguageContext);

  return (
    <div className="App w-screen h-screen min-h-[700px] flex flex-col  bg-[#EEE8E4] font-mt ">
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          {Nav}
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
