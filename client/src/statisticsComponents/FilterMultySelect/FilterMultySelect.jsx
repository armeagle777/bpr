import { Select } from "antd";

const FilterMultySelect = ({ options, placeholder, onChange }) => {
  // options.push({
  //   label: `Long Label: ${value}`,
  //   value,
  // });
  const [value, setValue] = useState([]);

  return (
    <Select
      mode="multiple"
      style={{
        flex: 1,
      }}
      options={options}
      placeholder={placeholder}
      maxTagCount="responsive"
      value={value}
      onChange={onChange}
    />
  );
};

export default FilterMultySelect;
