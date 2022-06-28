var gamepattern=[];
var colors=["green","red","yellow","blue"];
var userpattern=[];
function nextsequence()
{
    level++;
    $("h1").text("LEVEL "+level);
    userpattern=[];
    var colorno=Math.floor(Math.random()*4);
    var nextcolor=colors[colorno];
    gamepattern.push(nextcolor);
    $("#"+nextcolor).fadeOut(100).fadeIn(100);
    playsound(nextcolor);
    
}
function playsound(nextcolor)
{
    var audio=new Audio("sounds/"+nextcolor+".mp3");
    audio.play();
}
function animatepress(anycolor)
{
    $("#"+anycolor).addClass("pressed");
    setTimeout(function(){
        $("#"+anycolor).removeClass("pressed");
    },100);
}
var started=false;
var level=0;
$(document).keypress(function(event)
{
    if(started===false){
    $("h1").text("LEVEL 0");
    level=0;
    nextsequence();
    started=true;
    }
})
$(".btn").click(function(event){
    var usercolor=(event.target.id);
    userpattern.push(usercolor);
    animatepress(usercolor);
    playsound(usercolor);
    checksequence(userpattern.length-1);
});
function checksequence(level)
{
    if(userpattern[level]===gamepattern[level]){
    if(level+1===gamepattern.length){
        setTimeout(nextsequence,1000);
    }
    }
    else
    {
        $("body").addClass("game-over");
        var audio2=new Audio("sounds/wrong.mp3");
        audio2.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
            started=false;
            gamepattern=[];
            level=0;
            userpattern=[];
            $("h1").text("Game Over, Press Any Key to Restart!");
        },200);
    }
}
