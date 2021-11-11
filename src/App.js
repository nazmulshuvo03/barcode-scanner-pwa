// import "./app.css";
import { useState } from "react";
import DynamicBoxCam from "./components/DynamicBoxCam";
import FixBoxCam from "./components/FixBoxCam";
import Options from "./components/Options";
import CameraTabs from "./components/CameraTabs";
import { Grid } from "@material-ui/core";
import { BARCODE_TYPES, RESOLUTIONS, WORKERS } from "./Constants";

function App() {
  const [barcodeType, setBarcodeType] = useState(BARCODE_TYPES[0].value);
  const [resolution, setResolution] = useState(RESOLUTIONS[0].value);
  const [workers, setWorkers] = useState(WORKERS[2].value);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={9}>
        <CameraTabs>
          <DynamicBoxCam
            {...{
              barcodeType,
              resolution,
              workers,
            }}
          />
          <FixBoxCam
            {...{
              barcodeType,
              resolution,
              workers,
            }}
          />
        </CameraTabs>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Options
          {...{
            barcodeType,
            resolution,
            workers,
            setBarcodeType,
            setResolution,
            setWorkers,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default App;
