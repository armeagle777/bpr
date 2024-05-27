import { useEffect, useState } from "react";
import { Flex } from "antd";

import { FilterRow } from "../FilterRow";
import { FiltersRowSkeleton } from "../../../statisticsComponents";

const DealsContainer = ({ children, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Flex vertical>
      <p
        style={{
          fontStyle: "italic",
          color: "#314056",
          fontWeight: "bold",
          fontSize: "1.05em",
          marginBottom: 5,
        }}
      >
        {title}
      </p>
      {isLoading ? <FiltersRowSkeleton /> : <FilterRow />}
      {children}
    </Flex>
  );
};

export default DealsContainer;
