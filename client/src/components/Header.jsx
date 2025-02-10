import { assets } from "../assets/assets";
import { AppContext } from "./../context/AppContext";
import { useContext } from "react";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img className="w-36 h-36 mb-6 rounded-full" src={assets.header_img} />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!{" "}
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
      </h1>
      <h2 className="text-3xl sm:text-5xl mb-4 font-semibold">
        Welcome to our App
      </h2>
      <p className="mb-8 max-w-md">
        Lets start with a quick product tour and well be up and running in no
        time
      </p>
      <button className="border border-gray-500 px-8 py-2.5 rounded-full hover:bg-gray-100">
        Get Started
      </button>
    </div>
  );
};
export default Header;
