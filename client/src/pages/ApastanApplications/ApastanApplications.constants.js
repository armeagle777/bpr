export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "country",
    key: "name",
    width: 200,
    fixed: "left",
  },
  {
    title: "16-34 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "F_16",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_16",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_16",
        key: "total",
        width: 150,
      },
    ],
  },
  {
    title: "35-64 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "F_35",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_35",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_35",
        key: "total",
        width: 150,
      },
    ],
  },
  {
    title: "65-ից ավել",
    children: [
      {
        title: "Ի",
        dataIndex: "F_65",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_65",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_65",
        key: "total",
        width: 150,
      },
    ],
  },
  {
    title: "ԸՆԴԱՄԵՆԸ",
    children: [
      {
        title: "Ի",
        dataIndex: "F_T",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_T",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_T",
        key: "total",
        width: 150,
      },
    ],
  },
];

export const MOCK_YEARS = [
  {
    label: "2022",
    value: 2022,
    key: 2022,
  },
  {
    label: "2023",
    value: 2023,
    key: 2023,
  },
  {
    label: "2024",
    value: 2024,
    key: 2024,
  },
];

export const MOCK_PERIODS = [
  {
    label: "1-ին կիսամյակ",
    value: 1,
    key: 1,
  },
  {
    label: "2-րդ կիսամյակ",
    value: 2,
    key: 2,
  },
  {
    label: "տարեկան",
    value: 3,
    key: 3,
  },
  {
    label: "1-ին եռամսյակ",
    value: 4,
    key: 4,
  },
  {
    label: "2-րդ եռամսյակ",
    value: 5,
    key: 5,
  },
  {
    label: "3-րդ եռամսյակ",
    value: 6,
    key: 6,
  },
  {
    label: "4-րդ եռամսյակ",
    value: 7,
    key: 7,
  },
  {
    label: "9֊ամսյակ",
    value: 8,
    key: 8,
  },
  {
    label: "ամսական",
    value: 9,
    key: 9,
  },
];

export const MOCK_DATA = [
  {
    key: "Ռուսաստան",
    country: "Ռուսաստան",
    F_16: 332,
    M_16: 933,
    T_16: 1265,
    F_35: 139,
    M_35: 683,
    T_35: 822,
    F_65: 0,
    M_65: 7,
    T_65: 7,
    F_T: 472,
    M_T: 1625,
    T_T: 2097,
  },
  {
    key: "Ղազախստան",
    country: "Ղազախստան",
    F_16: 2,
    M_16: 7,
    T_16: 9,
    F_35: 3,
    M_35: 4,
    T_35: 7,
    F_65: 0,
    M_65: 0,
    T_65: 0,
    F_T: 5,
    M_T: 11,
    T_T: 16,
  },
  {
    key: "Բելառուս",
    country: "Բելառուս",
    F_16: 12,
    M_16: 11,
    T_16: 23,
    F_35: 6,
    M_35: 11,
    T_35: 17,
    F_65: 0,
    M_65: 0,
    T_65: 0,
    F_T: 18,
    M_T: 22,
    T_T: 40,
  },
];
