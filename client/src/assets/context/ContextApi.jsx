/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { BsEmojiWinkFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiCopyrightLine } from "react-icons/ri";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [toggle, setToggle] = useState(false)
    const [langToggle, setLangToggle] = useState(false)


    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleLangToggle = () => {
        setLangToggle(!langToggle)
    }

const Myfooter=()=>{
return <>
    <div
        className="footer"
        style={{ textAlign: "center", padding: "10px 0", fontSize: "small", marginTop: "10rem" }}
      >
        <h5
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          Made with love
          <FaHeart size={"17px"} color="red" />
          and a bit of code
          <BsEmojiWinkFill size={"17px"} style={{color: toggle?"lightgreen":"#059212"}}  />
        </h5>

        <p>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <RiCopyrightLine /> 2024-25 | All rights reserved @
          </span>
          <span style={{ textDecoration: "underline", color: toggle?"cyan":"purple" }}>
            <a
              href="https://www.linkedin.com/in/ayushkumar2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ayush Kumar
            </a>
          </span>
        </p>

      </div>

      </>
}


const calculateDueDate = (TimeCreated, Reminder) => {
    const dueDate = new Date(TimeCreated);
  
    switch (Reminder) {
      case "1min":
        dueDate.setMinutes(dueDate.getMinutes() + 1);
        break;
      case "15min":
        dueDate.setMinutes(dueDate.getMinutes() + 15);
        break;
      case "30min":
        dueDate.setMinutes(dueDate.getMinutes() + 30);
        break;
      case "1hr":
        dueDate.setHours(dueDate.getHours() + 1);
        break;
      case "8hr":
        dueDate.setHours(dueDate.getHours() + 8);
        break;
      case "1day":
        dueDate.setDate(dueDate.getDate() + 1);
        break;
      default:
        break;
    }
    return dueDate;
  };
  


    return <AuthContext.Provider value={{handleToggle, toggle,Myfooter,handleLangToggle,langToggle,calculateDueDate}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
}