import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundimage from "../assets/backgroungimage.jpg";

const AnimatedLayout = () => {
  const location = useLocation();

  const getOffset = () => {
    if (location.pathname === "/verify") return "-100vw";
    return "0vw";
  };

  return (
    <div className='relative overflow-hidden min-h-screen'>
      <motion.div
        className='fixed top-0 left-0 w-[200vw] h-screen z-0 flex'
        animate={{ x: getOffset() }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <img src={backgroundimage} className='w-screen h-screen object-cover' />
        <img src={backgroundimage} className='w-screen h-screen object-cover' />
      </motion.div>

      <div className='relative z-10'>
        <Outlet />
      </div>
    </div>
  );
};

export default AnimatedLayout;
