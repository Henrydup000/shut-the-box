// global variables
// dice
const dice1 = document.querySelector(`#dice1`);
const dice2 = document.querySelector(`#dice2`);

//buttons
const startBtn = document.querySelector(`#start-btn`);
const indvBtn = document.querySelector(`#indv-btn`);
const sumBtn = document.querySelector(`#sum-btn`);
const endBtn = document.querySelector(`#end-btn`);
const rollBtn = document.querySelector(`#roll-btn`);
const turnH2 = document.querySelector(`#turn`);
const restartBtn = document.querySelector(`#restart-btn`);

//inputs

const playerInput1 = document.querySelector(`#player1-input`);
const playerInput2 = document.querySelector(`#player2-input`);

// box array
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// updated variables
let turn = 1;
let round = 1;
let die1Number = 0;
let die2Number = 0;
let player1Total = 0;
let player2Total = 0;
let player1Name ='hi';
let player2Name ='hi';

// display variables
const playerDiv = document.querySelector(`.players`);
const boardDiv = document.querySelector(`.board`);
const diceDiv = document.querySelector(`.dice`);
const scorecardDiv = document.querySelector(`.scorecard`);
const winDiv = document.querySelector(`.winner`);

// hide display
boardDiv.style.display = 'none';
diceDiv.style.display = 'none';
scorecardDiv.style.display = 'none';
winDiv.style.display = 'none';

// start game event listener
startBtn.addEventListener(`click`, function(){
    if(playerInput1.value.trim() && playerInput2.value.trim()){
        player1Name = playerInput1.value.trim();
        player2Name = playerInput2.value.trim();
        rollBtn.disabled = false;
        boardDiv.style.display = 'block';
        diceDiv.style.display = 'block';
        scorecardDiv.style.display = 'block';
        playerDiv.style.display = 'none';
        document.querySelector(`#sc-name1`).textContent = player1Name;
        document.querySelector(`#sc-name2`).textContent = player2Name;
        turnH2.textContent = `${player1Name}'s Turn`;
        document.querySelector(`#vs-h2`).textContent = `${player1Name} vs. ${player2Name}`;
    } else {
        alert(`You do not have a valid name input, please try agian.`)
       }
}) // end of event listener

// start of rollBtn event listener
rollBtn.addEventListener(`click`, function(){
   die1Number = Math.floor(Math.random() * 6 ) + 1;
   die2Number = Math.floor(Math.random() * 6 ) + 1;
   document.querySelector(`#dice1`).className = `bi bi-dice-${die1Number}`;
   document.querySelector(`#dice2`).className = `bi bi-dice-${die2Number}`;

   if(die1Number === die2Number || boxes[die1Number] === "X" || boxes[die2Number] === "X"){
    indvBtn.disabled = true;
   }else{
    indvBtn.disabled = false;
   };

   if((die1Number + die2Number) > 9 || boxes[(die1Number + die2Number)] === "X"){
    sumBtn.disabled = true;
   }else{
    sumBtn.disabled = false;
   }

   if(indvBtn.disabled && sumBtn.disabled){
    endBtn.disabled = false;
   }

   document.querySelector(`#dice-sum`).textContent = `Sum: ${die1Number+die2Number}`
   rollBtn.disabled = true;
}) // end of event listener

//start of indvBtn event listener
indvBtn.addEventListener(`click`, function(){
    shut(die1Number);
    shut(die2Number);
    boxes[die1Number] = 'X';
    boxes[die2Number] = 'X';
    boxes[0] = boxes[0] + (die1Number + die2Number);
    indvBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
}); // end of indvBtn event listner

//start of sumBtn event listener
sumBtn.addEventListener(`click`, function(){
    shut((die1Number + die2Number));
    boxes[(die1Number + die2Number)] = 'X';
    boxes[0] = boxes[0] + (die1Number + die2Number);
    indvBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;

}); // endo of sumBtn event listener

