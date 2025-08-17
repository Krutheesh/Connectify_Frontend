import { Link, useLocation } from "react-router";
import { useState } from "react";
import { BellIcon, LogOutIcon, ShipWheelIcon,Menu,X, UsersIcon, HomeIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import useProfile from "../hooks/useProfile";

const Navbar = () => {
  const {user,fetchProfile} = useProfile();
  const {handleLogout} = useLogout();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
 const [menu, setMenu] = useState(false);
 const currentPath = location.pathname;
  const menuHandler = () => {
    console.log("Menu clicked");
    setMenu(!menu);
  }

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          { ( 
            <div className="pl-0  lg:hidden">
              <Link to="/" className="flex items-center gap-1.5 md:gap-2.5">
                <ShipWheelIcon className="md:size-9 size-6 text-primary" />
                <span className="text-2xl md:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                 Connectify
                </span>
              </Link>
            </div>
          )}

          <div className=" items-center gap-3 sm:gap-4 ml-auto hidden lg:flex">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar hidden lg:flex">
            <div className="w-9 rounded-full">
              <img src={user?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className=" hidden lg:flex btn btn-ghost btn-circle" onClick={handleLogout}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
          <button className=" lg:hidden flex btn btn-ghost btn-circle" onClick={menuHandler} >
            {!menu?<Menu className="h-7 w-7 text-base-content opacity-70" />:
            <X  className="h-7 w-7 text-base-content opacity-70" />}
          </button>
          <div className="lg:hidden flex items-start h-[100vh] fixed top-[4rem] right-0 bg-base-200 z-50 w-[100vw] transition-transform duration-300 ease-in-out" style={{transform: menu ? 'translateX(0)' : 'translateX(100%)'}}>
           
             <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
          onClick={menuHandler}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
          onClick={menuHandler}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
          onClick={menuHandler}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;