import Channel from './channel';

const data = {
    "GEMAPLYS": [
        {name: "a origem e ascensão de yung lixo", time: 17},
        {name: "modifiquei jogos famosos pra me colocar neles", time: 30},
    ],
    "Ciencia Todo Dia": [
        {name: "E se um Buraco Negro Surgisse na Terra?", time: 9},
        {name: "A Última Estrela do Univeso", time: 11}
    ],
    "CANAL CAPSLOCK": [
        {name: "Por Que NOTEBOOKS são Melhores que PC para JOGOS agora? - CAPSLOCK", time: 15},
        {name: "O Retorno do Meu Karma(S02E01) - CAPSLOCK De Ferro REACT", time: 27}
    ],
    "Kurzgesagt - In a Nutshell": [
        {name: "What if World turned to Gold? - The Gold Apocalypse", time: 9},
        {name: "What if We Nuke the Moon?", time: 8}
    ]
}

function getData() {
    let channel_names = Object.keys(data);
    let channel_list = [];
    for (let name of channel_names) {
        let channel = new Channel(name, data[name]);
        for (let video of channel.videos) {
            video.channel = name;
        }
        channel_list = [...channel_list, channel];
    }
    for (let channel of channel_list) {
        channel.propagate()
    }
    return channel_list;
}

export default getData;