import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";

const SpeedDialButton = ({ onLikeToggle, uid, text, onShareClick }) => {
  const actions = [
    {
      icon: <SaveIcon />,
      name: "Պահպանել",
      onClick: () => onLikeToggle({ uid, text }),
    },
    { icon: <ShareIcon />, name: "Կիսվել", onClick: onShareClick },
  ];
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 90, right: 100 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialButton;
