import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  video: {
    height: "480px",
    width: "640px",
    [theme.breakpoints.down("sm")]: {
      height: "320px",
      width: "100%",
    },
    overflow: "hidden",
    position: "relative",
    "& video": {
      height: "100%",
      width: "100%",
      // maxHeight: "640px",
      // maxWidth: "480px",
      objectFit: "cover",
    },
    "& canvas": {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      // maxHeight: "640px",
      // maxWidth: "480px",
    },
  },
}));

const Camera = (props) => {
  const classes = useStyles();
  const { id, videoInit } = props;

  return (
    <div>
      {/* <div className="video" id="fix_box_video" /> */}
      <div className={classes.video} id={id} />
      {videoInit ? (
        ""
      ) : (
        <div className="skeleton__video">
          <div className="skeleton__video--loading">
            {/* <Loader /> */}
            <p>Click play to open camera...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
