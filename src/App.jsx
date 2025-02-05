import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import useTheme from "./hooks/useTheme";
import "./styles/app.css";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <AppRoutes />
         
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
