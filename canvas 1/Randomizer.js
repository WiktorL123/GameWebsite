
export class Randomizer {
    static colors = ["firebrick", "seagreen", "dodgerblue", "orange", "yellow", "sienna", "magenta", "gray"];

    static _getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    static getRandomColor() {
        if (this.colors.length === 0)
            return null;

        const randomIndex = this._getRandomIndex(this.colors.length);
        const randomColor = this.colors[randomIndex];
        this.colors.splice(randomIndex, 1);
        return randomColor;
    }
}
