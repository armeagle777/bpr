export const MOCK_DATA = [
  {
    country: "Ռուսաստան",
    land_in: 332,
    land_out: 933,
    land_net: 1265,
    air_in: 139,
    air_out: 683,
    air_net: 822,
    rail_in: 0,
    rail_out: 7,
    rail_net: 7,
    total_in: 472,
    total_out: 1625,
    total_net: 2097,
  },
  {
    country: "Ղազախստան",
    land_in: 2,
    land_out: 7,
    land_net: 9,
    air_in: 3,
    air_out: 4,
    air_net: 7,
    rail_in: 0,
    rail_out: 0,
    rail_net: 0,
    total_in: 5,
    total_out: 11,
    total_net: 16,
  },
  {
    country: "Բելառուս",
    land_in: 12,
    land_out: 11,
    land_net: 23,
    air_in: 6,
    air_out: 11,
    air_net: 17,
    rail_in: 0,
    rail_out: 0,
    rail_net: 0,
    total_in: 18,
    total_out: 22,
    total_net: 40,
  },
];

export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "country",
    key: "name",
    width: 200,
    fixed: "left",
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
    title: "Railway",
    children: [
      {
        title: "In",
        dataIndex: "rail_in",
        key: "rail_in",
        width: 150,
      },
      {
        title: "Out",
        dataIndex: "rail_out",
        key: "rail_out",
        width: 150,
      },
      {
        title: "Net",
        dataIndex: "rail_net",
        key: "rail_net",
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
