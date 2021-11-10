import React from "react";

// import Loader from 'react-feather/dist/icons/loader';

const VideoSkeleton = ({ error }) => (
  <div className="skeleton__video">
    {error ? (
      ""
    ) : (
      <div className="skeleton__video--loading">
        {/* <Loader /> */}
        <p>Click play to open camera...</p>
      </div>
    )}
  </div>
);

export default VideoSkeleton;
