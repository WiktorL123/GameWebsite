
import {Randomizer} from './Randomizer.js'
import {RandomSolutionGenerator} from "./RandomSolutionGenerator";


const canvas=document.getElementById("game_canvas")
const ctx=canvas.getContext("2d")

const PILL_WIDTH=80;
const PILL_HEIGHT=80;


let active_pill=0
let round_no=1

const  ok = new Image(50, 50); ok.src="assets/ok.png"
const  elsewhere = new Image(50, 50); elsewhere.src="assets/elsewhere.png"
const  none = new Image(50, 50); none.src="assets/none.png"



 //let colors = ["firebrick", "seagreen", "dodgerblue", "orange", "yellow", "sienna", "magenta", "gray"];
let colors=RandomSolutionGenerator.createColors()
let solution = []
let state = ["empty", "empty", "empty", "empty", "empty"];




// function generateRandomColors(){
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
// function createColors(){
//     const colors = [];
//     for (let i = 0; i < 8; i++) {
//         const randomColor = generateRandomColors();
//         colors.push(randomColor);
//     }
//     return colors;
// }

for(let i=0; i<8; i++){
    let name="#c"+(i+1);
    let elem=document.querySelector(name);
    console.log(name)
    elem.style.backgroundColor=colors[i]
    elem.addEventListener("click", guess, false)
    elem.color=colors[i]
}



function guess(evt) {
    //alert(evt.currentTarget.color)
        if(active_pill>=0&&active_pill<=4){
            let pill_color=evt.currentTarget.color
            drawPill(100+active_pill*100, 50, pill_color )
            state[active_pill]=pill_color
                 if(active_pill<4) active_pill++
                else checkBoard()
            drawArrow()
    }

}

function checkLastTrial() {
    for (let i = 0; i < 5; i++) {
        if (state[i] === solution[i])
            ctx.drawImage(ok, 115 + i * 100, 360)
        else {
            let inny_spot = false
            for (let j = 0; j < 5; j++)
                if (state[i] === solution[j]) inny_spot = true
            if (inny_spot)
                ctx.drawImage(elsewhere, 115 + i * 100, 360)
            else
                ctx.drawImage(none, 115 + i * 100, 360)

        }
    }
}

function drawBlackRec(x, y, w, h){
    ctx.fillStyle="black"
    ctx.fillRect(x, y, w, h)
}

function checkBoard() {
    console.log("stan:"+state);
    active_pill=0;
    startBoard();
    drawArrow()
    //rysuj osatnia probe
    for (let i = 0; i < 5; i++) 
        drawPill(100+i*100, 250, state[i])

    drawBlackRec(100, 350, 480, 80)


    //ocen ostatnia probe
    checkLastTrial()

        let win=isWin()
        won(win)

}
        function isWin(){
            let win=true
            for (let i = 0; i <5 ; i++)
                if(state[i]!==solution[i]) win=false
            return win

        }
        function won(win){

            if(win){
                drawBlackRec(80, 20, 550, 200)
                // ctx.fillStyle="black"
                // ctx.fillRect(80, 20, 550, 200)
                active_pill=-999
                drawArrow()

                ctx.fillStyle="orange"
                ctx.font="78px Arial"
                ctx.fillText("WYGRAŁEŚ", 160, 130)
                document.querySelector(".comment").innerHTML="Udało ci sie wygrać w rundzie numer "
                    + round_no
                for (let i = 0; i < 8; i++) {
                    let name= "#c"+(i+1)
                    let elem =document.querySelector(name)
                    elem.style.display="none"
                }
                document.querySelector("#delete").style.display="none"

                document.querySelector(".controls").style.fontsize="40px"
                document.querySelector(".controls").innerHTML="<span id='again'>Zagraj ponownie</span>"
                document.querySelector("#again").style.cursor="pointer"
                document.querySelector("#again").addEventListener(
                    "click", function (){window.location.reload()}, false)

            }
            else {
                round_no++
                drawScore()
            }
        }





function drawPill(x, y, type) {
    drawBlackRec(x-5, y-5, PILL_WIDTH+10, PILL_HEIGHT+10)




    if(type==="empty"){
        ctx.strokeStyle="white"

        ctx.strokeRect(x, y, PILL_WIDTH, PILL_HEIGHT)
    }
    else {
        ctx.fillStyle=type
        ctx.fillRect(x, y, PILL_WIDTH, PILL_HEIGHT)
    }

}

function drawArrow() {

    drawBlackRec(100, 140, 480, 60)


    ctx.fillStyle="white"
    ctx.font="32px Arial"
    ctx.fillText('↑', 135+active_pill*100, 180)
}

function startBoard(){
    drawBlackRec(90, 40, 500, 100)




    for (let i = 0; i < 5; i++) {
        drawPill(100+i*100, 50, "empty")

    }

    for (let i = 0; i < 5; i++) {
        let color=Randomizer.getRandomColor()
        if(color!==null){
            solution.push(color)
        }
        else {
            break
        }

    }

    drawArrow()
    console.log(solution)
}



window.addEventListener('load', function () {
    startBoard()//<- funkcja anonimowa wywolujaca startBoard
      drawScore()
})

function resetPill() {
    if(active_pill>0){
        drawPill(100+(active_pill-1)*100, 50, "empty")
        state[active_pill-1]="empty"
        console.log("resetPill:"+state)
        active_pill--
        drawArrow()
    }
}

function drawScore() {
    drawBlackRec(640, 40, 110, 130)


    ctx.strokeStyle="orange"
    ctx.beginPath()
    ctx.arc(692, 90, 45, 0, 2*Math.PI)
    ctx.stroke()

    ctx.fillStyle="orange"
    ctx.font="44px Arial"
    if(round_no<10)
        ctx.fillText(round_no, 680, 105)
    else
        ctx.fillText(round_no, 670, 105)

    ctx.font="20px Arial"
    ctx.fillText("Runda", 660, 165)
}
function showHelp(){
    document.querySelector('.help').style.display="block"
}
function closeHelp(){
    document.querySelector('.help').style.display="none"
}

document.querySelector('#delete').addEventListener('click', resetPill, false)
document.querySelector('#help').addEventListener("click", showHelp, false)
document.querySelector('#closehelp').addEventListener('click', closeHelp, false)