import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { useAuth } from "../store/AuthContext";
import { Button } from "@heroui/button";
import otppng from "../assets/otppng.png";
import { InputOtp } from "@heroui/input-otp";
import { toast } from "react-toastify";
import { verifyOtp } from "../mocks/api/otp";
import { Spinner } from "@heroui/spinner";
import TransitionEffect from "./TransitionEffect";

const Verification: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to='/success' />;
  }
  const phone = location.state?.phone || "";

  const handleVerify = async () => {
    const countryCode = "+91";
    const phoneNumber = phone;
    setLoading(true);
    try {
      const result = await verifyOtp(countryCode, phoneNumber, otp);
      if (result === true) {
        login(phoneNumber);
        navigator("/success");
      }
    } catch (error: any) {
      logout();
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransitionEffect>
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
              <a className='text-sky-300 hover:underline' href='#'>
                Send again
              </a>
            </div>

            <Button
              variant='bordered'
              // color='primary'
              size='lg'
              radius='lg'
              className='place-content-around bg-white text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:border-teal-400 hover:text-white '
              onPress={handleVerify}
              isDisabled={loading}
            >
              {loading ? (
                <div className='flex flex-wrap items-center gap-8'>
                  <Spinner
                    classNames={{ label: "text-foreground mt-4" }}
                    variant='wave'
                    color='success'
                  />
                </div>
              ) : (
                "Continue"
              )}
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
    </TransitionEffect>
  );
};

export default Verification;
