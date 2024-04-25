import { useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import { signIn } from "@junobuild/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { initJuno } from "@junobuild/core";

const Header = ({ setuser, active }) => {
  const [activeBtn, setactiveBtn] = useState(active);
  const [isUser, setisUser] = useState(false);
  // eslint-disable-next-line react/prop-types
  const Button = ({ title }) => (
    <button
      className={`px-3 py-1 rounded-2xl ${
        active == title
          ? `bg-yellow-300 text-black  font-bold`
          : `bg-black text-gray-300 font-base`
      }`}
      onClick={() => setactiveBtn(title)}
    >
      {title}
    </button>
  );
  useEffect(() => {
    initJuno({
      satelliteId: "s7qdh-yiaaa-aaaal-ajapa-cai",
    });
    try {
      authSubscribe((user) => {
        console.log("User:", user.owner);
        setuser(user.owner);
        setisUser(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogIn = async () => {
    await signIn();
  };

  return (
    <div className="w-full py-3 px-3 gap-9 flex flex-col">
      <div className="w-full flex  items-center justify-between">
        <a href="/">
          <h1 className="text-yellow-300 font-bold text-4xl mt-9 mb-6">
            ICP Media
          </h1>
        </a>
        <div className="flex gap-6">
          {!isUser && (
            <button
              onClick={handleLogIn}
              className="px-3 py-1 h-9  rounded-xl bg-yellow-300 text-black w-full max-w-[200px] text-xl font-semibold"
            >
              LogIn
            </button>
          )}
          {isUser && (
            <a
              href="/profile"
              className="px-3 py-1 h-9  rounded-xl  text-gray-300 text-3xl font-semibold"
            >
              <AccountCircleIcon />
            </a>
          )}
        </div>
      </div>
      <div className="flex items-enter justify-center">
        <a href="/home">
          <button
            className={`px-3 py-1 rounded-2xl ${
              active == "home"
                ? `bg-yellow-300 text-black  font-bold`
                : `bg-black text-gray-300 font-base`
            }`}
          >
            Home
          </button>
        </a>
        <a href="/">
          <button
            className={`px-3 py-1 rounded-2xl ${
              active == "Trending"
                ? `bg-yellow-300 text-black  font-bold`
                : `bg-black text-gray-300 font-base`
            }`}
          >
            Trending
          </button>
        </a>
        <a href="/profile">
          <button
            className={`px-3 py-1 rounded-2xl ${
              active == "profile"
                ? `bg-yellow-300 text-black  font-bold`
                : `bg-black text-gray-300 font-base`
            }`}
          >
            Profile
          </button>
        </a>
      </div>
    </div>
  );
};

export default Header;
