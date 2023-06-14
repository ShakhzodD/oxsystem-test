import { useQueryClient } from "@tanstack/react-query";
import { Button, Spin, notification } from "antd";
import { Fields } from "components";
import { FastField, Form, Formik } from "formik";
import usePost from "hooks/usePost";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  _username: Yup.string().required("Required"),
  _password: Yup.string().required("Required"),
});
const Auth = () => {
  const { mutate, isLoading } = usePost();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-white">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>

              <Formik
                initialValues={{
                  _username: "user_task",
                  _password: "user_task",
                  _subdomain: "hello",
                }}
                // validationSchema={SignupSchema}
                onSubmit={value => {
                  mutate(
                    {
                      url: "/security/auth_check",
                      data: value,
                      method: "post",
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["books"] });
                        // navigate("/books");
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
                          label="Author"
                          component={Fields.Input}
                          name="_username"
                          rootClassName="mb-2"
                        />
                        <FastField
                          label="Title"
                          component={Fields.Input}
                          name="_password"
                          rootClassName="mb-2"
                        />

                        <div className="flex justify-end gap-3 mt-5">
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                              handleSubmit();
                            }}
                          >
                            Add
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
