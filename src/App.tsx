import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <div className="">
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
