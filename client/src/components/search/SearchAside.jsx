import { useState, useMemo } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { parse, differenceInYears } from "date-fns";

import Checkbox from "../checkbox/Checkbox";
import { filterDefaultObj } from "../../utils/constants";

const minDistance = 10;

const SearchAside = ({ showExtended, persons }) => {
  const [value, setValue] = useState([20, 37]);
  console.log(persons);
  const filterCounts = persons.reduce((acc, el) => {
    //Gender
    if (el.documents.find((doc) => doc.Person?.Genus === "M")) {
      acc.gender.maleCount++;
    } else if (el.documents.find((doc) => doc.Person?.Genus === "F")) {
      acc.gender.femaleCount++;
    }

    //Age
    const birthDate = el.documents.find((doc) => doc.Person.Birth_Date)?.Person
      .Birth_Date;
    const date = parse(birthDate, "dd/MM/yyyy", new Date());
    const age = differenceInYears(new Date(), date);

    if (acc.age[age] === undefined) {
      acc.age[age] = 1;
    } else {
      acc.age[age]++;
    }

    //Region

    return acc;
  }, JSON.parse(JSON.stringify(filterDefaultObj)));

  const {
    gender: { maleCount, femaleCount },
    age,
  } = { ...filterCounts };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const valuetext = (value) => {
    return `${value}°C`;
  };

  return (
    <Stack sx={{ width: "15%" }}>
      {showExtended && (
        <>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Տարիքը</Typography>
            <Slider
              getAriaLabel={() => "Age range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Սեռը</Typography>
            <FormGroup>
              <Checkbox label={`Արական (${maleCount})`} />
              <Checkbox label={`Իգական (${femaleCount})`} />
            </FormGroup>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Մարզ</Typography>
            <FormGroup>
              <Checkbox label="Երևան" />
              <Checkbox label="Արագածոտն" />
              <Checkbox label="Արարատ" />
              <Checkbox label="Արմավիր" />
              <Checkbox label="Գեղարքունիք" />
              <Checkbox label="Կոտայք" />
              <Checkbox label="Լոռի" />
              <Checkbox label="Շիրակ" />
              <Checkbox label="Սյունիք" />
              <Checkbox label="Տավուշ" />
              <Checkbox label="Վայոց ձոր" />
              <Checkbox label="Անհայտ" />
            </FormGroup>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default SearchAside;
