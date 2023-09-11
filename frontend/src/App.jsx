import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";
import ProtectedRoute from "./components/Protected-Route/ProtectedRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          if (!route.childern)
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>
                      {" "}
                      <Suspense
                        fallback={<div>{route.name} is Loading...</div>}
                      >
                        <route.component />
                      </Suspense>{" "}
                    </ProtectedRoute>
                  ) : (
                    <Suspense fallback={<div>{route.name} is Loading...</div>}>
                      <route.component />
                    </Suspense>
                  )
                }
              />
            );

          if (route.childern) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    {" "}
                    <Suspense fallback={<div>{route.name} is Loading...</div>}>
                      <route.component />
                    </Suspense>{" "}
                  </ProtectedRoute>
                }
              >
                {route.childern.map((child) => (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={
                      <ProtectedRoute>
                        {" "}
                        <Suspense
                          fallback={<div>{child.name} is Loading...</div>}
                        >
                          <child.component />
                        </Suspense>{" "}
                      </ProtectedRoute>
                    }
                  />
                ))}
              </Route>
            );
          }
        })}
      </Routes>
    </Router>
  );
};

export default App;
