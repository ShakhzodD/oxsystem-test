import { Layout } from "components";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { useStore } from "store";
import { get } from "lodash";

const Login = lazy(() => import("pages/auth"));
const Users = lazy(() => import("pages/users"));
const Books = lazy(() => import("pages/books"));
const BooksCreate = lazy(() => import("pages/books/create"));
const BooksUpdate = lazy(() => import("pages/books/update"));
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
                  <Users />
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
