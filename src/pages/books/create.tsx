import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Spin, notification } from "antd";
import { Fields } from "components";
import { FastField, Formik } from "formik";
import usePost from "hooks/usePost";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Required"),
  cover: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  pages: Yup.string().required("Required"),
  published: Yup.string().required("Required"),
});
const Create = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePost();
  const navigate = useNavigate();
  return (
    <div>
      <h2>Books create</h2>
      <div className="bg-white p-3">
        <Formik
          initialValues={{
            author: "",
            title: "",
            cover: "",
            pages: "",
            published: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={value => {
            mutate(
              {
                url: "/books",
                data: value,
                method: "post",
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["books"] });
                  navigate("/books");
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
                <Form>
                  <FastField
                    label="Author"
                    component={Fields.Input}
                    name="author"
                    rootClassName="mb-2"
                  />
                  <FastField
                    label="Title"
                    component={Fields.Input}
                    name="title"
                    rootClassName="mb-2"
                  />
                  <FastField
                    label="Cover"
                    component={Fields.Input}
                    name="cover"
                    rootClassName="mb-2"
                  />
                  <FastField
                    label="Pages"
                    component={Fields.Input}
                    name="pages"
                    rootClassName="mb-2"
                  />
                  <FastField
                    label="Published"
                    component={Fields.Input}
                    name="published"
                    rootClassName="mb-2"
                  />
                  <div className="flex justify-end gap-3 mt-5">
                    <Button
                      htmlType="button"
                      onClick={() => {
                        navigate("/books");
                      }}
                    >
                      Cancel
                    </Button>
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
  );
};

export default Create;
