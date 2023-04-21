import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Button, Container, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Documents from '../documents/Documents';
import Family from '../family/Family';
import Finances from '../finances/Finances';
import PhotoSlider from '../photoSlider/PhotoSlider';
import SpeedDialButton from '../speedDial/SpeedDial';
import TabPanel from '../tabPanel/TabPanel';
import PersonalInfoRow from './PersonalInfoRow';

import {
    formatCountryName,
    formatPersonData,
} from '../../utils/helperFunctions';

const PersonInfoPage = ({ personInfo }) => {
    const [value, setValue] = useState(0);

    const {
        titlePerson: {
            PNum,
            Certificate_Number,
            Citizenship_StoppedDate,
            documents,
            addresses,
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
    } = formatPersonData(personInfo);

    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Stack
                direction='row'
                sx={{ pt: 4, justifyContent: 'space-between' }}
            >
                <Button
                    onClick={() => navigate(-1)}
                    variant='contained'
                    startIcon={<ArrowBackIosIcon />}
                >
                    Վերադառնալ
                </Button>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='personal-info-tabs'
                    >
                        <Tab icon={<CoPresentIcon />} aria-label='documents' />
                        <Tab icon={<AttachMoneyIcon />} aria-label='finances' />
                        <Tab
                            icon={<FamilyRestroomIcon />}
                            aria-label='family'
                        />
                    </Tabs>
                </Box>
                <Button
                    variant='contained'
                    color='error'
                    endIcon={<PictureAsPdfIcon />}
                >
                    Արտահանել
                </Button>
            </Stack>
            <Stack direction='row' sx={{ mt: 2 }}>
                <Box sx={{ width: '30%', padding: 2 }}>
                    <PhotoSlider />
                </Box>
                <Stack direction='row' sx={{ width: '70%', padding: 2 }}>
                    <Stack
                        spacing={2}
                        justifyContent='left'
                        sx={{ width: '50%' }}
                    >
                        <PersonalInfoRow
                            width={35}
                            label='ԱՆՈՒՆ'
                            text={`${firstName} | ${firstNameEng}`}
                        />
                        <PersonalInfoRow
                            width={35}
                            label='ԱԶԳԱՆՈՒՆ'
                            text={`${lastName} | ${lastNameEng}`}
                        />
                        <PersonalInfoRow
                            width={35}
                            label='ՀԱՅՐԱՆՈՒՆ'
                            text={`${middleName} | ${middleNameEng}`}
                        />
                        <PersonalInfoRow
                            width={35}
                            label='ԾՆՆԴՅԱՆ ա/թ'
                            text={birthDate}
                        />
                        <PersonalInfoRow
                            width={35}
                            label='ՀԾՀ'
                            text={PNum || Certificate_Number || ''}
                        />
                        <PersonalInfoRow
                            width={35}
                            label='ԱԶԳՈՒԹՅՈՒՆ'
                            text={NationalityName}
                        />
                        <PersonalInfoRow
                            width={35}
                            label='ՍԵՌԸ'
                            text={gender}
                        />
                        {IsDead && (
                            <PersonalInfoRow
                                width={40}
                                label='Մահացել է'
                                text={DeathDate}
                            />
                        )}
                    </Stack>
                    <Stack
                        spacing={2}
                        justifyContent='left'
                        sx={{ width: '50%' }}
                    >
                        <PersonalInfoRow
                            width={40}
                            label='ԵՐԿԻՐ'
                            text={
                                Foreign_Country
                                    ? formatCountryName(
                                          Foreign_Country.CountryName
                                      )
                                    : 'ՀԱՅԱՍՏԱՆ'
                            }
                        />
                        <PersonalInfoRow
                            width={40}
                            label='ՄԱՐԶ'
                            text={Region || Foreign_Region}
                        />
                        <PersonalInfoRow
                            width={40}
                            label='ՀԱՄԱՅՆՔ'
                            text={
                                Community
                                    ? `${Community}/${Residence}`
                                    : Foreign_Community
                            }
                        />
                        <PersonalInfoRow
                            width={40}
                            label='ՓՈՂՈՑ'
                            text={Street || Foreign_Address}
                        />
                        <PersonalInfoRow
                            width={40}
                            label='ՏՈՒՆ'
                            text={
                                Building &&
                                `${Building_Type} ${Building}, ${Apartment}`
                            }
                        />
                        <PersonalInfoRow
                            width={40}
                            label='ԾՆՆԴԱՎԱՅՐ'
                            text={`${birthCountry}/${birthRegion}`}
                        />
                        <PersonalInfoRow
                            width={40}
                            label='ՔԱՂԱՔԱՑԻՈՒԹՅՈՒՆ'
                            text='ՀՀ'
                        />
                        {Citizenship_StoppedDate && (
                            <PersonalInfoRow
                                width={40}
                                label='Քաղ․ հրաժարվելու ա/թ'
                                text={Citizenship_StoppedDate}
                            />
                        )}
                    </Stack>
                </Stack>
            </Stack>
            <Box sx={{ pb: 3 }}>
                <TabPanel value={value} index={0}>
                    <Documents />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Finances />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Family />
                </TabPanel>
            </Box>
            <SpeedDialButton />
        </Container>
    );
};

export default PersonInfoPage;
