import { Button, Spin, notification } from "antd";
import { Fields } from "components";
import { FastField, Form, Formik } from "formik";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useStore } from "store";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});
const Auth = () => {
  const { mutate, isLoading } = usePost();
  const { signIn } = useStore(state => state);
  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-white">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Login
              </h1>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={value => {
                  mutate(
                    {
                      url: "/auth/login",
                      data: value,
                      method: "post",
                    },
                    {
                      onSuccess: data => {
                        signIn({ data: "", token: get(data, "authToken") });
                        window.localStorage.setItem(
                          "token",
                          get(data, "authToken", "")
                        );
                      },
                      onError: error => {
                        notification.error({
                          message: "Что-то пошло не так",
                        });
                      },
                    }
                  );
                }}
              >
                {({ values, handleSubmit }) => {
                  return (
                    <Spin spinning={isLoading}>
                      <Form className="space-y-4 md:space-y-6">
                        <FastField
                          label="Email"
                          component={Fields.Input}
                          name="email"
                          rootClassName="mb-2"
                        />
                        <FastField
                          label="Password"
                          component={Fields.Input}
                          name="password"
                          rootClassName="mb-2"
                        />

                        <div className="flex justify-end gap-3 mt-5">
                          <Button type="primary" size="large" htmlType="submit">
                            Confirm
                          </Button>
                        </div>
                      </Form>
                    </Spin>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
