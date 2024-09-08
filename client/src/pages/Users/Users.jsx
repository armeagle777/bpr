import useUsersData from "../../hooks/useUsersData";
import { Alert, Box, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import EditableCell from "./EditableCell/EditableCell";

import { Form, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import NewUserForm from "./NewUserForm/NewUserForm";
import { checkEmail } from "../../api/personsApi";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: usersData,
    error,
    isError,
    isLoading,
    editUserMutation,
    createUserMutation,
  } = useUsersData();

  const [newUserForm] = Form.useForm();

  const checkEmailInBackend = async (email) => {
    try {
      const response = await checkEmail(email);
      if (response.isValid) {
        return Promise.resolve();
      }
      return Promise.reject("Այս էլ. փոստն արդեն գրանցված է");
    } catch (error) {
      return Promise.reject("Սերվերի հետ կապի խնդիր");
    }
  };

  const onFinish = (values) => {
    createUserMutation.mutate(values);
    newUserForm.resetFields();
    setIsModalOpen(false);
  };

  const modifiedUsers = usersData?.users?.map((user) => ({
    ...user,
    password: "",
    key: user.id.toString(),
  }));

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  if (isError) return <Alert severity="error">{error}</Alert>;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = modifiedUsers.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = modifiedUsers[index];
        const newItem = { ...item, ...row };
        editUserMutation.mutate({ id: item.id, data: newItem });
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Անուն",
      dataIndex: "firstName",
      editable: true,
      required: true,
    },
    {
      title: "Ազգանուն",
      dataIndex: "lastName",
      editable: true,
      required: true,
    },
    {
      title: "Էլ. փոստ",
      dataIndex: "email",
      editable: true,
      required: true,
    },
    {
      title: "Հեռ.",
      dataIndex: "phoneNumber",
      editable: true,
      regex: /^0\d{8}$/,
      placeholder: "0xxaabbcc",
    },
    {
      title: "Գաղտնաբառ",
      dataIndex: "password",
      editable: true,
    },
    {
      title: "...",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Պահպանել
            </Typography.Link>
            <Popconfirm title="Համոզվածե՞ք" onConfirm={cancel}>
              <a>Չեղարկել</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Խմբագրել
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        required: col.required,
        editing: isEditing(record),
        ...(col.regex && { regex: col.regex }),
        ...(col.placeholder && { placeholder: col.placeholder }),
      }),
    };
  });

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
          dataSource={modifiedUsers}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <h3
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Ավելացնել նոր օգտատեր
        </h3>
        <hr
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: 20,
          }}
        />
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
