import { Avatar, Dropdown, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;

export interface IMenu {
  label: string;
  key: string;
  icon?: JSX.Element;
  children?: IMenu[] | undefined;
}

const menu: IMenu[] = [
  {
    key: "/",
    label: "Users",
  },
  {
    key: "/books",
    label: "Books",
  },
];

const LayoutComponents = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Layout>
        <Sider
          //   className="h-[100%] overflow-auto sidebar rounded-l-2xl [&_.ant-layout-sider-trigger]:rounded-bl-2xl"
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <Menu
            className="pt-3"
            theme="dark"
            defaultSelectedKeys={["/"]}
            defaultActiveFirst={true}
            // items={helpers.getAccess(get(data, "data.user.role"), menu)}
            items={menu}
            onClick={value => {
              if (location.pathname !== value.key) {
                navigate(value.key);
              }
            }}
          />
        </Sider>
        <Layout className="site-layout z-10 rounded-r-2xl bg-[#f1f5f8]">
          <Content className="overflow-x-hidden h-[100vh] p-6">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponents;
