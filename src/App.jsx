import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import useTheme from "./hooks/useTheme";
import "./styles/app.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
