import { Drawer as AntDrawer } from "antd";

const Drawer = ({ open, children, title, onClose, loading }) => {
  return (
    <AntDrawer
      closable
      destroyOnClose
      title={title}
      placement="right"
      open={open}
      loading={loading}
      onClose={onClose}
    >
      {children}
    </AntDrawer>
  );
};

export default Drawer;
