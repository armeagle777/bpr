import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CitizenshipTemplate from "../pdf-templates/CitizenshipTemplate";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TexekanqGenerator from "../TexekanqGenerator/TexekanqGenerator";
import { message } from "antd";

const DropdownWithCheckboxes = ({ personInfo, firstName, lastName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const user = useAuthUser();
  const handleClick = (event) => {
    if (!user.pashton) {
      return message.error("Օգտատիրոջ պաշտոնը բացակայում է");
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Ստանալ տեղեկանք
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disableRipple>
          <TexekanqGenerator
            PDFTemplate={CitizenshipTemplate}
            fileName={`bpr_${firstName}_${lastName}.pdf`}
            buttonText="Արտ"
            variant="contained"
            Icon={PictureAsPdfIcon}
            data={personInfo}
            user={user}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownWithCheckboxes;
