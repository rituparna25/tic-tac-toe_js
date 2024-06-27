let boxes= document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newGame= document.querySelector(".new-game");
let msgCont = document.querySelector(".msg-container");
let msg= document.querySelector(".msg");
let interval;
let count=0,winner=0;
let turnO = true; //playerX or playerO
let isVisible=true;

let winPat = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count++;
        console.log(count);
        box.style.backgroundColor="lightpink";
        if(turnO===true)//playerO turn
            {
                box.style.color="blue";
                box.innerText="O";
                turnO=false;
            }
        else{
            turnO=true;
            box.innerText="X";
        }
        box.disabled=true;
        checkwinner();
    })
})

const checkwinner = ()=>{
    for(let p of winPat)
        {
            //console.log(p[0],p[1],p[2]);
            //console.log(boxes[p[0]].innerText,boxes[p[1]].innerText,boxes[p[2]].innerText);

            let posVal0=boxes[p[0]].innerText;
            let posVal1=boxes[p[1]].innerText;
            let posVal2=boxes[p[2]].innerText;

            if(posVal0!="" && posVal1!="" && posVal2!="")
                {
                    if(posVal0===posVal1 && posVal1==posVal2)
                        {
                            winner=1;
                            console.log("winner");
                            console.log(p[0],p[1],p[2]);
                            interval= setInterval(()=>{
                                isVisible = !isVisible;
                                boxes[p[0]].style.visibility = isVisible ? 'visible' : 'hidden';
                                boxes[p[1]].style.visibility = isVisible ? 'visible' : 'hidden';
                                boxes[p[2]].style.visibility = isVisible ? 'visible' : 'hidden';}, 500);

                            showWinner(posVal0);
                            break;
                        }
                }
        }
    if(count===9 && winner===0)
        {
            draw();
        }
}

const draw = ()=> {
    msg.innerText=`It's a Draw!!`;
    msgCont.classList.remove("hide");
    newGame.classList.remove("hide");

    for (let box of boxes)
        {
            box.disabled=true;
        }
}


const showWinner = (winner) => {
    msg.innerText=`Winner is Player ${winner}!!`;
    msgCont.classList.remove("hide");
    newGame.classList.remove("hide");

    for (let box of boxes)
        {
            box.disabled=true;
        }
}


const reset_game = () => {
    turnO=true;
    isVisible=true;
    count=0;
    winner=0;
    for (let box of boxes)
        {
            box.disabled=false;
            box.innerText="";
        }
    msgCont.classList.add("hide");
    newGame.classList.add("hide");
    boxes.forEach((box)=>{
        box.style.backgroundColor="#6B5CA5";
        clearInterval(interval);
        box.style.visibility="visible";
    })
}

newGame.addEventListener("click",reset_game);
reset.addEventListener("click",reset_game);