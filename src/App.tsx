import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rootRoutes } from "./pages/AppRouter";
import { RouterProvider } from "react-router-dom";
import { CurrentUserContextProvider } from "./hooks/CurrentUserContext";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CurrentUserContextProvider>
          <RouterProvider router={rootRoutes} />
        </CurrentUserContextProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
};

export default App;
