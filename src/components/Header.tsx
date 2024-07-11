import { useStore } from "../store/store";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
function Header() {
  const state = useStore();
  const { isDark } = state;

  return (
    <header>
      <nav>
        <h1>Where in the world?</h1>
        <div>
          <img src={isDark ? sun : moon} alt="" />
          <span>{isDark ? "Dark" : "Light"} Mode</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
