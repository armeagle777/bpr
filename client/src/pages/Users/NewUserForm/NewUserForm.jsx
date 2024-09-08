import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { Button, Form, Input } from "antd";

const NewUserForm = ({
  form,
  checkEmailInBackend,
  onFinish,
  onCancel,
  isLoading,
}) => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 24,
    },
  };
  return (
    <Form {...layout} form={form} name="new_user" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        label="Անուն"
        rules={[{ required: true, message: "Անվան դաշտը պարտադիր է" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Անուն" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Ազգանուն"
        rules={[{ required: true, message: "Ազգանվան դաշտը պարտադիր է" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Ազգանուն" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Հեռ."
        validateTrigger="onBlur"
        rules={[
          {
            pattern: /^0\d{8}$/,
            message: "Խնդրում ենք մուտքագրել ճիշտ ֆորմատով՝ 0XXaabbcc",
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Հեռ. 0XXaabbcc"
          autocomplete="off"
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="email"
        label="Էլ. փոստ"
        validateFirst
        rules={[
          { required: true, message: "Էլ. փոստը պարտադիր է" },
          { type: "email", message: "Խնդրում ենք մուտքագրել վավեր Էլ. փոստ" },
          {
            validator: async (_, email) => {
              if (email) {
                return checkEmailInBackend(email);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Էլ. փոստ"
          autocomplete="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Գաղտնաբառ"
        rules={[{ required: true, message: "Գաղտնաբառը պարտադիր է" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Գաղտնաբառ"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 4,
        }}
        shouldUpdate
      >
        {() => (
          <>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                !form.isFieldsTouched(false) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Գրանցել
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              style={{ marginLeft: "10px" }}
              onClick={onCancel}
            >
              Փակել
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default NewUserForm;
