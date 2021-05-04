
class Channel {

    name;
    videos;
    priority;

    constructor(name, videos) {
        this.name = name;
        this.videos = [...videos];
        this.priority = 0;
    }

    propagate() {
        for (let video of this.videos) {
            video.priority = this.priority;
        }
    }

    getVideos() {
        return this.videos;
    }

}

function getAllVideos(channels) {
    let videos = [];
    for (let channel of channels) {
        videos = [...videos, ...channel.getVideos()]
    }
    return videos;
}

export default Channel;
export {getAllVideos};