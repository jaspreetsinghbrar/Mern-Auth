import { assets } from "../assets/assets.js";

const Navbar = () => {
  return (
    <div>
      <img className="w-28 sm:w-32" src={assets.logo} alt="" />
      <button>Login</button>
    </div>
  );
};
export default Navbar;
