import { Form, Input, InputNumber } from "antd";

const EditableCell = ({
  index,
  title,
  regex,
  record,
  editing,
  required,
  children,
  inputType,
  dataIndex,
  placeholder,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : (
      <Input placeholder={placeholder || ""} />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`,
            },
            ...(regex
              ? [
                  {
                    pattern: new RegExp(regex),
                    message: `Please enter a valid ${title}!`,
                  },
                ]
              : []),
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
