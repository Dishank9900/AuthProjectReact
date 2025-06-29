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
import { CardStackCarousel } from "../AceternityComponents/CardStackCarousel";
import TransitionEffect from "./TransitionEffect";
// import { BackgroundGradient } from "../AceternityComponents/BackgorundGradient";
// import { AuroraBackground } from "../AceternityComponents/AuroraBackground";

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const slideData = [
    {
      title: "Mystic Mountains",

      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Dreams",

      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Neon Nights",

      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Desert Whispers",

      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
    setIsValid(phone.length > 8);
  }

  return (
    <TransitionEffect>
      {/* <AuroraBackground> */}
      <div className='flex w-full min-h-screen '>
        <div className='w-1/3 flex items-center justify-center bg-slate-400 '>
          <form className='flex flex-col bg-slate-200 rounded-3xl shadow-lg p-12 '>
            <h1 className='mb-8 text-3xl font-bold text-center'>LOGIN</h1>
            <label className='font-semibold text-lg mb-2'>
              Enter Phone Number
            </label>

            <div className='flex flex-col rounded-2xl border-2 border-gray-200 p-6 mt-4 bg-slate-200 items-center w-full'>
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
                size='lg'
                radius='lg'
                className='bg-slate-200 text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:border-teal-400 hover:text-white hover:scale-110 transition-transform'
                onPress={handleClicking}
              >
                Continue
              </Button>

              <div className='flex mt-6 justify-center text-xs'>
                <a className='text-sky-300 hover:text-blue-500' href='#'>
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>

        <div className='w-2/3 bg-slate-400 flex items-center justify-center '>
          <div className='relative overflow-hidden w-full h-full py-20'>
            <CardStackCarousel slides={slideData} />
          </div>
        </div>
      </div>
      {/* </AuroraBackground> */}
    </TransitionEffect>
  );
};

export default LoginPage;
