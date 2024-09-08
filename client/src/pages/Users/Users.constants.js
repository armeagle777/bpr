export const usersColumns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 200,
  },
  {
    title: "Անուն",
    dataIndex: "firstName",
    key: "firstName",
    width: 200,
  },
  {
    title: "Ազգանուն",
    dataIndex: "lastName",
    key: "lastName",
    width: 200,
  },
  {
    title: "Էլ. փոստ",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "Հեռ.",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 200,
  },
  {
    title: "Խմբագրվել է",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
  },
  {
    title: "operation",
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
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
        >
          Edit
        </Typography.Link>
      );
    },
  },
];
