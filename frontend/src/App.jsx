import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div>Register Loading....</div>}>
                <route.component />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
