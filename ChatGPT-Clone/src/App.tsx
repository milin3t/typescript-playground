// App.tsx
import GlobalStyle from "./styles/GlobalStyle";
import MainPage from "./pages/MainPage";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <GlobalStyle />
      <MainPage />
    </SidebarProvider>
  );
}

export default App;
