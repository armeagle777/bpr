import { useEffect, useMemo, useState } from "react";
import { PersonSearch, RestartAlt } from "@mui/icons-material";
import { Box, Button, Stack, TextField, Slide } from "@mui/material";
import { FocusTrap } from "@mui/base/FocusTrap";

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
  const [foxusOpen, setFoxusOpen] = useState(false);
  const onNameFocus = () => {
    setIsNameRowOpen(true);
    setTimeout(() => {
      setFoxusOpen(true);
    }, 300);
  };
  useEffect(() => {
    let timeoutId;
    if (filterProps.firstName.length === 0) {
      setIsNameRowOpen(false);
      timeoutId = setTimeout(() => {
        setFoxusOpen(false);
      }, 700);
    } else if (filterProps.firstName.length > 0 && !isNameRowOpen) {
      onNameFocus();
    }

    return () => clearTimeout(timeoutId);
  }, [filterProps.firstName]);

  const isResetBtnDisabled = useMemo(
    () => !Object.values(filterProps).filter((value) => !!value).length,
    [filterProps]
  );
  const isSearchBtnActive = useMemo(() => {
    const { ssn, lastName, firstName, documentNumber } = filterProps;
    return (
      (ssn && ssn.length === 10) ||
      !!documentNumber ||
      (!!firstName && !!lastName)
    );
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

        {!foxusOpen && (
          <FocusTrap disableEnforceFocus open>
            <>
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
            </>
          </FocusTrap>
        )}
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
