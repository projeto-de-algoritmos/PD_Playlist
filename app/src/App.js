import './App.css';

import {getAllVideos} from './structures/channel';
import getData from './structures/data';
import Playlist from './structures/playlist';

import React, {useState} from 'react';

function App() {
  
  const [channels, setChannels] = useState(getData);
  const [disponibleTime, setDisponibleTime] = useState(0);

  // const up = (i) => {
  //   let channels_cp = [...channels];
  //   channels_cp[i].priority += 1;
  //   setChannels([...channels_cp]);
  // }

  // const down = (i) => {
  //   let channels_cp = [...channels];
  //   if (channels_cp[i].priority > 0) {
  //     channels_cp[i].priority -= 1;
  //   }
  //   setChannels([...channels_cp]);
  // }

  const main = () => {
    let channels_cp = [...channels];
    for (let channel of channels_cp) {
      channel.propagate()
    }
    let videos = getAllVideos(channels_cp);
    let playlist = new Playlist(videos);
    console.log(playlist.getOPT(disponibleTime));
  }

  const Videos = (props) => {
    let vids = props.videos;
    let saida = [];
    for(let j = 0; j < vids.length; j++){
      saida.push(
        <tr>
          <td className="video-el">{vids[j].name}</td>
          <td className="video-el">{vids[j].time}</td>
        </tr>
      )
    }

    return saida
  }

  const Channel = () => {
    let res = [];
    for(let i =0; i < 5; i++){
      res.push(
        <div className="channel">
          <text>{channels[i].name}</text>
          <div>
            <text>Prioridade do canal  </text>
            <input className="channelPriority" type="number" onChange={(e) => {channels[i].priority = e.target.valueAsNumber}} defaultValue={channels[i].priority}></input>
          </div>
          <div className="tabela">
            <table>
              <tr>
                <th className="video-el">Vídeo</th>
                <th className="video-el">Tempo</th>
              </tr>
              <Videos videos={channels[i].videos}></Videos>
            </table>
          </div>
        </div>
      )
    }
    return res
  }

  return (
    // <div>
    //   {channels.map((canal, i) => (
    //     <div key={i}>
    //       <button onClick={(e) => up(i)}>aumentar</button>
    //       <p>{canal.name} - {canal.priority}</p>
    //       <button onClick={(e) => down(i)}>diminuir</button>
    //     </div>
    //   ))}
    // </div>
    <div className = "grid-container">
      <div className="header">
        <text className="tittle">
          PD Playlist
        </text>
      </div>
      <div className='setDisponibleTime'>
        <label for="ipt-disponibleTime">Insira seu tempo disponivel (minutos)  </label>
        <input id="ipt-disponibleTime" type="number" onChange={(e) => {setDisponibleTime(e.target.valueAsNumber)}}></input>
        <button onClick={main}>Calcular</button>
      </div>
      <Channel></Channel>
      <div className="resultado">
        resultado
      </div>
    </div>
  );
}

export default App;
