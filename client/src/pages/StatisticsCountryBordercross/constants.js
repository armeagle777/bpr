export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "country",
    key: "country",
    width: 200,
    fixed: "left",
  },
  {
    title: "Air",
    children: [
      {
        title: "In",
        dataIndex: "air_in",
        key: "air_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "air_out",
        key: "air_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "air_net",
        key: "air_net",
        width: 150,
      },
    ],
  },
  {
    title: "Land",
    children: [
      {
        title: "In",
        dataIndex: "land_in",
        key: "land_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "land_out",
        key: "land_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "land_net",
        key: "land_net",
        width: 150,
      },
    ],
  },
  {
    title: "Railway",
    children: [
      {
        title: "In",
        dataIndex: "railway_in",
        key: "railway_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "railway_out",
        key: "railway_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "railway_net",
        key: "railway_net",
        width: 150,
      },
    ],
  },
  {
    title: "Total",
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
