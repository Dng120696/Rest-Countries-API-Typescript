import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import { useStore } from "./store/store";

function App() {
  const isDark = useStore((state) => state.isDark);
  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="country/:country_name" element={<CountryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
