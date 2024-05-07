import { Button, Dropdown, Flex } from "antd";

import { FaGripVertical } from "react-icons/fa";

import ExportExcelButton from "./ExportExcelButton";
import SkeletonSelect from "./SkeletonSelect";
import { useState } from "react";

const TableTitleRow = ({
  dropdownOptions,
  countries,
  cliamTypes,
  companies,
  isCountriesLoading,
  isCompaniesLoading,
  onFilterCountries,
  onFilterCompanies,
  countriesParams,
  companiesParams,
  years,
  reportTypes,
  periods,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const countriesOptions = countries?.map((c) => ({
    label: c.name_am,
    value: c.id,
    key: c.id,
  }));
  const companiesOptions = companies?.map((c) => ({
    label: c.company_title,
    value: c.company_id || c.companyId,
    key: c.company_id || c.companyId,
  }));

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setIsOpen(nextOpen);
    }
  };

  return (
    <Flex justify="space-between">
      <Flex style={{ width: "60%", gap: 10 }}>
        <SkeletonSelect
          selectedValues={countriesParams}
          isLoading={isCountriesLoading}
          onChange={onFilterCountries}
          options={reportTypes}
          placeholder="Ընտրեք հաշվետվության տեսակը "
        />
        <SkeletonSelect
          selectedValues={companiesParams}
          isLoading={isCompaniesLoading}
          onChange={onFilterCompanies}
          options={years}
          placeholder="Ընտրեք տարեթիվը"
        />
        <SkeletonSelect
          selectedValues={companiesParams}
          isLoading={isCompaniesLoading}
          onChange={onFilterCompanies}
          options={periods}
          placeholder="Ընտրեք ժ/հատվածը"
        />
        <SkeletonSelect
          selectedValues={companiesParams}
          isLoading={isCompaniesLoading}
          onChange={onFilterCompanies}
          options={cliamTypes}
          placeholder="Ընտրեք դիմումի տեսակը"
        />
      </Flex>
      <Flex>
        <Dropdown
          menu={{
            items: dropdownOptions,
          }}
          onOpenChange={handleOpenChange}
          placement="bottomRight"
          arrow
          open={isOpen}
        >
          <Button
            type="link"
            icon={<FaGripVertical />}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: 0,
              border: 0,
              color: "purple",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            COLUMNS
          </Button>
        </Dropdown>
        <ExportExcelButton />
      </Flex>
    </Flex>
  );
};

export default TableTitleRow;
