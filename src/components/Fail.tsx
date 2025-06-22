import { useNavigate } from "react-router";

const Fail: React.FC = () => {
  const navigate = useNavigate();
  function handleRedirect() {
    navigate("/");
  }

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
      <div className='mx-auto flex max-w-xl items-top  rounded-xl  '>
        <form className='flex flex-col bg-white rounded-xl shadow-lg p-18 mt-10 w-md'>
          <h1 className='flex items-stretch mb-12 text-3xl'>Wrong OTP</h1>

          <div className=' flex flex-col rounded-2xl border-2 border-gray-100 p-10 mt-1 bg-amber-100 items-center'>
            <button
              className='flex items-center justify-center h-12 px-6 w-32 bg-blue-500 mt-8 rounded font-semibold text-sm text-blue-50 hover:bg-blue-700 '
              onClick={handleRedirect}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Fail;
