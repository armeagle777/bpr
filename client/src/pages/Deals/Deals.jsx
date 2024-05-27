import React from "react";
import { Tabs } from "antd";
import { DealsContainer } from "./DealsContainer";
import { EATMPersons } from "./EATMPersons";
import { EATMFams } from "./EATMFams";
import { JKK } from "./JKK";
import translations from "../../utils/translations/am.json";

const Deals = () => {
  const { PAGE_TITLES } = translations;
  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="left"
      style={{
        height: 220,
      }}
      items={[
        {
          label: "1.1 ԵԱՏՄ քաղաքացիներ",
          key: 1,
          children: (
            <DealsContainer title={PAGE_TITLES.EATM_PERSONS}>
              <EATMPersons />
            </DealsContainer>
          ),
        },
        {
          label: "1.2 ԵԱՏՄ ընտանիքներ",
          key: 2,
          children: (
            <DealsContainer title={PAGE_TITLES.EATM_FAMS}>
              <EATMFams />
            </DealsContainer>
          ),
        },
        {
          label: "1.3 ԺԿԿ",
          key: 3,
          children: (
            <DealsContainer title={PAGE_TITLES.JKK}>
              <JKK />
            </DealsContainer>
          ),
        },
      ]}
    />
  );
};

export default Deals;
