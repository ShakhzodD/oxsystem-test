import { Table } from "components";
import useGetAll from "hooks/useGetAll";
import { Modal, Button, notification } from "antd";
import { useState } from "react";
// import FormComponent from "./form";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const Books = () => {
  const navigate = useNavigate();
  const { mutate } = usePost();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAll({
    url: "/books",
    name: "books",
  });

  const deleteAction = (id: number) => {
    Modal.confirm({
      title: "Вы действительно хотите удалить?",
      content: "",
      okText: "Да",
      cancelText: "Нет",
      onOk: () => {
        mutate(
          {
            url: `/books/${id}`,
            data: null,
            method: "delete",
          },
          {
            onSuccess: () => {
              notification.success({
                message: "Успешно удалена",
              });
              queryClient.invalidateQueries({ queryKey: ["userlavin"] });
            },
            onError: error => {
              notification.error({
                message: get(error, "message")
                  ? get(error, "message")
                  : "Что-то пошло не так",
              });
            },
          }
        );
      },
    });
  };
  return (
    <div>
      {/* <Modal
        className="file-manager"
        open={modal.create || modal.update}
        onCancel={() => {
          setModal({ create: false, data: null, update: false });
        }}
        closable={true}
        footer={false}
        destroyOnClose
        title={modal.create ? "Create user" : "Update user"}
      >
        <FormComponent {...{ modal, setModal }} />
      </Modal> */}

      <div className="flex justify-between items-center mb-5">
        <h2>Books list</h2>
        <Button
          htmlType="button"
          type="primary"
          onClick={() => {
            navigate("/books/create");
            // setModal({ create: true, data: null, update: false });
          }}
        >
          Create
        </Button>
      </div>
      <Table
        hasEdit={true}
        isLoading={isLoading}
        hasDelete={true}
        deleteAction={(value: { id?: number }) => {
          deleteAction(get(value, "id", 0));
        }}
        editAction={value => {
          navigate(`/books/update/${get(value, "id", 0)}`);
          // setModal({ create: false, data: value, update: true });
        }}
        items={data || []}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            render: value => {
              return value && value;
            },
          },
          {
            title: "Author",
            dataIndex: "author",
            render: value => {
              return value && value;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
            render: value => {
              return value && value;
            },
          },
          {
            title: "Cover",
            dataIndex: "cover",
            render: value => {
              return value && value;
            },
          },
          {
            title: "Pages",
            dataIndex: "pages",
            render: value => {
              return value && value;
            },
          },
          {
            title: "Published",
            dataIndex: "published",
            render: value => {
              return value && value;
            },
          },
        ]}
      />
    </div>
  );
};

export default Books;