//start of endTurn event listener
endBtn.addEventListener(`click`,function(){
    if (turn === 1){
        let p1Pt = 45 - boxes[0];
        player1Total = player1Total + p1Pt;
        document.querySelector(`#tbody`).insertAdjacentElement(`beforeend`, buildRow(round, p1Pt));
        turn = 2;
        turnH2.textContent = `${player2Name}'s Turn`
        resetBoard();
    } else{
        let p2Pt = 45 - boxes[0];
        player2Total = player2Total + p2Pt;
        document.querySelector(`#round${round} .p2Pts`).textContent = p2Pt;
        round = round + 1
        if(round === 6){
            gameOver(player1Total, player2Total);
        }
        document.querySelector(`#round`).textContent = `Round ${round}`;
        turnH2.textContent = `${player1Name}'s Turn`;
        resetBoard();
        turn = 1;
    }
    endBtn.disabled = true;
    rollBtn.disabled = false;
}); //end of endBtn event listener

//start of new game button event listener
restartBtn.addEventListener(`click`, function(){
    boxes.fill(0);
    round = 1;
    turn = 1;
    player1Total = 0;
    player2Total = 0;
    playerDiv.style.display = 'block';
    boardDiv.style.display = 'none';
    diceDiv.style.display = 'none';
    scorecardDiv.style.display = 'none';
    winDiv.style.display = 'none';
    die1Number = 1;
    die2Number = 1;
    document.querySelector(`#dice1`).className = `bi bi-dice-${die1Number}`;
    document.querySelector(`#dice2`).className = `bi bi-dice-${die2Number}`;
    document.querySelector(`#dice-sum`).textContent = `Sum: ${die1Number+die2Number}`
    document.querySelector(`#round`).textContent = `Round ${round}`;
    document.querySelector(`#tbody`).textContent = ``;
}); //end of restartBtn event listener

//start of shut function
function shut(boxNumber){
    document.querySelector(`#box${boxNumber}`).classList.add(`shut`);
    document.querySelector(`#box${boxNumber}`).textContent = `X`;
}; // end of shut function

//start of buildRow function
function buildRow(round, pts){
    const tr = document.createElement(`tr`)
    tr.setAttribute(`id`,`round${round}`)
    const th = document.createElement(`th`)
    th.textContent = `Round ${round}`
    const td1 = document.createElement(`td`)
    td1.classList.add(`p1Pts`)
    td1.textContent = pts;
    const td2 = document.createElement(`td`)
    td2.classList.add(`p2Pts`)

    tr.insertAdjacentElement(`beforeend`, th);
    tr.insertAdjacentElement(`beforeend`, td1);
    tr.insertAdjacentElement(`beforeend`, td2);

    return tr;
}; //end of buildRow function

//start of resetBoard function
function resetBoard(){
    boxes.fill(0);
    for(let i = 1; i < boxes.length; i++){
        if(document.querySelector(`#box${i}`).classList.contains(`shut`)){
            document.querySelector(`#box${i}`).classList.remove(`shut`);
        }
        document.querySelector(`#box${i}`).textContent = i;

    }
}; //end of resetBoard function

//start of gameOver function
function gameOver(p1PtTotal, p2PtTotal){
    boardDiv.style.display = 'none';
    diceDiv.style.display = 'none';
    winDiv.style.display = 'block';
    if(p1PtTotal < p2PtTotal){
        document.querySelector(`#winner`).textContent = `The WINNER is ${player1Name}! ${player1Name} scored ${p1PtTotal} points while ${player2Name} scored ${p2PtTotal} points.`
    }else if(p2PtTotal < p1PtTotal){
        document.querySelector(`#winner`).textContent = `The WINNER is ${player2Name}! ${player2Name} scored ${p2PtTotal} points while ${player1Name} scored ${p1PtTotal} points.`
    }else{
        document.querySelector(`#winner`).textContent = `The game is a tie! You both scored ${p1PtTotal} points.`
    };

}; // end of gameOver function
