import { Tabs } from "antd";
import { DealsContainer } from "./DealsContainer";
import { EATMPersons } from "./EATMPersons";
import { EATMFams } from "./EATMFams";
import { JKK } from "./JKK";
import { Volunteer } from "./Volunteer";
import translations from "../../utils/translations/am.json";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import {
  STATISTICS_FILTERS,
  STATISTICS_TYPE_MAPS,
} from "../../utils/constants";
import { useEffect } from "react";
import { WP_TYPE_MAPS } from "./WorkPermitStats.constants";

const WorkPermitStats = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    filters,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "WP_SIMPLE" });
  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.B_CROSS_TOTAL,
  };
  const { PAGE_TITLES } = translations;
  const initialTab = WP_TYPE_MAPS.VOLUNTEER;
  console.log("data", data);
  useEffect(() => {
    handleFilterChange({
      name: STATISTICS_FILTERS.WP_TYPE,
      value: initialTab,
    });
  }, []);

  const tabItems = {
    [WP_TYPE_MAPS.EAEU_EMP]: {
      key: 1,
      label: "1.1 ԵԱՏՄ քաղաքացիներ",
      children: (
        <DealsContainer
          title={PAGE_TITLES.EATM_PERSONS}
          filters={filters}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        >
          <EATMPersons data={data} isLoading={isFetching} />
        </DealsContainer>
      ),
    },
    [WP_TYPE_MAPS.EAEU_EMP_FAM]: {
      key: 2,
      label: "1.2 ԵԱՏՄ ընտանիքներ",
      children: (
        <DealsContainer
          title={PAGE_TITLES.EATM_FAMS}
          filters={filters}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        >
          <EATMFams data={data} isLoading={isFetching} />
        </DealsContainer>
      ),
    },
    [WP_TYPE_MAPS.WP]: {
      key: 3,
      label: "1.3 ԺԿԿ",
      children: (
        <DealsContainer
          title={PAGE_TITLES.JKK}
          filters={filters}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        >
          <JKK data={data} isLoading={isFetching} />
        </DealsContainer>
      ),
    },
    [WP_TYPE_MAPS.VOLUNTEER]: {
      label: "1.4 Կամավոր",
      key: 4,
      children: (
        <DealsContainer
          title={PAGE_TITLES.VOLUNTEER}
          filters={filters}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        >
          <Volunteer data={data} isLoading={isFetching} />
        </DealsContainer>
      ),
    },
  };

  const tabChangeHandler = (key) => {
    const newTabItem = Object.keys(tabItems).find(
      (item) => tabItems[item].key === key
    );

    handleFilterChange({
      name: STATISTICS_FILTERS.WP_TYPE,
      value: newTabItem,
    });
  };

  return (
    <Tabs
      defaultActiveKey={tabItems[initialTab].key}
      tabPosition="left"
      style={{
        height: 200,
      }}
      items={Object.values(tabItems)}
      onChange={tabChangeHandler}
    />
  );
};

export default WorkPermitStats;
