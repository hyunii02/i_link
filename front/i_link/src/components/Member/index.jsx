import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, IconButton, Badge } from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Member = (props) => {
  const { student } = props;

  return (
    <StyledBadge color="secondary" badgeContent="3">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="150" src={student.src} />
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10px",
          }}
        >
          <Typography variant="h5">{student.name}</Typography>
        </CardContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid container style={{ marginLeft: "2px" }}>
            <Grid item xs={4}>
              {student.state === 1 ? (
                <Button variant="contained" size="small">
                  등원완료
                </Button>
              ) : (
                <Button variant="outlined" size="small">
                  등원완료
                </Button>
              )}
            </Grid>
            <Grid item xs={4}>
              {student.state === 2 ? (
                <Button variant="contained" size="small">
                  하원완료
                </Button>
              ) : (
                <Button variant="outlined" size="small">
                  하원완료
                </Button>
              )}
            </Grid>
            <Grid item xs={4}>
              {student.state === 3 ? (
                <Button variant="contained" size="small">
                  설문완료
                </Button>
              ) : (
                <Button variant="outlined" size="small">
                  설문완료
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </StyledBadge>
  );
};

export default Member;
