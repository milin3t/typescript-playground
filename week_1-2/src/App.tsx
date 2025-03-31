import BookSelect from "./components/BookSelect";
import BookCart from "./components/BookCart";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookSelect />} />
        <Route path="/bookcart" element={<BookCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
