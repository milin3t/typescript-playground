import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import MainPage from "./pages/MainPage";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/chat/:id" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;
