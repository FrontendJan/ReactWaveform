import React, { useEffect, useRef, useState } from "react";

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
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }

      // Add the zoom event listener when the waveform is ready
      const zoomInput = document.querySelector('input[name="zoom"]');
      if (zoomInput) {
        zoomInput.addEventListener("input", onZoomChange);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [url, volume]);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }

      // Add the zoom event listener when the waveform is ready
      const zoomInput = document.querySelector('input[name="zoom"]');
      if (zoomInput) {
        zoomInput.addEventListener("input", onZoomChange);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [url, volume]);
  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  const onZoomChange = (e) => {
    const newZoomValue = e.target.valueAsNumber;
    if (wavesurfer.current) {
      wavesurfer.current.zoom(newZoomValue);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          id="zoom"
          name="zoom"
          min="10" // Adjust the min and max values as needed
          max="100"
          step="1"
          defaultValue="10" // Set an initial zoom level
        />
        <label htmlFor="zoom">Zoom</label>
      </div>
    </div>
  );
}
