import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import useTheme from "./hooks/useTheme";
import "./App.css";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
