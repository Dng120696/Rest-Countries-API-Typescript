import { useStore } from "../store/store";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
import { Link } from "react-router-dom";
function Header() {
  const state = useStore();
  const { isDark } = state;

  return (
    <header className="py-10 shadow ">
      <nav className="flex items-center justify-between w-[clamp(30rem,90%,120rem)] mx-auto">
        <Link to="/">
          <h1 className="text-4xl font-extrabold">Where in the world?</h1>
        </Link>
        <div
          className="
        flex items-center gap-4 text-2xl font-bold"
        >
          <img src={isDark ? sun : moon} alt="" className="w-8 h-8" />
          <span>{isDark ? "Light" : "Dark"} Mode</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
