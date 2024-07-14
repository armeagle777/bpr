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

export const MOCK_REPORT_TYPES = [
  {
    label: "Ստացված դիմումներ",
    value: 1,
    key: 1,
  },
  {
    label: "Ընդունված որոշումներ",
    value: 2,
    key: 2,
  },
];

export const MOCK_CLAIM_TYPES = [
  {
    label: "Բոլորը",
    value: "all",
    key: 1,
  },
  {
    label: "Առաջնային",
    value: "status_claim",
    key: 2,
  },
  {
    label: "Երկարաձգում",
    value: "extension",
    key: 3,
  },
];

export const WP_TYPE_MAPS = {
  WP: "work_permit",
  VOLUNTEER: "volunteer",
  EAEU_EMP: "eaeu_employee",
  EAEU_EMP_FAM: "eaeu_employee_family",
};
