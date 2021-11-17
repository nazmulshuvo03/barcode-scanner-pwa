import { useCallback, useEffect, useState } from "react";
import Quagga from "quagga";
import Camera from "./Camera";
import { Button, Grid, Switch, Typography } from "@material-ui/core";
import { CAMERA_FACE } from "../Constants";

const DynamicBoxCam = (props) => {
  const { barcodeType, resolution, workers } = props;
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraFace, setCameraFace] = useState(CAMERA_FACE[1].value);
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [barcode, setBarcode] = useState(null);
  const [result, setResult] = useState("item details loading...");
  const [codeFormat, setCodeFormat] = useState("");
  const [angle, setAngle] = useState(null);
  // const [resultBox, setResultBox] = useState(null);

  const handleCameraFaceChange = (event) => {
    if (event.target.checked) {
      setCameraFace(CAMERA_FACE[1].value);
    } else {
      setCameraFace(CAMERA_FACE[0].value);
    }
  };

  const onProductFound = (code, status_verbose) => {
    if (code === "not-found" || status_verbose === "product not found") {
      //   history.push(`/product/${code}?code=${barcode}`);
      console.log("not found");
      setResult("item not found");
    } else {
      //   history.push(`/product/${code}`);
      console.log("item found");
      setResult("item found");
    }
  };

  const onInitSuccess = () => {
    setResult("item details loading...");
    Quagga.start();
    setVideoInit(true);
  };

  const onDetected = (result) => {
    console.log(result);
    setBarcode(result.codeResult.code);
    setCodeFormat(result.codeResult.format);
    setAngle(result.angle);
    // setResultBox(result.box);
    Quagga.offDetected(onDetected);
    fetch(
      `https://world.openfoodfacts.org/api/v0/product/${result.codeResult.code}.json`
    )
      .then((res) => res.json())
      .then((res) => onInfoFetched(res))
      .catch((err) => console.log(err));
  };

  const onInfoFetched = (res) => {
    const { status, code, status_verbose } = res;
    // setBarcode(code);
    setAttempts((prevState) => prevState + 1);

    if (status === 1) {
      onProductFound(code, status_verbose);
    } else {
      setResult("item not found");
      Quagga.onDetected(onDetected);
    }
  };

  const onPlay = useCallback(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#video"),
            constraints: {
              // width: 640,
              width: resolution,
              height: 480,
              // facingMode: "environment",
              // deviceId: "7832475934759384534",
              facingMode: cameraFace,
            },
            area: {
              // defines rectangle of the detection/localization area
              top: "0%", // top offset
              right: "0%", // right offset
              left: "0%", // left offset
              bottom: "0%", // bottom offset
            },
            singleChannel: false, // true: only the red color-channel is read
          },
          // numOfWorkers: 4,
          numOfWorkers: workers,
          locate: true,
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "code_39_reader",
              "code_128_reader",
            ],
            // readers: [barcodeType],
            debug: {
              drawBoundingBox: false,
              showFrequency: false,
              drawScanline: false,
              showPattern: false,
            },
          },
        },
        (err) => {
          if (err) {
            console.log("err", err);
            setVideoError(true);
            return;
          }
          onInitSuccess();
        }
      );

      //detecting boxes on stream
      Quagga.onProcessed((result) => {
        var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

        // console.log("result", result);
        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              Number(drawingCanvas.getAttribute("width")),
              Number(drawingCanvas.getAttribute("height"))
            );
            result.boxes
              .filter(function (box) {
                return box !== result.box;
              })
              .forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: "green",
                  lineWidth: 2,
                });
              });
            // Quagga.ImageDebug.drawPath(
            //   result.boxes[0],
            //   { x: 0, y: 1 },
            //   drawingCtx,
            //   {
            //     color: "#00F",
            //     lineWidth: 2,
            //   }
            // );
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: "#00F",
              lineWidth: 2,
            });
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: "x", y: "y" },
              drawingCtx,
              { color: "red", lineWidth: 3 }
            );
          }
        }
      });

      Quagga.onDetected(onDetected);
      return () => Quagga.stop();
    }
    // eslint-disable-next-line
  }, [cameraFace, barcodeType, resolution, workers]);

  useEffect(() => {
    if (cameraOn) {
      onPlay();
    }
  }, [cameraOn, onPlay]);

  useEffect(() => {
    if (attempts > 3) {
      onProductFound("not-found");
    }
  }, [attempts]);

  // console.log("@@@@ Camra comp", attempts);

  return (
    <>
      <div>
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
            <div className="video__container">
              {videoError ? (
                <div className="skeleton__unsopported">
                  <div>
                    <p>
                      Your device does not support camera access or something
                      went wrong{" "}
                      <span role="img" aria-label="thinking-face">
                        🤔
                      </span>
                    </p>
                    <p>You can enter the barcode below</p>
                    {/* <BarcodeInputField /> */}
                  </div>
                </div>
              ) : (
                <Camera id={"video"} videoInit={videoInit} />
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            {barcode && <h3>Code: {barcode}</h3>}
            {codeFormat && <h3>Format: {codeFormat}</h3>}
            {angle && <h3>Angle: {angle}</h3>}
            <h2>{result}</h2>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DynamicBoxCam;
