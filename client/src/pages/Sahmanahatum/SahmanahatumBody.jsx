import MuiAlert from "@mui/material/Alert";

const SahmanahatumBody = ({ data }) => {
  if (!data) return null;
  return (
    <div>
      {/* {((Array.isArray(data) && !!data.length) || data) && (
        <CompanyInfo company={data} />
      )} */}
      {JSON.stringify(data)}
    </div>
  );
};

export default SahmanahatumBody;
