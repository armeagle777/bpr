import { Container } from "@mui/material";

import { Header, Body } from "./components";
import useKadastreCerts from "../../hooks/useKadastrCerts";

const KadastrCertificate = () => {
  const {
    data,
    error,
    isError,
    SEARCH_BASES,
    searchBase,
    isFetching,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
    handleBaseChange,
  } = useKadastreCerts();
  return (
    <Container>
      <Header
        SEARCH_BASES={SEARCH_BASES}
        searchBase={searchBase}
        isFetching={isFetching}
        certNumberInput={certNumberInput}
        setCertNumberInput={setCertNumberInput}
        handleSubmitSearch={handleSubmitSearch}
        handleBaseChange={handleBaseChange}
      />
      <Body
        data={data}
        error={error}
        isError={isError}
        isFetching={isFetching}
      />
    </Container>
  );
};

export default KadastrCertificate;
