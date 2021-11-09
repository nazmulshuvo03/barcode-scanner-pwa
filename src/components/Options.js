import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BARCODE_TYPES, RESOLUTIONS, WORKERS } from "../Constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Options = (props) => {
  const classes = useStyles();
  const {
    barcodeType,
    resolution,
    workers,
    setBarcodeType,
    setResolution,
    setWorkers,
  } = props;

  const handleBarcodeChange = (event) => {
    setBarcodeType(event.target.value);
  };

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleWorkersChange = (event) => {
    setWorkers(event.target.value);
  };

  // console.log(cameraFace, barcodeType, resolution, workers);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="barcode-type">Barcode Type</InputLabel>
          <Select
            labelId="barcode-type"
            id="barcode-type-select"
            value={barcodeType}
            onChange={handleBarcodeChange}
          >
            {BARCODE_TYPES.map((barcodeType) => (
              <MenuItem key={barcodeType.value} value={barcodeType.value}>
                {barcodeType.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="resolutions">Resolutions</InputLabel>
          <Select
            labelId="resolutions"
            id="resolutions-select"
            value={resolution}
            onChange={handleResolutionChange}
          >
            {RESOLUTIONS.map((resolution) => (
              <MenuItem key={resolution.value} value={resolution.value}>
                {resolution.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="worker">Workers</InputLabel>
          <Select
            labelId="worker"
            id="worker-select"
            value={workers}
            onChange={handleWorkersChange}
          >
            {WORKERS.map((worker) => (
              <MenuItem key={worker.value} value={worker.value}>
                {worker.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Options;
