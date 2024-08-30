import { useState } from "react";
import { PersonSearch, RestartAlt } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const initialFilterProps = {
  ssn: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  patronomicName: "",
  documentNumber: "",
};

const SearchHeader = ({ setSearchParams, changePage }) => {
  const [filterProps, setFilterProps] = useState(initialFilterProps);
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFilterProps({ ...filterProps, [name]: value });
  };

  const handleClearButton = () => {
    setFilterProps(initialFilterProps);
    setSearchParams({});
    changePage(1);
  };

  const handleSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        alignItems: "center",
        pt: "20px",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "18ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Անուն"
          type="search"
          id="firstName"
          name="firstName"
          onChange={onInputChange}
          value={filterProps.firstName}
        />
        <TextField
          type="search"
          id="lastName"
          name="lastName"
          label="Ազգանուն"
          onChange={onInputChange}
          value={filterProps.lastName}
        />
        <TextField
          type="search"
          label="Հայրանուն"
          id="patronomicName"
          name="patronomicName"
          onChange={onInputChange}
          value={filterProps.patronomicName}
        />
        <TextField
          type="date"
          id="birthDate"
          name="birthDate"
          label="Ծննդ․ թիվ"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onInputChange}
          value={filterProps.birthDate}
        />
        <TextField
          type="search"
          label="Անձնագիր"
          id="documentNumber"
          name="documentNumber"
          onChange={onInputChange}
          value={filterProps.documentNumber}
        />
        <TextField
          id="ssn"
          name="ssn"
          label="ՀԾՀ"
          type="search"
          value={filterProps.ssn}
          onChange={onInputChange}
        />
        <Button
          size="large"
          sx={{ py: 2 }}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          <PersonSearch />
        </Button>
        <Button
          size="large"
          sx={{ py: 2, ml: 1 }}
          color="error"
          title="Մաքրել"
          variant="contained"
          onClick={handleClearButton}
        >
          <RestartAlt />
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchHeader;
