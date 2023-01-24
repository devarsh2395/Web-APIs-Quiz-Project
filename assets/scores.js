
function printScore (){
 let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
 highScores.sort(function(a,b){
    return b.score - a.score
 })
 for (let i = 0; i < highScores.length ; i++){
    let li = document.createElement("li");
    li.textContent = highScores[i].initials + " - " + highScores[i].score;
    let ol = document.querySelector("#high-scores");
    ol.appendChild(li)
 }
}
function clearScore (){
    window.localStorage.removeItem("highScores");
    window.location.reload;
}
document.querySelector("#clear").addEventListener("click", clearScore());

printScore()
