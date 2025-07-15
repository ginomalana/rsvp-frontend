import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import HomePage from "./HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import EventFormPage from "./EventForm/EventFormPage";

const LoginPage = lazy(() => import("./LoginPage"));
const EventList = lazy(() => import("./EventList/EventList"));

export const rootRoutes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.EVENT.USER_EVENTS} />,
      },
      {
        path: ROUTES.EVENT.USER_EVENTS,
        element: (
          <HomePage>
            <EventList isPublic={false} />
          </HomePage>
        ),
      },
      {
        path: ROUTES.EVENT.EDIT_EVENT,
        element: (
          <HomePage>
            <EventFormPage />
          </HomePage>
        ),
      },
    ],
  },
  {
    path: ROUTES.EVENT.PUBLIC_EVENTS,
    element: (
      <HomePage>
        <EventList isPublic={true} />
      </HomePage>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
]);
