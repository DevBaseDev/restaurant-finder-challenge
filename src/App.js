import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from "./pages/Home";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Copyright from "./components/Copyright";

const RequireLoggedInUser = ({ children }) => {
  const app = useRealmApp();

  useEffect(() => {
    if (!app.currentUser) {
      app.logIn();
    }
  }, [app]);

  return app.currentUser ? children : <Loading />;
};

const theme = createTheme();

function App() {
  return (
    <RealmAppProvider appId={process.env.REACT_APP_CLIENT_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <ThemeProvider theme={theme}>
            <NavBar />            
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </ThemeProvider>
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
