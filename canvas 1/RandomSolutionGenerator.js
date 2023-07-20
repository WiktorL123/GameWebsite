export class RandomSolutionGenerator{

    static  _generateRandomColors(){
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static createColors(){
        const colors = [];
        for (let i = 0; i < 8; i++) {
            const randomColor = RandomSolutionGenerator._generateRandomColors();
            colors.push(randomColor);
        }
        return colors;
    }

}