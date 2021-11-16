import { useState } from "react";
import QrReader from "react-qr-reader";
import { makeStyles } from "@material-ui/core/styles";
import { CAMERA_FACE } from "../Constants";
import { Button, Grid, Switch, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  qrSection: {
    height: "480px",
    width: "640px",
    [theme.breakpoints.down("sm")]: {
      height: "320px",
      width: "100%",
    },
    position: "relative",
    "& section": {
      height: "100%",
      paddingTop: "5px !important",
      "& div": {
        // height: "100% !important",
      },
      "& video": {
        // objectFit: "cover !important",
        // height: "100% !important",
      },
    },
  },
}));

const QRCamera = () => {
  const classes = useStyles();
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraFace, setCameraFace] = useState(CAMERA_FACE[1].value);
  const [result, setResult] = useState("No result");

  const handleCameraFaceChange = (event) => {
    if (event.target.checked) {
      setCameraFace(CAMERA_FACE[1].value);
    } else {
      setCameraFace(CAMERA_FACE[0].value);
    }
  };

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      setResult(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const handleLoad = (obj) => {
    console.log("Camera loaded", obj);
    obj.mirrorVideo = true;
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        {!cameraOn ? (
          <Button
            variant="outlined"
            onClick={() => setCameraOn((prev) => !prev)}
          >
            Start
          </Button>
        ) : (
          ""
        )}
      </Grid>
      <Grid item>
        <Typography variant="caption">Front</Typography>
        <Switch
          checked={cameraFace === CAMERA_FACE[1].value}
          onChange={handleCameraFaceChange}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Typography variant="caption">Back</Typography>
      </Grid>
      <Grid item xs={12}>
        {cameraOn ? (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            onLoad={handleLoad}
            className={classes.qrSection}
            facingMode={cameraFace}
            showViewFinder={true}
          />
        ) : (
          ""
        )}
      </Grid>
      <p>{result}</p>
    </Grid>
  );
};

export default QRCamera;
