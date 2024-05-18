export const MOCK_DATA = [
  {
    main_column: "2021",
    land_in: 332,
    land_out: 933,
    land_net: 1265,
    air_in: 139,
    air_out: 683,
    air_net: 822,
    total_in: 472,
    total_out: 1625,
    total_net: 2097,
  },
  {
    main_column: "2022 Q1",
    land_in: 2,
    land_out: 7,
    land_net: 9,
    air_in: 3,
    air_out: 4,
    air_net: 7,
    total_in: 5,
    total_out: 11,
    total_net: 16,
  },
  {
    main_column: "Land",
    land_in: 12,
    land_out: 11,
    land_net: 23,
    air_in: 6,
    air_out: 11,
    air_net: 17,
    total_in: 18,
    total_out: 22,
    total_net: 40,
  },
  {
    main_column: "Air",
    land_in: 12,
    land_out: 11,
    land_net: 23,
    air_in: 6,
    air_out: 11,
    air_net: 17,
    total_in: 18,
    total_out: 22,
    total_net: 40,
  },
  {
    main_column: "Railway",
    land_in: 12,
    land_out: 11,
    land_net: 23,
    air_in: 6,
    air_out: 11,
    air_net: 17,
    total_in: 18,
    total_out: 22,
    total_net: 40,
  },
  {
    main_column: "Zvartnots",
    land_in: 12,
    land_out: 11,
    land_net: 23,
    air_in: 6,
    air_out: 11,
    air_net: 17,
    total_in: 18,
    total_out: 22,
    total_net: 40,
  },
  {
    main_column: "Bavra",
    land_in: 12,
    land_out: 11,
    land_net: 23,
    air_in: 6,
    air_out: 11,
    air_net: 17,
    total_in: 18,
    total_out: 22,
    total_net: 40,
  },
];

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
    title: "Օտարերկրացիներ",
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
    title: "Ընդամենը",
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

export const MOCK_YEARS_OPTIONS = [
  {
    label: "2021",
    value: 2021,
  },
  {
    label: "2022",
    value: 2022,
  },
];

export const MOCK_PERIODS_OPTIONS = [
  {
    label: "1-in eramsyak",
    value: "Q1",
  },
  {
    label: "2-rd eramsyak",
    value: "Q2",
  },
];

export const MOCK_TYPES_OPTIONS = [
  {
    label: "Land",
    value: "land",
  },
  {
    label: "Air",
    value: "air",
  },
  {
    label: "Railway",
    value: "railway",
  },
];

export const MOCK_POINTS_OPTIONS = [
  {
    label: "Zvartnots",
    value: "Zvartnots",
  },
  {
    label: "Bavra",
    value: "Bavra",
  },
];
