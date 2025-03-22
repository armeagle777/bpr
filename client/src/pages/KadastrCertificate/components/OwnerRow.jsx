import { List, ListItem, ListItemText, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

const OwnerRow = ({
  ssn,
  lastname,
  firstname,
  organization_name,
  tax_number,
}) => {
  const getPersonRow = ({ firstname, lastname, ssn }) => {
    return firstname + " " + lastname + ", ՀԾՀ - " + ssn;
  };

  const getCompanyRow = ({ organization_name, tax_number }) => {
    return organization_name + ", ՀՎՀՀ - " + tax_number;
  };

  const ownerRowText = ssn
    ? getPersonRow({ firstname, lastname, ssn })
    : organization_name
    ? getCompanyRow({ organization_name, tax_number })
    : "";
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <Typography
              variant="secondary"
              color="text.primary"
              sx={{ pl: 1 }}
              flexGrow={2}
            >
              {ownerRowText}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};

export default OwnerRow;
