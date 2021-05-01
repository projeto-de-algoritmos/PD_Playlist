class Playlist {

    items;
    M;
    solution;

    // M[item][peso_restante]

    constructor(items) {
        this.items = [0, ...items];
        this.M = [];
        this.solution = [];
    }

    setM(totalWeight) {
        for (let i = 0; i < this.items.length; i++) {
            this.M[i] = Array(totalWeight+1);
        }
    }

    getOPT(totalWeight) {
        this.setM(totalWeight);
        this.knapsack();
        this.findSolution(this.items.length-1, totalWeight);
        return this.solution;
    }

    knapsack() {
        let num_weights = this.M[0].length-1;
        let num_items = this.M.length-1;

        for (let i = 0; i <= num_weights; i++) {
            this.M[0][i] = 0;
        }

        for (let i = 0; i <= num_items; i++) {
            this.M[i][0] = 0;
        }

        for (let i = 1; i <= num_items; i++) {
            for (let w = 1; w <= num_weights; w++) {
                if (this.items[i].weight > w) {
                    this.M[i][w] = this.M[i-1][w]
                }
                else {
                    this.M[i][w] = this.max(this.M[i-1][w], 
                                            this.items[i].value + this.M[i-1][w-this.items[i].weight]);
                }
            }
        }
        
    }

    max(a, b) {
        if (a > b) return a;
        return b;
    }

    findSolution(i, w) {
        if (this.M[i][w] == 0) return;
        if (this.M[i-1][w-this.items[i].weight] + this.items[i].value == this.M[i][w]) {
            this.solution.push(this.items[i]);
            this.findSolution(i-1, w-this.items[i].weight);
        }
        else {
            this.findSolution(i-1, w);
        }
    }

}

// items = [
//     {weight: 1, value: 1},
//     {weight: 2, value: 6},
//     {weight: 5, value: 18},
//     {weight: 6, value: 22},
//     {weight: 7, value: 28}
// ]

// let teste = new Playlist(items)
// console.log(teste.getOPT(11));

export default Playlist;