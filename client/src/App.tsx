import './App.css'
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { UserContextProvider } from "./context/UserContext";
import routes from "./routes";
import { LoadingIndicator } from './custom_hooks/useAuthCheck';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingIndicator />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
