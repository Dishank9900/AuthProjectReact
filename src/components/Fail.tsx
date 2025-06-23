import { useNavigate } from "react-router";
import { Button } from "@heroui/button";
import wrong from "../assets/wrong.png";

const Fail: React.FC = () => {
  const navigate = useNavigate();
  function handleRedirect() {
    navigate("/");
  }

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
      <div className='mx-auto flex max-w-xl items-top  rounded-xl '>
        <form className='flex justify-center flex-col bg-white rounded-3xl shadow-lg p-24 mt-10 max-w-lg mx-auto'>
          <div className='flex flex-col items-center mb-6'>
            <img
              src={wrong}
              alt='oops'
              className='flex justify-center size-15 mb-15'
            />

            <label className='flex justify-center font-semibold text-lg font-family:mono'>
              Wrong OTP
            </label>
          </div>

          <Button
            variant='ghost'
            color='primary'
            size='lg'
            radius='lg'
            className='flex justify-center w-2/3 mx-auto border bg-red-300 border-red-300 rounded-lg text-gray-700 hover:bg-teal-600 hover:text-white hover:rounded-lg  hover:border-teal-300 transition-all'
            onPress={handleRedirect}
          >
            Retry
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Fail;
