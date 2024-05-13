import { Select } from "antd";

const FilterSelect = ({ onChange, options, selectedValues, placeholder }) => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{
        flex: 1,
      }}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
      value={selectedValues?.map((el) => +el) || []}
    />
  );
};

export default FilterSelect;
