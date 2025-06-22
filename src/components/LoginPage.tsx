import React, { useEffect } from "react";
import "tailwindcss";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@heroui/button";
import clsx from "clsx";

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  function handleClicking() {
    if (isValid) navigate("/Verify");
    else {
      alert("Please enter a valid phone number");
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
    <div className='bg-gray-200 flex items-center justify-center min-h-screen'>
      <div className='mx-auto flex max-w-xl items-top  rounded-xl '>
        <form className='flex flex-col bg-white rounded-3xl shadow-lg p-18 mt-10 max-w-lg mx-auto'>
          <h1 className='flex items-stretch mb-12 text-3xl'>LOGIN</h1>
          <label className='font-semibold text-lg font-family:mono'>
            Enter Phone Number
          </label>

          <div className=' flex flex-col rounded-2xl border-2 border-gray-200 p-10 mt-10 bg-white items-center w-full  max-w-md'>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={HandleChangeNo}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              inputClass={clsx(
                "w-full !max-w-full border-b rounded-xl focus: outline-none focus:ring-2",
                {
                  "border-green-400 ring-green-200": isValid,
                  "border-red-400 ring-red-200": !isValid,
                  "border-stone-300": phone.length === 0,
                }
              )}
              containerClass='w-full mb-4'
            />

            <Button
              variant='ghost'
              color='primary'
              size='lg'
              radius='lg'
              className='flex justify-center w-1/3 mx-auto border border-gray-300 text-gray-700 hover:bg-teal-600 hover:text-white hover:rounded-lg  hover:w-1/2 transition-all'
              onPress={handleClicking}
            >
              Continue
            </Button>
            <div className='flex mt-6 justify-center text-xs'>
              <a className='text-blue-400 hover:text-blue-500' href='#'>
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
