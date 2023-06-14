import { Spin } from "antd";
import { Layout } from "components";
import { get } from "lodash";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useStore } from "store";

const Login = lazy(() => import("pages/auth"));
const Fruits = lazy(() => import("pages/fruits"));
function App() {
  const { auth } = useStore();
  return (
    <>
      <Routes>
        {get(auth, "isAuthenticated") ? (
          <Route path="/" element={<Layout />}>
            <Route
              path={"/"}
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center mt-10">
                      <Spin spinning={true} />
                    </div>
                  }
                >
                  <Fruits />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center mt-10">
                      <Spin spinning={true} />
                    </div>
                  }
                >
                  <>NotFound</>
                </Suspense>
              }
            />
          </Route>
        ) : (
          <>
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center mt-10">
                      <Spin spinning={true} />
                    </div>
                  }
                >
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center mt-10">
                      <Spin spinning={true} />
                    </div>
                  }
                >
                  <>Not found</>
                </Suspense>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
