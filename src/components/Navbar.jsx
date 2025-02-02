import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react"
import { IoMdClose } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [menus, setMenus] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleMobileMenu = useCallback(() => {
    setMobileMenu((prevState) => !prevState);
  }, []);

  const handleDropDown = useCallback(() => {
    setMenus((prevState) => !prevState);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-5 dark:bg-slate-200">
      <div className="flex justify-between">
        {/* hamburgur */}
        <button
          aria-label="hamburgur menu"
          className="md:hidden text-xl"
          onClick={handleMobileMenu}
        >
          <RxHamburgerMenu />
        </button>

        {/* logo  */}
        <div>
          <h1 className="text-2xl font-semibold">Tech<span className="text-red-600">Baap</span></h1>
        </div>
        {/* menu */}
        <div>
          <ul className="hidden md:flex items-center gap-6 cursor-pointer text-lg">
            <li>Home</li>
            <li className="relative" onClick={handleDropDown}>
              Courses
              {menus && (
                <ul
                  className={`absolute  w-40 gap-2 shadow-md rounded-md overflow-hidden transition-all duration-500 ease-in-out cursor-pointer p-2 space-y-3`}
                >
                  <li>Web</li>
                  <li>UI/UX</li>
                  <li>ML</li>
                </ul>
              )}
            </li>
            <li>About</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setDark(!dark)}>
            {dark ? <IoSunnySharp /> : <IoMoon />}
          </button>
          <button
            aria-label="login button"
            className="bg-slate-100 px-3 py-1.5 rounded-md cursor-pointer text-lg"
          >
            Login
          </button>
        </div>
      </div>
      {/* mobile nav */}
      {mobileMenu && (
        <motion.div 
        initial ={{x:"-100%"}}
        animate = {{x:0}}
        exit = {{x:"-100%"}}
        transition={{type:"spring",stiffness:500,damping:20}}
        className="fixed top-0 left-0 h-full w-64 transform translate-x-0 transition-transform duration-300 ease-in-out shadow-md md:hidden p-6 gap-6 flex flex-col z-50 bg-slate-100">
          <button
            aria-label="close hamburgur menu"
            onClick={handleMobileMenu}
            className="self-end text-xl"
          >
            <IoMdClose />
          </button>
          <ul className="flex flex-col space-y-6 p-6 cursor-pointer">
            <li>Home</li>
            <li className="relative" onClick={handleDropDown}>
              Courses
              {menus && (
                <ul
                  className={` shadow-md rounded-md cursor-pointer p-2 space-y-3`}
                >
                  <li>Web</li>
                  <li>UI/UX</li>
                  <li>ML</li>
                </ul>
              )}
            </li>
            <li>About</li>
            <li>Blog</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};
export default Navbar;
