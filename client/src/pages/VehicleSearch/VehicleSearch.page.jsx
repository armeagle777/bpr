import { Container } from "@mui/material";

import { Header, Body } from "./components";
import useVehicleSearch from "../../hooks/useVehicleSearch";

const VehicleSearch = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
    SEARCH_BASES,
    searchBase,
    handleBaseChange,
  } = useVehicleSearch();

  return (
    <Container>
      <Header
        isFetching={isFetching}
        certNumberInput={certNumberInput}
        setCertNumberInput={setCertNumberInput}
        handleSubmitSearch={handleSubmitSearch}
        SEARCH_BASES={SEARCH_BASES}
        searchBase={searchBase}
        handleBaseChange={handleBaseChange}
      />
      <Body
        data={data}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </Container>
  );
};

export default VehicleSearch;
