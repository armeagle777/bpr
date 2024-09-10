import useUsersData from "../../hooks/useUsersData";
import { Alert, Box, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import EditableCell from "./EditableCell/EditableCell";

import { Form, Table } from "antd";
import Modal from "../../components/Modal/Modal";
import NewUserForm from "./NewUserForm/NewUserForm";
import ModalHeader from "./ModalHeader/ModalHeader";

const Users = () => {
  const {
    data: usersData,
    error,
    form,
    cancel,
    isError,
    onFinish,
    isLoading,
    isModalOpen,
    onModalOpen,
    newUserForm,
    onModalClose,
    mergedColumns,
    editUserMutation,
    createUserMutation,
    checkEmailInBackend,
  } = useUsersData();

  if (isError) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      sx={{
        padding: "30px 10px",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<PersonAdd />}
        sx={{ marginBottom: 2 }}
        onClick={onModalOpen}
      >
        Ավելացնել
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={usersData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalHeader />
        <NewUserForm
          form={newUserForm}
          onFinish={onFinish}
          checkEmailInBackend={checkEmailInBackend}
          onCancel={onModalClose}
          isLoading={createUserMutation.isLoading}
        />
      </Modal>
    </Box>
  );
};

export default Users;
