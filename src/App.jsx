import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import useTheme from "./hooks/useTheme";
import "./styles/app.css";
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser, logout } from "./redux/authSlice";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      console.log("🔥 Checking Auth State...");
      console.log("🔍 User from Firebase Auth:", user);

      if (user) {
        console.log("✅ User is logged in:", user.email);
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        console.log("❌ No user logged in.");
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return null;
}

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthListener />
        <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
