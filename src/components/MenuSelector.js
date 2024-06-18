import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuSelector = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isButtonHovering, setIsButtonHovered] = useState(false);
  const [isMenuHovering, setIsMenuHovered] = useState(false);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const onMouseEnterButton = () => {
    setShowOptions(true);
    setIsButtonHovered(true);
  };
  const onMouseEnterMenu = () => {
    setShowOptions(true);
    setIsMenuHovered(true);
  };
  const onMouseLeaveButton = () => {
    setIsButtonHovered(false);
    if (!isMenuHovering) setShowOptions(false);
  };
  const onMouseLeaveMenu = () => {
    setIsMenuHovered(false);
    if (!isButtonHovering) setShowOptions(false);
  };
  
  const cmhover =
    "text-black hover:bg-[#264C4D] hover:text-white px-4 py-1 sm:py-2 hover:cursor-pointer rounded-full ";
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        className={`flex flex-row w-[160px] sm:w-[180px] ${showOptions ? "bg-[#264C4D] text-white cursor-pointer":""} ${cmhover}`}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
         <div className="flex center gap-1 sm:gap-2.5 w-fit mr-[10px]">
       {showOptions ?   <img src={"/images/pointwhite.png"} alt={"pw"} /> : <img src={"/images/pointhidden.png"} alt={"pw"} />}
        
        <div className="font-mt-bold">
            {props.title}
        </div>
        </div>
      </button>

      {/* Dropdown options */}
      {showOptions && (
        <div
          onMouseEnter={onMouseEnterMenu}
          onMouseLeave={onMouseLeaveMenu}
          className="absolute rounded-2xl bg-white dark:bg-gray-dark text-gray-normal z-[1000] p-2 drop-shadow-2xl h-fit overflow-auto"
          style={{
            fontfamily: "AvenirNextCyr",
            boxshadow: "20px 20px 20px black",
          }}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1 space-y-[5%]" role="none">
            {Object.entries(props.options).map(([id,option], key) => {
              return (
                <Link to={option.to}
                  key={key}
                  className={`cursor-pointer inline text-xs sm:text-md font-semibold hover:bg-[#264C4D] hover:text-white flex rounded-2xl`}
                  tabIndex="-1"
                  id={`Menu-choice-${option.to}`}
                >
                  <div className="flex h-6 w-[150px] sm:h-12 sm:w-[170px] sm:px-[1px] text-xs sm:text-md align-left">

                  </div>

                  <p
                    className={`self-center absolute title-header ml-2 sm:ml-5`}
                  >
                    {option.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default MenuSelector;