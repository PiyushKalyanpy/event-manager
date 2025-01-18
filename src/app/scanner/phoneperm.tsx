import { useEffect, useRef } from "react";

import { toast } from "react-toast";

const Camera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getMedia(constraints) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Assign the stream to the video element
          videoRef.current.play(); // Start playing the video stream
        }
      } catch (err) {
        toast.error( err.message);
      }
    }

    getMedia({ audio: true, video: true });
  }, []);

  return (
    <div className="w-full border h-64">
      <video ref={videoRef} className="w-full h-full" playsInline />
    </div>
  );
};

export default Camera;
