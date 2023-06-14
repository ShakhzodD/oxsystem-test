import React from "react";
import { Formik, FastField } from "formik";
import { Fields } from "components";
import * as Yup from "yup";
import { Button, Form, Spin } from "antd";
import usePost from "hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Email required"),
  key: Yup.string().required("Required"),
  secret: Yup.string().required("Required"),
});
const FormComponent = ({
  setModal,
  modal,
}: {
  setModal: (data: any) => any;
  modal: { create: boolean; data: any; update: boolean };
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePost();

  return (
    <div>
      <Formik
        initialValues={{
          name: modal.data?.name,
          email: modal.data?.email,
          key: modal.data?.key,
          secret: modal.data?.secret,
        }}
        validationSchema={SignupSchema}
        onSubmit={value => {
          mutate(
            {
              url: modal.create ? "/userlavin" : `/userlavin/${modal.data?.id}`,
              data: value,
              method: modal.create ? "post" : "put",
            },
            {
              onSuccess: () => {
                setModal({ create: false, update: false, data: null });
                queryClient.invalidateQueries({ queryKey: ["userlavin"] });
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
                  label="Name"
                  component={Fields.Input}
                  name="name"
                  rootClassName="mb-2"
                />
                <FastField
                  label="Email"
                  component={Fields.Input}
                  name="email"
                  rootClassName="mb-2"
                />
                <FastField
                  label="Key"
                  component={Fields.Input}
                  name="key"
                  rootClassName="mb-2"
                />
                <FastField
                  label="Secret"
                  component={Fields.Input}
                  name="secret"
                  rootClassName="mb-2"
                />
                <div className="flex justify-end gap-3 mt-5">
                  <Button
                    htmlType="button"
                    onClick={() => {
                      setModal({ create: false, update: false, data: null });
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
  );
};

export default FormComponent;
