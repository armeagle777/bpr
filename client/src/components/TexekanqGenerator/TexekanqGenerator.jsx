import { PDFDownloadLink } from "@react-pdf/renderer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTexekanqData } from "../../hooks/useTexekanqData";

const TexekanqGenerator = ({
  Icon,
  data,
  variant,
  fileName,
  buttonText,
  iconButton,
  PDFTemplate,
  userFullName,
}) => {
  const { PNum } = data;
  const { onCreateTexekanq, texekanqData, texekanqIsLoading } =
    useTexekanqData();

  return (
    <>
      {!texekanqData && (
        <LoadingButton
          color="primary"
          loading={texekanqIsLoading}
          variant="outlined"
          // endIcon={<Icon />}
          onClick={() => onCreateTexekanq({ pnum: PNum })}
        >
          Քաղաքացիության տեղեկանք
        </LoadingButton>
      )}

      {texekanqData && (
        <PDFDownloadLink
          document={<PDFTemplate data={data} userFullName={userFullName} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) => {
            return (
              <LoadingButton
                color="error"
                loading={loading}
                variant={variant}
                endIcon={<Icon />}
              >
                Պահպանել
              </LoadingButton>
            );
          }}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default TexekanqGenerator;
