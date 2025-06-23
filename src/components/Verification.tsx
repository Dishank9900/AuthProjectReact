import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/AuthContext";
import { Button } from "@heroui/button";
import otppng from "../assets/otppng.png";
import { InputOtp } from "@heroui/input-otp";
import { toast } from "react-toastify";
import { verifyOtp } from "../mocks/api/otp";

const Verification: React.FC = () => {
  const { login, logout } = useAuth();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigator = useNavigate();

  const handleVerify = async () => {
    const countryCode = "+91";
    const phoneNumber = localStorage.getItem("phone")!;

    try {
      console.log("Calling verifyOtp with:", { countryCode, phoneNumber, otp });
      const result = await verifyOtp(countryCode, phoneNumber, otp);
      console.log("Verification result:", result);
      if (result === true) {
        login();
        navigator("/success");
      }
    } catch (err: any) {
      console.log("Verification failed:", err);
      logout();
      setError(err.message);
      toast.error(error);
      navigator("/fail");
    }
  };

  //   if (otp === expected) {
  //     login();
  //     navigator("/success");
  //   } else {
  //     logout();
  //     toast.error("Invalid OTP. Please try again.");
  //     setOtp("");
  //   }
  // };

  // const inputsRef = useRef<HTMLInputElement[]>([]);

  // const handleInput = (index: number, val: string) => {
  //   if (!/^\d*$/.test(val)) return;
  //   const newOtp = otp.split("");
  //   newOtp[index] = val;
  //   const updated = newOtp.join("");
  //   setOtp(updated);

  //   if (val && inputsRef.current[index + 1]) {
  //     inputsRef.current[index + 1].focus();
  //   }
  // };

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

          <div className='flex flex-col items-center gap-2 mb-2'>
            <InputOtp length={4} value={otp} onValueChange={setOtp} />
          </div>

          <div className='text-sm text-gray-500 mb-4 text-center'>
            Haven't received the code?{" "}
            <a className='text-blue-500 hover:underline' href='#'>
              Send again
            </a>
          </div>

          <Button
            variant='bordered'
            color='primary'
            size='lg'
            radius='lg'
            className='hover:scale-110 hover:bg-teal-500 hover:text-white hover:border-0 transition-all'
            // className='flex bg-white justify-center w-1/3 mx-auto border border-gray-300 text-gray-700 hover:bg-teal-600 hover:text-white hover:rounded-lg  hover:w-1/2 transition-all p-2'
            onPress={handleVerify}
          >
            Continue
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
