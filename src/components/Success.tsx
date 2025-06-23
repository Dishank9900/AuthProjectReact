import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import verify_11205003 from "../assets/verify_11205003.png";

const Success: React.FC = () => {
  // function handleClicking() {
  //     Dashboard
  // }

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
      <div className='mx-auto flex max-w-xl items-top  rounded-xl  '>
        <form className='flex flex-col  bg-white rounded-xl shadow-lg p-18 mt-10 w-md'>
          <div className='flex flex-col items-center mb-6'>
            <img
              src={verify_11205003}
              alt='verify'
              className='flex justify-center size-10 mb-15'
            />
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              description='Product Designer'
              name='Jane Doe'
              id='jane-doe-123'
            />
            <h1 className='flex items-stretch mb-12 text-3xl'>
              You are Logged In
            </h1>

            <Button
              variant='bordered'
              color='primary'
              size='lg'
              radius='lg'
              className='hover:scale-110 hover:bg-teal-500 hover:text-white hover:border-0 transition-all'
            >
              Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Success;
