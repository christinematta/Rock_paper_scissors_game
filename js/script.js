// cashing the Dom

let userScore=0;
let compScore=0;
const userScore_span=document.getElementById("user-score");
const compScore_span=document.getElementById("comp-score");
const scoreBoard_div=document.querySelector(".score-board");
const result_p=document.querySelector(".result > p");
const rock_div=document.getElementById("user-img");
const paper_div=document.getElementById("message");
const scissors_div=document.getElementById("comp-img");
const btnElement = document.getElementById("action-message");


function getComputerChoice(){
    const choices = ['r','p','s'];
    const randomNumber= Math.floor(Math.random()*3);
    let compChoice= choices[randomNumber];
    
    if(compChoice === "r"){
        changeImage('scissors','./imgs/rock.png','comp-img','rock');
    }
    
    if(compChoice === "p"){
        changeImage('scissors','./imgs/paper.png','comp-img','paper');
    }
    
    if(compChoice === "s"){
        changeImage('scissors','./imgs/scissors.png','comp-img','scissors');
    }
    return compChoice;
        
}

function convertToWord(leter){

    if (leter ==="r") return "Rock";
    if(leter === "p") return "Paper";
    else return "Scissors";

}

function win(userChoice , computerChoice){
userScore++;
compScore;
userScore_span.innerHTML=userScore;
result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. `;
removeMiddleImg("paper", "You win!");
toggleClick("none");


}
function lose(userChoice , computerChoice){
compScore++;
userScore;
compScore_span.innerHTML=compScore;
result_p.innerHTML= `${convertToWord(computerChoice)} beats ${convertToWord(userChoice)}.`;
removeMiddleImg("paper", "You lose!");
toggleClick("none");

}
function draw(userChoice , computerChoice){
compScore;
userScore;
result_p.innerHTML= `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}.`;
removeMiddleImg("paper", "You draw!");
toggleClick("none");
}

function toggleClick(value){

rock_div.style.pointerEvents = value;
paper_div.style.pointerEvents = value;
scissors_div.style.pointerEvents = value;
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":   
        win(userChoice , computerChoice);
        break;

        case "rp":
        case "ps":
        case "sr":  
        lose(userChoice , computerChoice); 
        break;

        case "rr":
        case "pp":
        case "ss": 
        draw(userChoice , computerChoice);
        break;


    }  
}
function changeImage(oldimgId, imgSrc, containerId,newImgId){

    removeImage(oldimgId);
    appendImage(imgSrc, containerId, newImgId);

}
function main(){


    rock_div.addEventListener('click', function(){
      game("r");
      changeImage("rock",'./imgs/rock.png','user-img','rock');
    })
    
    paper_div.addEventListener('click', function(){
        game("p");
        changeImage("rock",'./imgs/paper.png','user-img','paper');   
    })
    
    scissors_div.addEventListener('click', function(){
        game("s");
        changeImage("rock",'./imgs/scissors.png','user-img','scissors');    
    })
    
}
function removeImage(imageId) {
    let elementToBeRemoved = document.getElementById(imageId);
    elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);
    document.getElementById("action-message").firstChild.data = "Retry!"
}
function appendImage(imageSource, containerId, imageId) {
    let img = document.createElement("img");
    img.src = imageSource;
    img.setAttribute('id', imageId);
    img.setAttribute('style','width: 100px;height: 100px;' )
    document.getElementById(containerId).appendChild(img);
    return imageId;
}

function clearChoices(elementID) { 
    var div = document.getElementById(elementID); 
      
    while(div.firstChild) { 
        div.removeChild(div.firstChild); 
    } 
    
     document.getElementById("action-message").firstChild.data= "Make your move";
} 

function removeMiddleImg(imageId, result){
    let elementToBeRemoved = document.getElementById(imageId);
    elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);

    toggleClasses("message","choice");
    let h1=document.createElement('h1');
    let textResult = document.createTextNode(result);
    h1.appendChild(textResult);
    document.getElementById('message').appendChild(h1); 
}

function toggleClasses(addedClass,removedClass){
    document.getElementById("message").classList.remove(removedClass);
    document.getElementById("message").classList.add(addedClass);
}
function toggelButton(){

    if (document.getElementById("message").classList.contains("choice"))
    {
        btnElement.firstChild.data = "Make your move";
    }

    else{
        btnElement.firstChild.data = "Retry!";
        reset(); 
    }
}
function resetImg(divId,imgSrc,imgId){
    clearChoices(divId);
    appendImage(imgSrc,divId,imgId);
}

function reset(){
        toggleClick("auto");

        resetImg("user-img",'./imgs/rock.png','rock');
        resetImg("message",'./imgs/paper.png','paper');
        toggleClasses("choice","message");
        resetImg("comp-img",'./imgs/scissors.png','scissors');


}


main();

