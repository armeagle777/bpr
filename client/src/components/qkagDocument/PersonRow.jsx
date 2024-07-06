import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { qkagDocumentTypes } from "../../utils/constants";
import { formatDates } from "../../utils/helperFunctions";
import useFetchPerson from "../../hooks/useFetchPerson";
import { Skeleton } from "@mui/material";

const PersonRow = ({ role, person, targetSsn, type, presenter, med }) => {
  const {
    psn,
    id_type,
    id_number,
    citizenship,
    id_department,
    id_issue_date,
    id_expirey_date,
    new_last_name,
    base_info,
    resident,
  } = { ...person };
  const { country, region, community, street, house_type, house } = {
    ...resident,
  };
  const { name, last_name, fathers_name, birth_date } = { ...base_info };

  const { data: bprData, isLoading, isError, error } = useFetchPerson(psn);
  const imageUrl = bprData?.documents?.find((doc) => doc.Photo_ID)?.Photo_ID;

  const navigate = useNavigate();

  const handleRowClick = () => {
    if (psn !== targetSsn) {
      navigate(`/bpr/${psn}`);
    }
  };

  return (
    <ListItemButton
      onClick={handleRowClick}
      sx={{ pl: 4, cursor: psn === targetSsn ? "default" : "pointer" }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt={`${name} ${last_name} ${
                new_last_name ? ` (${new_last_name})` : ""
              }`}
              src={
                imageUrl
                  ? `data:image/jpeg;base64,${imageUrl}`
                  : `../src/assets/${role}.png`
              }
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={`${last_name} ${name}${
            fathers_name ? ` ${fathers_name}` : ""
          }`}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {id_type ? `${qkagDocumentTypes[id_type]} ։` : ""}
              </Typography>
              {id_number
                ? `${id_number} ${id_department} ${formatDates(
                    id_issue_date
                  )} ; `
                : ""}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Հասցե։
              </Typography>
              {` ${country || ""} ${
                region === community
                  ? region || ""
                  : `${region || ""}, ${community || ""}`
              } ${street || ""} ${house_type || ""} ${house || ""}`}
              {type === "death" && (
                <>
                  <br />
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ներկայացուցիչ:
                  </Typography>{" "}
                  {presenter.base_info.last_name || ""}{" "}
                  {presenter.base_info.name || ""}{" "}
                  {presenter.base_info.fathers_name || ""}
                  <br />
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    մահվան ա/թ:
                  </Typography>{" "}
                  {med.death.date},{" "}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    մահվան վայր:
                  </Typography>{" "}
                  {med.death.place || ""} ,{" "}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    մահվան պատճառ:
                  </Typography>{" "}
                  {med.death.reason} ,{" "}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    գրանցող մարմին:
                  </Typography>{" "}
                  {med.institution_name}
                </>
              )}
            </>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};

export default PersonRow;
