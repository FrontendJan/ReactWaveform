import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Waveform from "./Waveform";
import PlayList from "./PlayList";

// const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

const tracks = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  },
  {
    id: 1,
    title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
    url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
  },
];

export default function App() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  return (
    <div className="flex-column d-flex align-items-center justify-content-center wave-bg min-vh-100">
      <div className="player shadow rounded bg-white pt-4">
        <Waveform url={selectedTrack.url} />
        <PlayList
          tracks={tracks}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
        />
        <br />
      </div>
    </div>
  );
}
