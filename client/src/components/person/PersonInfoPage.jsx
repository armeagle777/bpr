import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BusinessIcon from "@mui/icons-material/Business";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CastleIcon from "@mui/icons-material/Castle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Grid,
  Stack,
  Tooltip,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PDFGenerator from "../PDFGenerator/PDFGenerator";
import BPR from "../pdf-templates/BPR";
import Documents from "../documents/Documents";
import Family from "../family/Family";
import Kadastr from "../Kadastr/Kadastr";
import BusinessTab from "../businessTab/BusinessTab";
import Finances from "../finances/Finances";
import PhotoSlider from "../photoSlider/PhotoSlider";
import SpeedDialButton from "../speedDial/SpeedDial";
import TabPanel from "../tabPanel/TabPanel";
import PersonalInfoRow from "./PersonalInfoRow";

import {
  filterImageSrcs,
  formatCountryName,
  formatPersonData,
  isPersonJpk,
  userHasPermission,
} from "../../utils/helperFunctions";
import PoliceTab from "../policeTab/PoliceTab";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useLikesData from "../../hooks/useLikesData";
import Drawer from "../Drawer/Drawer";
import { Form, Input, Select, Button as AntButton } from "antd";
import useShareData from "../../hooks/useShareData";
import { permissionsMap } from "../../utils/constants";
import DisplacementsTab from "../DisplacementsTab/DisplacementsTab";
import WpTab from "../WpTab/WpTab";
import DropdownWithCheckboxes from "../DropdownCheckbox/DropdownCheckbox";

