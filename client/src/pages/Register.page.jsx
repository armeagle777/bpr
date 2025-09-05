import { Container } from "@mui/material";

import RegisterHead from "../components/register/RegisterHead";
import RegisterBody from "../components/register/RegisterBody";
import useCompaniesData from "../hooks/useCompaniesData";

const Register = () => {
  const {
    data,
    isFetching,
    isError,
    error,
    taxIdInputValue,
    setTaxIdInputValue,
    handleSubmitSearch,
  } = useCompaniesData();

  return (
    <Container>
      <RegisterHead
        taxIdInputValue={taxIdInputValue}
        setTaxIdInputValue={setTaxIdInputValue}
      />
      <RegisterBody
        data={data}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </Container>
  );
};

export default Register;
