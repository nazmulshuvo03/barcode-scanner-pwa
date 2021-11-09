import "./app.css";
import { useState } from "react";
import Camera from "./components/Camera";
import Options from "./components/Options";
import { Grid } from "@material-ui/core";
import { BARCODE_TYPES, RESOLUTIONS, WORKERS } from "./Constants";

function App() {
  const [barcodeType, setBarcodeType] = useState(BARCODE_TYPES[0].value);
  const [resolution, setResolution] = useState(RESOLUTIONS[0].value);
  const [workers, setWorkers] = useState(WORKERS[2].value);

  return (
    <Grid container>
      <Grid item xs={12} sm>
        <Camera
          {...{
            barcodeType,
            resolution,
            workers,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
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
