// import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import { Table, TableColumnsType, Tooltip } from "antd";

type Props = {
  items: any;
  hasPagination?: boolean;
  customPagination?: boolean;
  isLoading?: boolean;
  rowKey?: string;
  hasDelete?: boolean;
  hasEdit?: boolean;
  hasView?: boolean;
  editAction?: (data: object) => void;
  deleteAction?: (data: object) => void;
  viewAction?: (data: object) => void;
  columns: TableColumnsType<any>;
};

const table = ({
  items,
  isLoading,
  columns,
  hasPagination = true,
  hasEdit = false,
  hasDelete = false,
  hasView = false,
  editAction = () => null,
  deleteAction = () => null,
  rowKey = "id",
}: Props) => {
  const newColumns: TableColumnsType<any> =
    hasDelete || hasView || hasDelete || hasEdit
      ? [
          ...columns,
          {
            title: "Действия",
            dataIndex: "actions",
            key: "actions",
            className: "w-[100px]",
            render: (_, item) => {
              return (
                <div className="flex justify-center gap-4">
                  {hasEdit ? (
                    <Tooltip title="Редактировать">
                      <div
                        className="cursor-pointer text-sky-500"
                        onClick={() => editAction(item)}
                      >
                        {/* <EditOutlined /> */}
                        edit
                      </div>
                    </Tooltip>
                  ) : null}
                  {hasDelete ? (
                    <Tooltip title="Удалить">
                      <div
                        className="text-red-500 cursor-pointer "
                        onClick={() => deleteAction(item)}
                      >
                        {/* <DeleteOutlined /> */}
                        delete
                      </div>
                    </Tooltip>
                  ) : null}
                </div>
              );
            },
          },
        ]
      : columns;

  return (
    <>
      <Table
        columns={newColumns}
        rowKey={rowKey}
        dataSource={items}
        loading={isLoading}
      />
    </>
  );
};

export default table;
