import { useEffect, useMemo, useState } from "react";
import { PersonSearch, RestartAlt } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";

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
  const [isNameRowOpen, setIsNameRowOpen] = useState(
    !!filterProps.firstName.length
  );

  const onNameFocus = () => {
    setIsNameRowOpen(true);
  };

  const onNameBlur = () => {
    if (!filterProps.firstName.length) {
      setIsNameRowOpen(false);
    }
  };

  useEffect(() => {
    if (filterProps.firstName.length === 0) {
      setIsNameRowOpen(false);
    } else if (filterProps.firstName.length > 0 && !isNameRowOpen) {
      setIsNameRowOpen(true);
    }
  }, [filterProps.firstName]);

  const {
    ssnDisabled,
    nameDisabled,
    docnumDisabled,
    isSearchBtnActive,
    isResetBtnDisabled,
  } = useMemo(() => {
    const { ssn, lastName, firstName, documentNumber } = filterProps;

    const isResetBtnDisabled = !Object.values(filterProps).filter(
      (value) => !!value
    ).length;

    const isSearchBtnActive =
      (ssn && ssn.length === 10) ||
      (!!documentNumber && documentNumber.length >= 8) ||
      (!!firstName && !!lastName);

    const nameDisabled = !!ssn || !!documentNumber;
    const docnumDisabled = !!firstName || !!ssn;
    const ssnDisabled = !!firstName || !!documentNumber;

    return {
      ssnDisabled,
      nameDisabled,
      docnumDisabled,
      isSearchBtnActive,
      isResetBtnDisabled,
    };
  }, [filterProps]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFilterProps({ ...filterProps, [name]: value.trim().toUpperCase() });
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
          onFocus={onNameFocus}
          onBlur={onNameBlur}
          disabled={nameDisabled}
        />

        <Box
          sx={{
            width: isNameRowOpen ? "540px" : 0,
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
            transition: "width 1.3s ease-in-out",
          }}
        >
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
        </Box>

        <TextField
          type="search"
          label="Անձնագիր"
          id="documentNumber"
          name="documentNumber"
          onChange={onInputChange}
          value={filterProps.documentNumber}
          disabled={docnumDisabled}
        />
        <TextField
          id="ssn"
          name="ssn"
          label="ՀԾՀ"
          type="search"
          value={filterProps.ssn}
          onChange={onInputChange}
          disabled={ssnDisabled}
        />
        <Button
          size="large"
          sx={{ py: 2 }}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={!isSearchBtnActive}
        >
          <PersonSearch />
        </Button>
        <Button
          size="large"
          sx={{ py: 2, ml: 1 }}
          color="error"
          title="Մաքրել"
          variant="contained"
          disabled={isResetBtnDisabled}
          onClick={handleClearButton}
        >
          <RestartAlt />
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchHeader;
