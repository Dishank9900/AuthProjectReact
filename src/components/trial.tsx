import "tailwindcss";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@heroui/button";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import TransitionEffect from "./TransitionEffect";

const Trial: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to='/success' />;
  }

  function handleClicking() {
    if (isValid) {
      const phone10 = phone.slice(-10);
      navigate("/Verify", { state: { phone: phone10 } });
    } else {
      toast.error("Please enter a valid phone number");
      setPhone("");
      setIsValid(false);
    }
  }

  function HandleChangeNo(phone: string) {
    setPhone(phone);
    if (phone.length > 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  return (
    <>
      <div className=' flex flex-row'>
        <div className='flex max-w-1/3 '>hello world</div>
        <div className='flex max-w-2/3'> image carousel</div>
      </div>
    </>
  );
};

export default Trial;
