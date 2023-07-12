const defaultDocument = [
    {
        Photo_ID: '',
        Document_Status: 'PRIMARY_VALID',
        Document_Type: '',
        Document_Number: '',
        Other_DocumentType: null,
        Document_Department: '',
        BasicDocument: {
            Basic_Document_Code: '',
            Basic_Document_Name: '',
            Basic_Document_Number: '',
            Basic_Document_Country: {
                CountryName: '',
                CountryCode: '',
                CountryShortName: '',
            },
        },
        Person: {
            Nationality: {
                NationalityName: '',
                NationalityCode: '',
            },
            Citizenship: {
                Citizenship: [
                    {
                        CountryName: '',
                        CountryCode: '',
                        CountryShortName: '',
                    },
                ],
            },
            Last_Name: '',
            First_Name: '',
            Patronymic_Name: '',
            Birth_Date: '',
            Genus: '',
            English_Last_Name: '',
            English_First_Name: '',
            English_Patronymic_Name: '',
            Birth_Country: {
                CountryName: '',
                CountryCode: '',
                CountryShortName: '',
            },
            Birth_Region: '',
            Birth_Community: '',
            Birth_Residence: null,
            Birth_Address: null,
        },
        PresidentOrder: null,
        PassportData: {
            Passport_Type: '',
            Passport_Issuance_Date: '',
            Passport_Validity_Date: '',
            Passport_Validity_Date_FC: '',
            Passport_Extension_Date: null,
            Passport_Extension_Department: null,
            Related_Document_Number: null,
            Related_Document_Date: null,
            Related_Document_Department: null,
        },
    },
];

const defaultAddress = [
    {
        RegistrationAddress: {
            Postal_Index: null,
            Foreign_Country: {
                CountryName: '',
                CountryCode: '',
                CountryShortName: '',
            },
            Foreign_Region: '',
            Foreign_Community: '',
            Foreign_Address: null,
        },
        ResidenceDocument: null,
        RegistrationData: {
            Registration_Department: '',
            Registration_Date: '',
            Registration_Type: '',
            Registration_Status: '',
            Temporary_Registration_Date: null,
            Registration_Aim: {
                AimName: '',
                AimCode: '',
            },
            UnRegistration_Aim: null,
            Registered_Date: null,
            Registered_Department: null,
        },
    },
];

const sphereCronConfig = '0 20 * * *';

module.exports = { defaultDocument, defaultAddress, sphereCronConfig };
