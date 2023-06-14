import { Input } from "antd";
import { Table } from "components";
import useGetAll from "hooks/useGetAll";
import { get } from "lodash";
import { useState } from "react";
const Books = () => {
  const { data, isLoading } = useGetAll({
    url: "/fruits",
    name: "fruits",
  });
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2>Fruits list</h2>
      </div>
      <div className="w-[400px] mb-5">
        <Input
          value={search}
          placeholder="Search"
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Table
        isLoading={isLoading}
        items={get(data, "items", []).filter((item: { title: string }) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )}
        columns={[
          {
            title: "id",
            dataIndex: "id",
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
            title: "Weight",
            dataIndex: "weight",
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
