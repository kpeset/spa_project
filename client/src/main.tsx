// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import le context provider
import { AuthProvider } from "./services/AuthContext";

// Import the main app component
import App from "./App";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import ShelterDetails from "./pages/dashboard/ShelterDetails";
import Forbiden from "./pages/members/Forbiden";
import Members from "./pages/members/Members";

import {
  getAllAnimalsByShelter,
  getAllShelters,
  getAuthorization,
  getMembers,
  getSpecies,
} from "./services/requests";

import "./styles/app.css";
import "./styles/dashboard.css";
import "./styles/header.css";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAuthorization,
        errorElement: <Forbiden />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => ({
          authorization: await getAuthorization(),
          shelters: await getAllShelters(),
        }),
        errorElement: <Forbiden />,
      },
      {
        path: "/shelters/:id",
        element: <ShelterDetails />,
        loader: async ({ params }) => ({
          animals: await getAllAnimalsByShelter(String(params.id)),
          species: await getSpecies(),
        }),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/members",
        element: <Members />,
        loader: getMembers,
        errorElement: <Forbiden />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
