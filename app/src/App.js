import './App.css';

import {getAllVideos} from './structures/channel';
import getData from './structures/data';
import Playlist from './structures/playlist';

import React, {useState} from 'react';

function App() {
  
  const [channels, setChannels] = useState(getData);
  const [disponibleTime, setDisponibleTime] = useState(0);
  const [opt, setOpt] = useState([]);

  const main = () => {
    let channels_cp = [...channels];
    for (let channel of channels_cp) {
      channel.propagate()
    }
    let videos = getAllVideos(channels_cp);
    let playlist = new Playlist(videos);
    setOpt(playlist.getOPT(disponibleTime));
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

  const Row = (props) => {
    console.log(props.list);
    console.log(typeof props.chave, props.chave)
    if(props.list.length == 0){
      return null
    }
    let res = [];
    let lista = props.list;
    let chave = props.chave;
    for(let i = 0; i < lista.length; i++){
      console.log(lista[i][chave])
      res.push(
        <td>
          {lista[i][chave]}
        </td>
      )
    }
    return res
  }

  return (
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
        <table>
          <tr>
            <th>
              Canal
            </th>
            <Row list={opt} chave="channel"></Row>
          </tr>
          <tr>
            <th>
              Vídeo
            </th>
            <Row list={opt} chave="name"></Row>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
