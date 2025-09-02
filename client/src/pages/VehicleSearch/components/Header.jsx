import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/PersonSearch";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PinIcon from "@mui/icons-material/Pin";
import BuildIcon from "@mui/icons-material/Build";

import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const PLACEHOLDERS = {
  PLATE_NUMBER: "Հաշվառման համարանիշ",
  SSN: "ՀԾՀ / ՀՎՀՀ",
  VIN_CODE: "VIN",
  CERTIFICATE_NUMBER: "Վկայականի համաար",
};

const Header = ({
  isFetching,
  certNumberInput,
  setCertNumberInput,
  handleSubmitSearch,
  SEARCH_BASES,
  searchBase,
  handleBaseChange,
}) => {
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        alignItems: "center",
        pt: "20px",
        mb: 2,
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "24ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label={PLACEHOLDERS[searchBase] || "Հաշվառման համարանիշ"}
          type="search"
          value={certNumberInput}
          onChange={(e) => setCertNumberInput(e.target.value)}
          autoFocus
        />
        <LoadingButton
          onClick={() =>
            handleSubmitSearch(certNumberInput, SEARCH_BASES[searchBase])
          }
          variant="contained"
          size="large"
          color="primary"
          sx={{ py: 2 }}
          loading={isFetching}
        >
          <SearchIcon />
        </LoadingButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          exclusive
          size="large"
          color="primary"
          value={searchBase}
          aria-label="Search-base"
          onChange={handleBaseChange}
        >
          <Tooltip title="Որոնում ըստ հաշվառման համարանիշի">
            <ToggleButton value="PLATE_NUMBER">
              <PinIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ ՀԾՀ-ի/ՀՎՀՀ-ի">
            <ToggleButton value="SSN">
              <AccountBoxIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ VIN կոդի">
            <ToggleButton value="VIN_CODE">
              <BuildIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ հաշվառման վկայագրի">
            <ToggleButton value="CERTIFICATE_NUMBER">
              <DirectionsCarIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
};

export default Header;
