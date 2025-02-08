import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Tooltip,
  Stack,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpeedIcon from "@mui/icons-material/Speed";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import WarningIcon from "@mui/icons-material/Warning";
import BuildIcon from "@mui/icons-material/Build";

const VehicleCard = ({ car }) => {
  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 4 }}>
      {/* Header */}
      <CardHeader
        avatar={<DirectionsCarIcon color="primary" />}
        title={`${car.model_name} - ${car.model} - ${car.cert_num}`}
        subheader={`Կարգաիճակը: ${car.registration_status}`}
      />

      <CardContent>
        <Grid container spacing={2}>
          {/* Registration & Status */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <AssignmentIndIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Հաշվառման համարանիշը
            </Typography>
            <Box
              sx={{
                width: 150, // Adjust based on the plate size
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url("../../../../../public/plate.png")`, // Replace with the actual image path
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000",
                  letterSpacing: 2,
                  fontFamily: "'DIN 1451 Mittelschrift', sans-serif",
                }}
              >
                {car.number}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <VerifiedUserIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              ԱՊՊԱ
            </Typography>
            <Chip
              label={car.insurance_info?.insurance_name}
              color="success"
              variant="outlined"
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              Վավեր: {car.insurance_info?.start_date} -{" "}
              {car.insurance_info?.end_date}
            </Typography>
          </Grid>

          {/* VIN & Special Notes */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <BuildIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Նույնականացման համարը(VIN)
            </Typography>
            <Typography>{car.vin}</Typography>
          </Grid>

          {car.special_notes && (
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <WarningIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Հատուկ նշումներ
              </Typography>
              <Typography>{car.special_notes}</Typography>
            </Grid>
          )}

          {/* Realease year */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <CalendarTodayIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Թողարկման տարեթիվը
            </Typography>
            <Typography>{car.released}</Typography>
          </Grid>

          {/* Engine & Fuel */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <LocalGasStationIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Շարժիչի տեսակը
            </Typography>
            <Typography>
              {car.fuel} ({car.fuel_type})
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <SpeedIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Շարժիչի հզորությունը (ԿՎՏ / ՁՈՒ)
            </Typography>
            <Typography>
              {car.engine_power} kW / {car.engine_hp} HP
            </Typography>
          </Grid>

          {/* Transit & Temporary Numbers */}
          {car.transit_number && (
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Ժամանակավոր համարանիշը
              </Typography>
              <Typography>{car.transit_number}</Typography>
            </Grid>
          )}

          {car.temporary_number && (
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Ժամանակավոր համարանիշը
              </Typography>
              <Typography>{car.temporary_number}</Typography>
            </Grid>
          )}

          {/* Recording Date & Body Type */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              <CalendarTodayIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Տրված է
            </Typography>
            <Typography>{car.recording_date}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Թափքի տեսակը
            </Typography>
            <Typography>
              {car.vehicle_type} / {car.body_type}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Owner Details */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <PersonIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Սեփականատերը
              </Typography>
              <Typography variant="h6">
                {car.holder?.first_name} {car.holder?.middle_name}{" "}
                {car.holder?.last_name}
              </Typography>
              <Typography variant="body2">
                <BadgeIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Անձնագիր: {car.holder?.identification_no}
              </Typography>
              <Typography variant="body2">
                <CalendarTodayIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Հեռ: {car.holder?.address?.mobile || car.holder?.address?.phone}
              </Typography>
            </Box>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Address */}
          <Grid item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <HomeIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Հասցեն
              </Typography>
              <Typography variant="body2">
                {car.holder?.address?.street1}, {car.holder?.address?.house}, բն{" "}
                {car.holder?.address?.apt}
              </Typography>
              <Typography variant="body2">
                {car.holder?.address?.city_town},{" "}
                {car.holder?.address?.province}, {car.holder?.address?.postcode}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Inactive & Blocked Status */}
        <Box display="flex" gap={2}>
          <Chip
            label={car.inactive ? "Inactive" : "Active"}
            color={car.inactive ? "warning" : "success"}
          />
          <Chip
            label={car.is_blocked ? "Blocked" : "Not Blocked"}
            color={car.is_blocked ? "error" : "success"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
