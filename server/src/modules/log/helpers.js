const getLogType = (path) => {
  const pathArray = path.split("/");

  const majorPath = pathArray[pathArray.length - 1];
  switch (majorPath) {
    case "download":
      return "PDF գեներացում";
    case "bpr":
    case "petregistr":
      return "Որոնում";
    default:
      return "Այցելություն էջ";
  }
};

module.exports = { getLogType };
