import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  normalize: true,
  partialRender: true,
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const audioElement = useRef(null); // Define the audio element ref

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
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
      // Check audioElement
      wavesurfer.current.seekTo(
        audioElement.current.currentTime / audioElement.current.duration
      );
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <input
        type="range"
        id="zoom"
        name="zoom"
        min="10"
        max="100"
        step="1"
        defaultValue="10"
      />
      <label htmlFor="volume">Zoom</label>
      <br></br>
      <audio
        id="audio"
        ref={audioElement} // Attach the ref
        controls
        onTimeUpdate={handleAudioTimeUpdate}
      >
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  );
}
