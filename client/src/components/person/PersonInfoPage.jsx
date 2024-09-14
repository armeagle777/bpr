import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BusinessIcon from "@mui/icons-material/Business";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { Box, Button, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PDFGenerator from "../PDFGenerator/PDFGenerator";
import BPR from "../pdf-templates/BPR";
import Documents from "../documents/Documents";
import Family from "../family/Family";
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
} from "../../utils/helperFunctions";
import PoliceTab from "../policeTab/PoliceTab";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useLikesData from "../../hooks/useLikesData";
import Drawer from "../Drawer/Drawer";
import { Form, Input, Select } from "antd";
import useShareData from "../../hooks/useShareData";

const PersonInfoPage = ({ personInfo }) => {
  const [value, setValue] = useState(0);
  const { onLikeToggle } = useLikesData();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { onShareSubmit, shareForm, getUsersLodaing, usersOptions } =
    useShareData();

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

  // const handleExport = async (personObj) => {
  //     const url = `/persons/download`;
  //     const fileName = `bpr_${firstName}_${lastName}.pdf`;
  //     await downloadPdf(url, fileName, personInfo);
  // };
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

  return (
    <Container>
      <Stack direction="row" sx={{ pt: 4, justifyContent: "space-between" }}>
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
            <Tab icon={<CoPresentIcon />} aria-label="documents" />
            <Tab icon={<AttachMoneyIcon />} aria-label="finances" />
            <Tab icon={<FamilyRestroomIcon />} aria-label="family" />
            <Tab icon={<BusinessIcon />} aria-label="business" />
            <Tab icon={<LocalPoliceIcon />} aria-label="police" />
          </Tabs>
        </Box>
        <PDFGenerator
          PDFTemplate={BPR}
          fileName={`bpr_${firstName}_${lastName}.pdf`}
          buttonText="Արտահանել"
          variant="contained"
          Icon={PictureAsPdfIcon}
          data={personInfo}
          userFullName={`${user.firstName} ${user.lastName}`}
        />
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
            <PersonalInfoRow width={35} label="ԾՆՆԴՅԱՆ ա/թ" text={birthDate} />
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
              <PersonalInfoRow width={40} label="Մահացել է" text={DeathDate} />
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
              text={Community ? `${Community}/${Residence}` : Foreign_Community}
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
                `${Building_Type} ${Building}, ${Apartment ? Apartment : ""}`
              }
            />
            <PersonalInfoRow
              width={40}
              label="ԾՆՆԴԱՎԱՅՐ"
              text={`${birthCountry}/${birthRegion ? ` \ ${birthRegion}` : ""}`}
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
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ pb: 3 }}>
        <TabPanel value={value} index={0}>
          <Documents documents={documents} addresses={addresses} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Finances ssn={PNum || Certificate_Number} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Family
            ssn={PNum || Certificate_Number}
            firstName={firstName}
            lastName={lastName}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <BusinessTab ssn={PNum || Certificate_Number} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <PoliceTab pnum={PNum} />
        </TabPanel>
      </Box>
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
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={onDrawerClose}
                >
                  Չեղարկել
                </Button>
                <Button
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
                </Button>
              </>
            )}
          </Form.Item>
        </Form>
      </Drawer>

      {!drawerOpen && (
        <SpeedDialButton
          onLikeToggle={onLikeToggle}
          onShareClick={onDrawerOpen}
          uid={PNum}
          text={likeToggleText}
        />
      )}
    </Container>
  );
};

export default PersonInfoPage;
