import Channel from './channel';

const data = {
    "EnzoPlays": [
        {name: "A origem e ascensão de yung lixo", time: 17},
        {name: "Plantando bananas #MinePack", time: 18},
        {name: "Invadimos a base inimiga #DayY", time: 22},
        {name: "Explorando o novo planeta #NoWomensSky", time: 26},
        {name: "Modifiquei jogos famosos pra me colocar neles", time: 30},
    ],
    "Ciencia Todo Dia": [
        {name: "E se um Buraco Negro Surgisse na Terra?", time: 9},
        {name: "A Última Estrela do Univeso", time: 11}
    ],
    "CANAL CAPSLOCK": [
        {name: "OLHA o que eu encontrei, VOCÊ NÃO VAI ACREDITAR", time: 12},
        {name: "Por Que NOTEBOOKS são Melhores que PC para JOGOS agora? - CAPSLOCK", time: 15},
        {name: "Deletei a SYSTEM 32 e OLHA NO QUE DEU", time: 16},
        {name: "TROLEI o MEU AMIGO colocado WINDOWS 98 na máquina dele", time: 19},
        {name: "O Retorno do Meu Karma(S02E01) - CAPSLOCK De Ferro REACT", time: 27}
    ],
    "Programo&Dinamico": [
        {name: "Não pode se complexar", time: 2},
        {name: "Menino da mochila", time: 3},
        {name: "Na sola do javascript", time: 4},
        {name: "Banho de codigos", time: 4},
    ],
    "Kurzgesagt - In a Nutshell": [
        {name: "What if World turned to Gold? - The Gold Apocalypse", time: 8},
        {name: "What if We Nuke the Moon?", time: 9},
        {name: "And if we dig a hole to China", time: 11},
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
    console.log(channel_list)
    return channel_list;
}

export default getData();