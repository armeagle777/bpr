import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const DEFAULT_NOTIFICATION = "Տվյալ անձի վերաբերյալ ՔԿԱԳ փաստաթղթեր չեն գտնվել";

const DocumentNotFound = ({ notification = DEFAULT_NOTIFICATION }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/no_document.png"
        alt="No document found"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {notification}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default DocumentNotFound;
