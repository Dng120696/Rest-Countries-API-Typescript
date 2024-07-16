import { useStore } from "../store/store";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
import { Link } from "react-router-dom";
function Header() {
  const state = useStore();
  const { isDark, setSearchQuery, setSelectedRegion, setIsDark } = state;

  function handleResetQuery() {
    setSearchQuery("");
    setSelectedRegion("selected");
  }
  return (
    <header className="py-8 shadow dark:bg-gray-700 bg-white fixed w-full z-[100]">
      <nav className="flex items-center justify-between w-[clamp(30rem,90%,120rem)] mx-auto">
        <Link to="/" onClick={handleResetQuery}>
          <h1 className="text-4xl font-extrabold text-gray-700 dark:text-gray-100">
            Where in the world?
          </h1>
        </Link>
        <div
          className="
        flex items-center gap-4 text-2xl font-bold cursor-pointer"
          onClick={() => setIsDark()}
        >
          <img src={isDark ? sun : moon} alt="" className="w-8 h-8" />
          <span className="text-gray-700 dark:text-gray-100">
            {isDark ? "Light" : "Dark"} Mode
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
