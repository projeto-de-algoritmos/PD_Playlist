class Playlist {

    videos;
    M;
    solution;

    // M[item][peso_restante]

    constructor(videos) {
        this.videos = [0, ...videos];
        this.M = [];
        this.solution = [];
    }

    setM(totalTime) {
        for (let i = 0; i < this.videos.length; i++) {
            this.M[i] = Array(totalTime+1);
        }
    }

    getOPT(totalTime) {
        this.setM(totalTime);
        this.knapsack();
        this.findSolution(this.videos.length-1, totalTime);
        return this.solution;
    }

    knapsack() {
        let num_times = this.M[0].length-1;
        let num_videos = this.M.length-1;

        for (let i = 0; i <= num_times; i++) {
            this.M[0][i] = 0;
        }

        for (let i = 0; i <= num_videos; i++) {
            this.M[i][0] = 0;
        }

        for (let i = 1; i <= num_videos; i++) {
            for (let w = 1; w <= num_times; w++) {
                if (this.videos[i].time > w) {
                    this.M[i][w] = this.M[i-1][w]
                }
                else {
                    this.M[i][w] = this.max(this.M[i-1][w], 
                                            this.videos[i].priority + this.M[i-1][w-this.videos[i].time]);
                }
            }
        }
        
    }

    max(a, b) {
        if (a > b) return a;
        return b;
    }

    findSolution(i, w) {
        if (i <= 0) return;
        if (this.M[i-1][w-this.videos[i].time] + this.videos[i].priority === this.M[i][w]) {
            this.solution.push(this.videos[i]);
            this.findSolution(i-1, w-this.videos[i].time);
        }
        else {
            this.findSolution(i-1, w);
        }
    }

}

// videos = [
//     {time: 1, priority: 1},
//     {time: 2, priority: 6},
//     {time: 5, priority: 18},
//     {time: 6, priority: 22},
//     {time: 7, priority: 28}
// ]

// let teste = new Playlist(videos)
// console.log(teste.getOPT(11));

export default Playlist;