import { useState } from "react";
import QrReader from "react-qr-reader";
import { makeStyles } from "@material-ui/core/styles";

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
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      setResult(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        className={classes.qrSection}
      />
      <p>{result}</p>
    </>
  );
};

export default QRCamera;
