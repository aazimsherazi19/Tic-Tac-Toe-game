let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg")


let count = 0;
let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = ()=>{
  turn0 = true;
  enabledBoxes();
  msgContainer.classList.add("hide");
  
}

const color = ()=>{
  for(let box of boxes){
    if (box.innerText === "X"){
      box.classList.add("black")
    } 
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
      count = count + 1;
      
    } else {
      box.innerText = "X";
      turn0 = true;
      count = count + 1;
      
    }
    color();
    box.disabled = true;
    checkWinner();
    
  });
});
const disabledBoxes = ()=>{
  for (let box of boxes){
    box.disabled = true;
  }
}
const enabledBoxes = ()=>{
  for (let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}
const ShowWinner = (winner)=>{
   msgContainer.classList.remove("hide");
   msg.innerText = `Congratulations, Winner is ${winner}`;
   disabledBoxes();
} 

const drawn = ()=>{
  msg.innerText = "Oops, Match has drawn";
  msgContainer.classList.remove("hide");
  disabledBoxes();
}

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if(pos1val != "" && pos2val != "" && pos3val != ""){
      if(pos1val === pos2val && pos2val === pos3val){
       ShowWinner(pos1val);
        console.log(`winner ${pos1val}`)
      } else if (count === 9 && (pos1val != pos2val || pos2val != pos3val)){
        drawn();
      }
      }
    }
  }
  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);

