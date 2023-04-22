export const formatCountryName = (countryName) => {
    const countryNameArray = countryName.split(' ');

    if (countryNameArray.length === 1) {
        return countryName;
    }

    let name = '';
    for (let word of countryNameArray) {
        name += word[0];
    }

    return name;
};

export const findCurrentAddress = (addresses) => {
    const registrationAddress =
        addresses.find(
            (address) =>
                address.RegistrationData.Registration_Type === 'CURRENT'
        ) || addresses[0];

    const headerAddressObject = { ...registrationAddress.RegistrationAddress };

    return headerAddressObject;
};

export const formatAddressString = (addresses) => {
    let addressString;
    const currentAddressObj = findCurrentAddress(addresses);
    const {
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
    } = currentAddressObj;

    if (!Foreign_Country) {
        addressString = `Հայաստան ${
            Region === Community ? Region : Region + ' ' + Community
        }, ${Residence || ''}, ${Street || ''}  ${
            (Building_Type || '', Building || '')
        }, ${Apartment || ''}`;
    } else {
        addressString = `${Foreign_Country.CountryName || ''} ${
            Foreign_Region || ''
        }, ${Foreign_Community || ''}, ${Foreign_Address || ''}`;
    }

    return addressString;
};

export const findValidDocument = (documents) => {
    const validDocument =
        documents.find((doc) => doc.Document_Status === 'PRIMARY_VALID') ||
        documents[0];

    return validDocument;
};

export const searchRowPersonData = (documents) => {
    const avatar = documents.find((doc) => doc.Photo_ID)?.Photo_ID;
    const validDoc = findValidDocument(documents);
    const {
        Document_Department,
        Document_Number,
        PassportData: { Passport_Issuance_Date, Passport_Validity_Date },
        Person: {
            Genus,
            First_Name,
            Last_Name,
            Patronymic_Name,
            English_First_Name,
            English_Last_Name,
            English_Patronymic_Name,
            Birth_Date,
        },
    } = validDoc;
    const rowData = {
        avatar,
        gender: Genus,
        department: Document_Department || '',
        docNum: Document_Number || '',
        issueDate: Passport_Issuance_Date || '',
        validDate: Passport_Validity_Date || '',
        firstName: First_Name || English_First_Name || '',
        lastName: Last_Name || English_Last_Name || '',
        middleName: Patronymic_Name || English_Patronymic_Name || '',
        birthDate: Birth_Date || '',
    };

    return rowData;
};

export const formatPersonData = (personInfo) => {
    const { addresses, documents, ...unChangedData } = personInfo;

    const currentAddressObj = findCurrentAddress(addresses);
    const {
        Person: {
            English_First_Name,
            English_Last_Name,
            English_Patronymic_Name,
            First_Name,
            Last_Name,
            Patronymic_Name,
            Genus,
            Nationality: { NationalityName },
            Birth_Date,
            Birth_Country: { CountryName },
            Birth_Region,
        },
    } = findValidDocument(documents);

    return {
        titleAddress: {
            ...currentAddressObj,
        },
        titlePerson: {
            firstName: First_Name,
            lastName: Last_Name,
            middleName: Patronymic_Name,
            firstNameEng: English_First_Name,
            lastNameEng: English_Last_Name,
            middleNameEng: English_Patronymic_Name,
            gender: Genus === 'M' ? 'ԱՐԱԿԱՆ' : 'ԻԳԱԿԱՆ',
            NationalityName,
            birthDate: Birth_Date,
            birthCountry: formatCountryName(CountryName),
            birthRegion: Birth_Region,
            ...unChangedData,
        },
        addresses,
        documents,
    };
};

export const filterImageSrcs = (docs, gender, birthDate) => {
    const images = docs.reduce((acc, doc) => {
        doc.Photo_ID && acc.push(`data:image/jpeg;base64,${doc.Photo_ID}`);

        return acc;
    }, []);

    if (images.length > 0) {
        return images;
    }

    const birthYear = birthDate.split('/')[2];
    const age = new Date().getFullYear() - birthYear;
    const noImageSrc =
        age < 18
            ? '../baby.png'
            : gender === 'ԱՐԱԿԱՆ'
            ? '../male.png'
            : '../female.png';

    return [noImageSrc];
};
