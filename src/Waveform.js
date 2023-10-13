import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./Loader";

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const audioElement = useRef(null); // Define the audio element ref

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#eee",
      progressColor: "#0d6efd",
      cursorColor: "#0d6efd",
      barWidth: 4,
      barRadius: 3,
      responsive: true,
      height: 150,
      normalize: true,
      partialRender: true,
      fillParent: true,
      minPxPerSec: 0.1,
    });

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      const zoomInput = document.querySelector('input[name="zoom"]');
      if (zoomInput) {
        zoomInput.addEventListener("input", onZoomChange);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  const onZoomChange = (e) => {
    const newZoomValue = e.target.valueAsNumber;
    if (wavesurfer.current) {
      wavesurfer.current.zoom(newZoomValue);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (wavesurfer.current && audioElement.current) {
      wavesurfer.current.seekTo(
        audioElement.current.currentTime / audioElement.current.duration
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-row align-items-center justify-content-center my-2">
          <h1 className="text-center px-3">
            Minimalistic music <span className="text-primary">player</span>{" "}
          </h1>
          <Loader></Loader>
        </div>
        <div className="col-md-12 d-flex align-items-center justify-content-center my-2">
          <div id="waveform" ref={waveformRef} className="w-50"></div>
        </div>
        <div className="col-md-12 d-flex align-items-center justify-content-center my-2">
          <audio
            id="audio"
            ref={audioElement}
            controls
            onTimeUpdate={handleAudioTimeUpdate}
          >
            <source src={url} type="audio/mpeg" />
          </audio>
        </div>
        <div className="col-md-12 d-flex align-items-center justify-content-center mb-4">
          <label className="px-1">Zoom </label>
          <input
            type="range"
            id="zoom"
            name="zoom"
            min="10"
            max="100"
            step="1"
            defaultValue="10"
          />
        </div>
      </div>
    </div>
  );
}
