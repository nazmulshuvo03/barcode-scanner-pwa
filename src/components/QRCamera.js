import { useState } from "react";
import QrReader from "react-qr-reader";

const QRCamera = () => {
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
        style={{ width: "100%" }}
      />
      <p>{result}</p>
    </>
  );
};

export default QRCamera;
