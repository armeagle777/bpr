import { v4 } from "uuid";
import StyledTableCell from "../components/finances/StyledTableCell";
import ThCell from "../components/finances/ThCell";
import TdCell from "../components/finances/TdCell";
import fileDownload from "js-file-download";
import { getFileBySsn } from "../api/personsApi";

export const downloadPdf = async (url, fileName, personInfo) => {
  try {
    const file = await getFileBySsn(url, personInfo);
    fileDownload(file, fileName);
  } catch (error) {
    console.log("error:::::: ", error);
  }
};

export const formatCountryName = (countryName) => {
  const countryNameArray = countryName.split(" ");

  if (countryNameArray.length === 1) {
    return countryName;
  }

  let name = "";
  for (let word of countryNameArray) {
    name += word[0];
  }

  return name;
};

export const findCurrentAddress = (addresses) => {
  const registrationAddress =
    addresses.find(
      (address) => address.RegistrationData.Registration_Type === "CURRENT"
    ) || addresses[0];

  const headerAddressObject = { ...registrationAddress?.RegistrationAddress };

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
      Region === Community ? Region : Region + " " + Community
    }, ${Residence || ""}, ${Street || ""}  ${
      (Building_Type || "", Building || "")
    }, ${Apartment || ""}`;
  } else {
    addressString = `${Foreign_Country.CountryName || ""} ${
      Foreign_Region || ""
    }, ${Foreign_Community || ""}, ${Foreign_Address || ""}`;
  }

  return addressString;
};

export const findValidDocument = (documents) => {
  const validDocument =
    documents.find((doc) => doc.Document_Status === "PRIMARY_VALID") ||
    documents[0];

  return validDocument;
};

export const searchRowPersonData = (documents) => {
  const avatar = documents.find((doc) => doc.Photo_ID)?.Photo_ID;
  const validDoc = findValidDocument(documents);
  const {
    Document_Department,
    Document_Number,
    PassportData: { Passport_Issuance_Date, Passport_Validity_Date } = {},
    Person: {
      Genus,
      First_Name,
      Last_Name,
      Patronymic_Name,
      English_First_Name,
      English_Last_Name,
      English_Patronymic_Name,
      Birth_Date,
    } = {},
  } = { ...validDoc };
  const rowData = {
    avatar,
    gender: Genus,
    department: Document_Department || "",
    docNum: Document_Number || "",
    issueDate: Passport_Issuance_Date || "",
    validDate: Passport_Validity_Date || "",
    firstName: First_Name || English_First_Name || "",
    lastName: Last_Name || English_Last_Name || "",
    middleName: Patronymic_Name || English_Patronymic_Name || "",
    birthDate: Birth_Date || "",
  };

  return rowData;
};

export const formatPersonData = (personInfo) => {
  const { addresses, documents, ...unChangedData } = { ...personInfo };

  const currentAddressObj = findCurrentAddress(addresses);

  const allCitizenships = documents
    .reduce((acc, doc) => {
      const { Citizenship } = { ...doc.Person?.Citizenship };
      if (Citizenship) {
        acc = [...acc, ...doc.Person.Citizenship.Citizenship];
      }
      return acc;
    }, [])
    .map((obj) => obj.CountryName)
    .reduce((acc, countryName) => {
      if (!acc.includes(countryName)) {
        acc.push(countryName);
      }

      return acc;
    }, [])
    .map((name) => {
      const citizenshipNamesArray = name?.split(" ");
      if (citizenshipNamesArray?.length === 1) {
        return citizenshipNamesArray;
      }

      return citizenshipNamesArray?.reduce((acc, name) => {
        acc += name[0];
        return acc;
      }, "");
    })
    .join(",");

  const {
    Person: {
      English_First_Name,
      English_Last_Name,
      English_Patronymic_Name,
      First_Name,
      Last_Name,
      Patronymic_Name,
      Genus,
      Nationality,
      Birth_Date,
      Birth_Country,
      Birth_Region,
      Birth_Community,
      Birth_Address,
    },
  } = { ...findValidDocument(documents) };

  const NationalityName = Nationality?.NationalityName || "";
  const CountryName = Birth_Country?.Birth_Country || "";

  return {
    titleAddress: {
      ...currentAddressObj,
    },
    titlePerson: {
      allCitizenships,
      firstName: First_Name,
      lastName: Last_Name,
      middleName: Patronymic_Name,
      firstNameEng: English_First_Name,
      lastNameEng: English_Last_Name,
      middleNameEng: English_Patronymic_Name,
      gender: Genus === "M" ? "ԱՐԱԿԱՆ" : "ԻԳԱԿԱՆ",
      NationalityName,
      birthDate: Birth_Date,
      birthCountry: formatCountryName(CountryName),
      birthRegion: Birth_Region || Birth_Community || Birth_Address,
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

  const birthYear = birthDate.split("/")[2];
  const age = new Date().getFullYear() - birthYear;
  const noImageSrc =
    age < 18
      ? "../baby.png"
      : gender === "ԱՐԱԿԱՆ"
      ? "../male.png"
      : "../female.png";

  return [noImageSrc];
};

export const formatDates = (date) => {
  return date;
};

export const formatedData = (periods) => {
  return [...periods].reduce(
    (acc, { date, personInfo }) => {
      acc.titles.push(
        <StyledTableCell align="right" key={v4()} sx={{ fontSize: "10px" }}>
          {date}
        </StyledTableCell>
      );
      acc.salaryEquivPayments.push(
        <TdCell data={personInfo.salaryEquivPayments} key={v4()} />
      );
      acc.incomeTax.push(<TdCell data={personInfo.incomeTax} key={v4()} />);
      acc.civilLowContractPayments.push(
        <TdCell data={personInfo.civilLowContractPayments} key={v4()} />
      );
      acc.socialpayments.push(
        <TdCell data={personInfo.socialpayments} key={v4()} />
      );
      acc.socialpaymentspaid.push(
        <TdCell data={personInfo.socialpaymentspaid} key={v4()} />
      );
      acc.workinghours.push(
        <TdCell data={personInfo.workinghours} key={v4()} />
      );

      return acc;
    },
    {
      titles: [<StyledTableCell key={v4()}>...</StyledTableCell>],
      salaryEquivPayments: [
        <ThCell title="Աշխ․ հավասարեցված վճարներ" key={v4()} />,
      ],
      incomeTax: [<ThCell title="Եկամտային հարկ" key={v4()} />],
      civilLowContractPayments: [<ThCell title="Քաղ. պայմ" key={v4()} />],
      socialpayments: [<ThCell title="Հաշվարկված սոց․ վճարներ" key={v4()} />],
      socialpaymentspaid: [<ThCell title="Վճարված սոցվճարներ" key={v4()} />],
      workinghours: [<ThCell title="Աշխատաժամեր" key={v4()} />],
    }
  );
};

export const createSearchParamsObject = (searchInputValue) => {
  const searchParamsObj = searchInputValue
    .split(" ")
    .reduce((acc, el, index, arr) => {
      switch (arr.length) {
        case 1:
          {
            if (el.length === 10) {
              acc.ssn = el;
            } else {
              acc.documentNumber = el;
            }
          }
          break;
        default: {
          if (el.search(/\/|\./i) !== -1) {
            acc.birthDate = el.replace(/\./g, "/");
          } else if (index === 0) {
            acc.firstName = el.replace(/և/g, "եվ").toUpperCase();
          } else if (index === 1) {
            acc.lastName = el.replace(/և/g, "եվ").toUpperCase();
          } else {
            acc.patronomicName = el.toUpperCase();
          }
        }
      }

      return acc;
    }, {});

  return searchParamsObj;
};
