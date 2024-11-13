const {
  getPropertiesBySsnDb,
  getPropertyByCertificateDb,
} = require("./services");

const getPropertiesBySsn = async (req, res, next) => {
  try {
    const { ssn } = req.params;

    const properties = await getPropertiesBySsnDb(ssn);

    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};

const getPropertyByCertificate = async (req, res, next) => {
  try {
    const { certificateNumber } = req.params;
    const { searchBase } = req.query;

    const property = await getPropertyByCertificateDb(
      certificateNumber,
      searchBase
    );

    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPropertiesBySsn,
  getPropertyByCertificate,
};
