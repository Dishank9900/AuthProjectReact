import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/AuthContext";
import { Button } from "@heroui/button";
import otppng from "../assets/otppng.png";

const Verification: React.FC = () => {
  const { login, logout } = useAuth();
  const [otp, setOtp] = useState<string>("");

  const navigator = useNavigate();

  const handleVerify = () => {
    const expected = "1234";
    if (otp === expected) {
      login();
      navigator("/success");
    } else {
      logout();
      navigator("/fail");
    }
  };

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleInput = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = otp.split("");
    newOtp[index] = val;
    const updated = newOtp.join("");
    setOtp(updated);

    if (val && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
      <div className='flex bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full'>
        <form className='flex flex-col justify-center p-12 w-1/2'>
          <h2 className='text-center text-2xl font-semibold mb-6'>
            Verify your account
          </h2>
          <p className='text-center text-gray-500 mb-4'>
            Enter the verification code sent to your phone.
          </p>

          <div className='flex justify-center gap-4 mb-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el!;
                }}
                type='text'
                maxLength={1}
                value={otp[i] || ""}
                onChange={(e) => handleInput(i, e.target.value)}
                className='w-14 h-14 border-2 border-stone-400 text-2xl text-center rounded-lg focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all'
              />
            ))}
          </div>

          <div className='text-sm text-gray-500 mb-4 text-center'>
            Haven’t received the code?{" "}
            <a className='text-blue-500 hover:underline' href='#'>
              Send again
            </a>
          </div>

          <Button
            className='w-1/3 mx-auto border border-gray-300 text-gray-700 hover:bg-teal-600 hover:text-white hover:rounded-lg  hover:w-1/2 transition-all'
            variant='ghost'
            color='primary'
            size='lg'
            radius='lg'
            onPress={handleVerify}
          >
            Continue!
          </Button>
        </form>

        <div className='w-1/2 hidden md:block'>
          <img
            src={otppng}
            alt='OTP Illustration'
            className='w-full h-full object-cover p-4'
          />
        </div>
      </div>
    </div>
  );
};

export default Verification;
