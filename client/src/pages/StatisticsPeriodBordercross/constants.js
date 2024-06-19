export const MOCK_COLUMNS = [
  {
    title: "...",
    dataIndex: "main_column",
    key: "main_column",
    width: 200,
    fixed: "left",
  },
  {
    title: "ՀՀ քաղաքացիներ",
    key: "ՀՀ քաղաքացիներ",
    children: [
      {
        title: "In",
        dataIndex: "arm_in",
        key: "arm_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "arm_out",
        key: "arm_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "arm_net",
        key: "arm_net",
        width: 150,
      },
    ],
  },
  {
    title: "Օտարերկրացիներ",
    key: "Օտարերկրացիներ",
    children: [
      {
        title: "In",
        dataIndex: "other_in",
        key: "other_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "other_out",
        key: "other_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "other_net",
        key: "other_net",
        width: 150,
      },
    ],
  },
  {
    title: "Ընդամենը",
    key: "Ընդամենը",
    children: [
      {
        title: "In",
        dataIndex: "total_in",
        key: "total_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "total_out",
        key: "total_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "total_net",
        key: "total_net",
        width: 150,
      },
    ],
  },
];
