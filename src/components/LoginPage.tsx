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

const LoginPage: React.FC = () => {
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
    <TransitionEffect>
      <div className='bg-gray-200 flex items-center justify-center min-h-screen '>
        <div className='mx-auto flex max-w-xl items-top  rounded-xl '>
          <form className='flex flex-col bg-white rounded-3xl shadow-lg p-18 mt-10 max-w-lg mx-auto'>
            <h1 className='flex items-stretch mb-12 text-3xl'>LOGIN</h1>
            <label className='font-semibold text-lg font-family:mono'>
              Enter Phone Number
            </label>

            <div className=' flex flex-col rounded-2xl border-2 border-gray-200 p-10 mt-10 bg-white items-center w-full  max-w-md '>
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
                  "!w-full !text-base !h-12 !bg-transparent !border-0 !border-b-2 !rounded-b-lg !pl-14 !pr-4 focus:!outline-none transition-all",
                  {
                    "!border-teal-500 focus:!ring-teal-300 rounded-xl": isValid,
                    "!border-red-400 focus:!ring-red-200":
                      !isValid && phone.length > 0,
                    "!border-gray-300": phone.length === 0,
                  }
                )}
                containerClass='!w-full !mb-6'
                buttonClass='!border-none !bg-transparent'
              />

              <Button
                variant='bordered'
                // color='primary'
                size='lg'
                radius='lg'
                className='place-content-around bg-white text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:border-teal-400 hover:text-white hover:scale-110'
                //className='hover:scale-110 hover:bg-teal-500 hover:text-white hover:border-0 transition-all'
                // className='flex bg-white justify-center w-1/3 mx-auto border border-gray-300 text-gray-700 hover:bg-teal-600 hover:text-white hover:rounded-lg  hover:w-1/2 transition-all p-2'
                onPress={handleClicking}
              >
                Continue
              </Button>
              <div className='flex mt-6 justify-center text-xs'>
                <a className='text-sky-300  hover:text-blue-500' href='#'>
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </TransitionEffect>
  );
};

export default LoginPage;