const PersonInfoPage = ({ personInfo }) => {
  const [value, setValue] = useState(0);
  const { onLikeToggle } = useLikesData();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const {
    onShareSubmit,
    shareForm,
    getUsersLodaing,
    usersOptions,
    drawerOpen,
    setDrawerOpen,
  } = useShareData();

  const {
    titlePerson: {
      PNum,
      Certificate_Number,
      Citizenship_StoppedDate,
      IsDead,
      DeathDate,
      birthDate,
      birthCountry,
      birthRegion,
      firstName,
      lastName,
      middleName,
      firstNameEng,
      lastNameEng,
      middleNameEng,
      gender,
      NationalityName,
      allCitizenships,
    },

    titleAddress: {
      Apartment,
      Building,
      Building_Type,
      Community,
      Region,
      Residence,
      Street,
      Foreign_Address,
      Foreign_Community,
      Foreign_Country,
      Foreign_Region,
    },
    addresses,
    documents,
  } = formatPersonData(personInfo);

  const user = useAuthUser();

  const images = filterImageSrcs(documents, gender, birthDate);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const likeToggleText = middleName
    ? `${firstName} ${lastName} ${middleName}`
    : `${firstName} ${lastName}`;

  const onDrawerClose = () => {
    setDrawerOpen(false);
    shareForm.resetFields();
  };

  const onDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleReceiverChange = (value) => {
    console.log(`selected ${value}`);
  };
  let index = 0;
  const isJpk = isPersonJpk(documents);

  const isPersonCityzen = ({ documents, Citizenship_StoppedDate }) => {
    const hasArmenianCitizenship = documents.some((doc) =>
      doc.Person?.Citizenship?.Citizenship?.some(
        (country) => country.CountryCode === "051"
      )
    );

    return !!hasArmenianCitizenship && !Citizenship_StoppedDate;
  };
  return (
    <>
      <Container>
        <Box>
          <Stack
            direction="row"
            sx={{
              pt: 4,
            }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
            >
              Վերադառնալ
            </Button>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="personal-info-tabs"
              >
                {userHasPermission(
                  [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="ԲՊՌ տվյալներ">
                    <Tab icon={<CoPresentIcon />} aria-label="documents" />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.TAX.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="ՊԵԿ տվյալներ">
                    <Tab icon={<AttachMoneyIcon />} aria-label="finances" />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.ZAQS.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="ՔԿԱԳ տվյալներ">
                    <Tab icon={<FamilyRestroomIcon />} aria-label="family" />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.PETREGISTER.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="ԻԱՊՌ տվյալներ">
                    <Tab icon={<BusinessIcon />} aria-label="business" />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.KADASTR.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="Կադաստրի տվյալներ">
                    <Tab icon={<CastleIcon />} aria-label="kadastr" />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.POLICE.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="ԻՑ տվյալներ">
                    <Tab icon={<LocalPoliceIcon />} aria-label="police" />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.ARTSAKH.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="Տեղահանումների տվյալներ">
                    <Tab
                      icon={<LocalFireDepartmentIcon />}
                      aria-label="artsakh"
                    />
                  </Tooltip>
                )}
                {userHasPermission(
                  [permissionsMap.WP.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <Tooltip title="Աշխատանքի թույլտվության տվյալներ">
                    <Tab icon={<PersonSearchIcon />} aria-label="artsakh" />
                  </Tooltip>
                )}
              </Tabs>
            </Box>
            {userHasPermission(
              [
                permissionsMap.CITIZENSHIP_REPORT.uid,
                permissionsMap.PASSPORTS_REPORT.uid,
                permissionsMap.PNUM_REPORT.uid,
                permissionsMap.ADMIN.uid,
              ],
              user.permissions
            ) && (
              <DropdownWithCheckboxes
                firstName={firstName}
                lastName={lastName}
                personInfo={personInfo}
                reportNotAllowed={isJpk || !isPersonCityzen}
              />
            )}
          </Stack>
          <Stack direction="row" sx={{ mt: 2 }}>
            <Box
              sx={{
                width: "20%",
                minWidth: 200,
                maxWidth: 300,
                padding: 2,
              }}
            >
              <PhotoSlider images={images} />
            </Box>
            <Stack direction="row" sx={{ width: "70%", padding: 2 }}>
              <Stack spacing={2} justifyContent="left" sx={{ width: "50%" }}>
                <PersonalInfoRow
                  width={35}
                  label="ԱՆՈՒՆ"
                  text={`${firstName} | ${firstNameEng ? firstNameEng : ""}`}
                />
                <PersonalInfoRow
                  width={35}
                  label="ԱԶԳԱՆՈՒՆ"
                  text={`${lastName} | ${lastNameEng ? lastNameEng : ""}`}
                />
                <PersonalInfoRow
                  width={35}
                  label="ՀԱՅՐԱՆՈՒՆ"
                  text={`${middleName ? middleName : ""} | ${
                    middleNameEng ? middleNameEng : ""
                  }`}
                />
                <PersonalInfoRow
                  width={35}
                  label="ԾՆՆԴՅԱՆ ա/թ"
                  text={birthDate}
                />
                <PersonalInfoRow
                  width={35}
                  label="ՀԾՀ"
                  text={PNum || Certificate_Number || ""}
                />
                <PersonalInfoRow
                  width={35}
                  label="ԱԶԳՈՒԹՅՈՒՆ"
                  text={NationalityName}
                />
                <PersonalInfoRow width={35} label="ՍԵՌԸ" text={gender} />
                {IsDead && (
                  <PersonalInfoRow
                    width={40}
                    label="Մահացել է"
                    text={DeathDate}
                  />
                )}
              </Stack>
              <Stack spacing={2} justifyContent="left" sx={{ width: "50%" }}>
                <PersonalInfoRow
                  width={40}
                  label="ԵՐԿԻՐ"
                  text={
                    Foreign_Country
                      ? formatCountryName(Foreign_Country.CountryName)
                      : "ՀԱՅԱՍՏԱՆ"
                  }
                />
                <PersonalInfoRow
                  width={40}
                  label="ՄԱՐԶ"
                  text={Region || Foreign_Region}
                />
                <PersonalInfoRow
                  width={40}
                  label="ՀԱՄԱՅՆՔ"
                  text={
                    Community ? `${Community}/${Residence}` : Foreign_Community
                  }
                />
                <PersonalInfoRow
                  width={40}
                  label="ՓՈՂՈՑ"
                  text={Street || Foreign_Address}
                />
                <PersonalInfoRow
                  width={40}
                  label="ՏՈՒՆ"
                  text={
                    Building &&
                    `${Building_Type} ${Building}, ${
                      Apartment ? Apartment : ""
                    }`
                  }
                />
                <PersonalInfoRow
                  width={40}
                  label="ԾՆՆԴԱՎԱՅՐ"
                  text={`${birthCountry}/${
                    birthRegion ? ` \ ${birthRegion}` : ""
                  }`}
                />
                <PersonalInfoRow
                  width={40}
                  label="ՔԱՂԱՔԱՑԻՈՒԹՅՈՒՆ"
                  text={allCitizenships}
                />
                {Citizenship_StoppedDate && (
                  <PersonalInfoRow
                    width={40}
                    label="Քաղ․ հրաժարվելու ա/թ"
                    text={Citizenship_StoppedDate}
                  />
                )}
                {/* <Grid item>
                  <PDFGenerator
                    fileName={`bpr_${firstName}_${lastName}.pdf`}
                    buttonText="Արտահանել"
                    variant="contained"
                    Icon={PictureAsPdfIcon}
                    PDFTemplate={BPR}
                    data={personInfo}
                    userFullName={`${user.firstName} ${user.lastName}`}
                  />
                </Grid> */}
              </Stack>
            </Stack>
            {isJpk && (
              <Box
                sx={{
                  width: "5%",
                }}
              >
                <Chip size="medium" color="warning" label="ԺՊԿ" />
              </Box>
            )}
          </Stack>
        </Box>
        <Box sx={{ pb: 3 }}>
          {userHasPermission(
            [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <Documents documents={documents} addresses={addresses} />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.TAX.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <Finances ssn={PNum || Certificate_Number} />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.ZAQS.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <Family
                ssn={PNum || Certificate_Number}
                firstName={firstName}
                lastName={lastName}
              />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.PETREGISTER.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <BusinessTab ssn={PNum || Certificate_Number} />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.KADASTR.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <Kadastr ssn={PNum || Certificate_Number} />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.POLICE.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <PoliceTab pnum={PNum} />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.ARTSAKH.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <DisplacementsTab pnum={PNum} />
            </TabPanel>
          )}
          {userHasPermission(
            [permissionsMap.WP.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && (
            <TabPanel value={value} index={index++}>
              <WpTab pnum={PNum} />
            </TabPanel>
          )}
        </Box>

        {!drawerOpen && (
          <SpeedDialButton
            onLikeToggle={onLikeToggle}
            onShareClick={onDrawerOpen}
            uid={PNum}
            text={likeToggleText}
            fileName={`bpr_${firstName}_${lastName}.pdf`}
            PDFTemplate={BPR}
            data={personInfo}
            userFullName={`${user.firstName} ${user.lastName}`}
          />
        )}
      </Container>

      <Drawer
        open={drawerOpen}
        title={<p>Կիսվել այլոց հետ</p>}
        onClose={onDrawerClose}
        loading={getUsersLodaing}
      >
        <Form layout="vertical" form={shareForm} onFinish={onShareSubmit}>
          <Form.Item
            name="uid"
            label="ՀԾՀ"
            rules={[{ required: true, message: "Տվյալ դաշտը պարտադիր է" }]}
            initialValue={PNum}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="text"
            label="ԱԱՀ"
            rules={[{ required: true, message: "Տվյալ դաշտը պարտադիր է" }]}
            initialValue={likeToggleText}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="receivers"
            label="Հասցեատեր"
            rules={[{ required: true, message: "Տվյալ դաշտը պարտադիր է" }]}
          >
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Ընտրեք ստացողներին"
              onChange={handleReceiverChange}
              options={usersOptions}
            />
          </Form.Item>
          <Form.Item name="comment" label="Հաղորդագրություն">
            <Input.TextArea
              rows={4}
              placeholder="Մուտքագրել հաղորդագրություն"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <>
                <AntButton
                  color="secondary"
                  variant="outlined"
                  onClick={onDrawerClose}
                >
                  Չեղարկել
                </AntButton>
                <AntButton
                  style={{ marginLeft: "10px" }}
                  variant="outlined"
                  htmlType="submit"
                  // loading={getUsersLodaing}
                  disabled={
                    !shareForm.isFieldsTouched(false) ||
                    !!shareForm
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Կիսվել
                </AntButton>
              </>
            )}
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default PersonInfoPage;
