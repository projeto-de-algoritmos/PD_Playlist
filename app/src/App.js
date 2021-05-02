import './App.css';

import {getAllVideos} from './structures/channel';
import getData from './structures/data';
import Playlist from './structures/playlist';

import React, {useState} from 'react';

function App() {
  
  const [channels, setChannels] = useState(getData());
  const [disponibleTime, setDisponibleTime] = useState(0);

  const up = (i) => {
    let channels_cp = [...channels];
    channels_cp[i].priority += 1;
    setChannels([...channels_cp]);
  }

  const down = (i) => {
    let channels_cp = [...channels];
    if (channels_cp[i].priority > 0) {
      channels_cp[i].priority -= 1;
    }
    setChannels([...channels_cp]);
  }

  const main = () => {
    let channels_cp = [...channels];
    for (let channel of channels_cp) {
      channel.propagate()
    }
    let videos = getAllVideos(channels_cp);
    let playlist = new Playlist(videos);
    console.log(playlist.getOPT(disponibleTime));
  }

  return (
    <div>
      <button onClick={main}>GO</button>
      <input type="number" onChange={(e) => {setDisponibleTime(e.target.valueAsNumber)}}></input>
      {channels.map((canal, i) => (
        <div key={i}>
          <button onClick={(e) => up(i)}>aumentar</button>
          <p>{canal.name} - {canal.priority}</p>
          <button onClick={(e) => down(i)}>diminuir</button>
        </div>
      ))}
    </div>
  );
}

export default App;
