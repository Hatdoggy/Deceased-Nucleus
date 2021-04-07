import info,* as func  from "./sample.js"

$(document).ready(()=>{
const ready = $("#readyBtn");
const board = $("#board");
const cardCont = $(".card-cont");
let user = [];
let ai = {
  one:[],
  two:[],
  three:[]
};
let round = 0;
let playAgain = false;
let block = false;
let selected = false;
let userBlock = false;
let defeat = {
  one:false,
  two:false,
  three:false
};

const suc = new Audio('https://dl.dropbox.com/s/05oyx1mvawozwdj/Win.wav');
const def = new Audio('https://dl.dropbox.com/s/c85w733ud3rxxna/Lost.wav');
const cyt = new Audio('https://dl.dropbox.com/s/168iw1gosdvelx7/Cytosol.mp3');
const nuc = new Audio('https://dl.dropbox.com/s/dg4xvl20omuigr6/Nucleus.mp3');
const mit = new Audio('https://dl.dropbox.com/s/jmvt8udz5otuk7b/Mito.mp3');
const ran = new Audio('https://dl.dropbox.com/s/fktip0t46fwfs55/Random.mp3');
const rib = new Audio('https://dl.dropbox.com/s/lufn8q5xjndz3g7/ribo.mp3');


let ret = {
    value: '',
    get testVar() {
      return this.value;
    },
    set testVar(value) {
      console.log("You went here");
      $("div .user-card").css("cursor","default");
      this.value = value;
      if($(this)[0].value === "curUser"){
        check(generate("user"),user);
        check(generate("user"),user);
        display();
      }else if($(this)[0].value === "player2"){
        check(generate("player2"),ai.one);
        check(generate("player2"),ai.one);
      }else if($(this)[0].value === "player3"){
        check(generate("player3"),ai.two);
        check(generate("player3"),ai.two);
      }else{
        check(generate("player4"),ai.three);
        check(generate("player4"),ai.three);
      }
      upd();
    }
  }

const checkPlayer = (player,cur)=>{
  let find;

  if(player==="player2"){
    let del = Math.floor(Math.random()*ai.one.length);
    find = ai.one.splice(del,1);
  }else if(player==="player3"){
    let del = Math.floor(Math.random()*ai.two.length);
    find = ai.two.splice(del,1);
  }else if(player==="player4"){
    let del = Math.floor(Math.random()*ai.three.length);
    find = ai.three.splice(del,1);
  }else{
    console.log("You went here");
    let del = Math.floor(Math.random()*user.length);
    console.log(del);
    find = user.splice(del,1);
  }
    cur.push(find[0]);
    func.roughDisplay(user);
    sample();
}

const getRandom = (length)=>{
  return Math.floor(Math.random()*(length));
}

const cytoSee = (target,targets,modal)=>{
 let arr = [];
  if(target==="player2"){
    for(let x=0; x<3;x++){
      arr.push(ai.one[getRandom(ai.one.length-2)]);
    }
  }else if(target==="player3"){
    for(let x=0; x<3;x++){
      arr.push(ai.two[getRandom(ai.two.length-2)]);
    }
  }else if(target==="player4"){
    for(let x=0; x<3;x++){
      arr.push(ai.three[getRandom(ai.three.length-2)]);
    }
  }else{
    for(let x=0; x<3;x++){
      arr.push(user[getRandom(user.length-2)]);
    }
  }
  func.cytoDisp(arr);
  modal();

};

const handler = (clicked,targets,curPlayer)=>{
  clicked = clicked.replace(/\s+/g, '');
  switch (clicked) {
    case "Mitochondria":
        let ndx;
        $("#deck").unbind();
        if (curPlayer === user) {
          ndx=func.remove(user,get,"Mitochondria");
            if(ndx!=-1){
              user.splice(ndx,1);
              display();
              mit.play();
            func.Mitochondria(targets,user,ai,ret,true);
          }
        }else{
          ndx=func.remove(curPlayer,get,"Mitochondria");
          curPlayer.splice(ndx,1);
          console.log(curPlayer);
          mit.play();
          func.Mitochondria(targets,curPlayer,ai,ret,false);
        }
        $("#deck").click(draw);
         break;
    case "Centriole":
          console.log("Centriole");
          $("#deck").unbind();
          curPlayer.splice(func.remove(curPlayer,get,"Centriole"),1);
          ran.play();
          func.cut();
          if(curPlayer==user){
            func.roughDisplay(user);
            sample();
          }
          $("#deck").click(draw);
         break;
    case "CellMembrane":
          console.log("Cell Membrane");
          $("#deck").unbind();
          if(curPlayer===user){
            block = true;
            user.splice(func.remove(user,get,"Cell Membrane"),1);
            func.roughDisplay(user);
            sample();
            func.CellMembrane($("#player2"),block,"user");
          }else if(curPlayer===ai.three){
            userBlock = true;
            curPlayer.splice(func.remove(curPlayer,get,"Cell Membrane"),1);
            func.CellMembrane(curUser,userBlock,curPlayer);
            $(curUser).children().unbind();
          }
         $("#deck").click(draw);
         break;
    case "Cytoskeleton":
          $("#deck").unbind();
          curPlayer.splice(func.remove(curPlayer,get,"Cytoskeleton"),1);
          cyt.play();
          if(curPlayer==user){
            func.Cytoskeleton(targets,check,generate,ai,"user");
          }else{
            func.Cytoskeleton(targets,check,generate,ai,curPlayer,user);
          }
          func.roughDisplay(user);
          sample();
          upd();
          $("#deck").click(draw);
          break;
    case "GolgiApparatus"://RECHECK THIS
          console.log("Golgi");
          $("#deck").unbind();
            func.GolgiApparatus(curPlayer,get,function(retVal){
              ran.play();
              curPlayer.splice(retVal,1);
              check(generate("curPlayer"),curPlayer);

              if(curPlayer===user){
                func.roughDisplay(user);
                sample();
              }

              $("#deck").click(draw);
            });
         break;
    case "RoughER":
          console.log("Rough");
          $("#deck").unbind();
          curPlayer.splice(func.remove(curPlayer,get,"RoughER"),1);
          check(generate("curPlayer"),curPlayer);
              if(curPlayer===user){
                func.roughDisplay(user);
                sample();
              }
          $("#deck").click(draw);
         break;
    case "Ribosome":
          if(Array.isArray(func.ribo(curPlayer))){
          rib.play();
          $("#deck").unbind();
            for(let x=0;x<2;x++){
              curPlayer.splice(func.remove(curPlayer,get,"Ribosome"),1);
            }
              if(curPlayer===user){
                func.roughDisplay(user);
                sample();
              }
            func.Ribosome(targets,curPlayer,user,function(find){
              console.log("Check this: "+find);
              checkPlayer(find,curPlayer);
              $("#deck").click(draw);
              upd();
            });

          }else{
            console.log("NO");//set error or notify user nga kuwang
          }
         break;
    case "Cytosol":

          if(curPlayer===user){
            $("#deck").unbind();

            user.splice(func.remove(user,get,"Cytosol"),1);
            func.Cystosol(targets,function(target){
              cytoSee(target,targets,()=>{
                  cyt.play();
                  $("#myModal").fadeIn("fast");
                  $("#deck").attr("src","./Images/BackOfCard.jpg");
              });
            });
            func.roughDisplay(user);
            sample();
            $("#deck").click(draw);
          }
         break;
    default:
        console.log("Error Detected");
  }
};

$(".close").click(()=>{
  playAgain?$("#lose").fadeOut("fast"):$("#myModal").fadeOut("fast");
  $("#card-cont").empty();
  $("#message").empty();
});

const sample = ()=>{
  if(userBlock){
    turnDelay();
  }else{
    $("#curUser").children().click((e)=>{
      let siblings = $(e.target).parent().parent().siblings();
      handler($(e.target).attr("alt"),siblings,user);
    });
  }
}

const display = (value)=>{
  if($("#curUser").children().length === 0){
    user.map((e)=>{
      let alt = e.split("/");
      alt = alt[2].split(".");
      $("#curUser").append(`
        <div class="">
          <img src="${e}" alt="${alt[0]}" class="flex play-card p-right-5 p-bot-5" />
        </div>
      `);
    });
    sample();
  }
  else{
  $("#curUser").empty();
    user.map((e)=>{
      let alt = e.split("/");
      alt = alt[2].split(".");
      $("#curUser").append(`
        <div class="">
          <img src="${e}" alt="${alt[0]}" class="flex play-card p-right-5 p-bot-5" />
        </div>
      `);
    });
    sample();
  }
}

const generate = (player)=>{
  let d = Math.random();
  let ret;
  if(d<0.4){
    ret = 10;
  }else{
    ret = Math.floor(Math.random()*(info.length-2));
  }
  return ret;
}

const reset = ()=>{
    user = [];
    ai = {
      one:[],
      two:[],
      three:[]
    };
  for(let x = 0 ; x<3;x++){
    $("#curUser").append(`
      <div class="">
        <img src="./Images/BackOfCard.jpg" alt="BackOfCard.jpg" class="flex play-card p-right-5 p-bot-5" />
      </div>
    `);
  }
};

let end = false;

const mes = (res)=>{
  if(!end){
    $("#lose").fadeIn("fast");
    res?suc.play():def.play();
    $("#message").append(`
        <h1 class="font-desc flex p-20 flex-jc-ce">You ${res?"Won":"Lost"}</h1>
    `);
  }
}

const restart = ()=>{

      user = [];
      ai = {
        one:[],
        two:[],
        three:[]
      };
      defeat = {
        one:false,
        two:false,
        three:false
      }
      $("#message").empty();
      $("#deck").attr("src","./Images/BackOfCard.jpg");
      $("#curUser").empty();
      setTimeout(()=>{
        reset();
      },1000);
      playAgain = true;
      block = false;
      upd();
      round=0;
      $("#board").fadeOut("slow");
      $("#readyBtn").show("slow");
      $(".reset").hide("fast");
      $("#lose").fadeOut("fast");
};

const win = ()=>{
  let x=0;
  for (const [key, value] of Object.entries(defeat)) {
    if(value){
      x++;
    }
  }
  if(x==3){
    mes(true);
  }
}

/*gameOver() displays the game over modal when game is over*/

const gameOver = (player,cur)=>{

  if(user.length!=0&&player==="user"){
    $(".reset").css("color","#f35230");
    mes(false);
    reset();
  }else{
    switch (cur) {
      case ai.one:
        defeat.one=true;
        ai.one=[];
        upd(ai.one);
        $("#ai-1").text("LOST");
        $("#ai-1").hide("slow");
        break;
      case ai.two:
        defeat.two=true;
        ai.two=[];
        upd(ai.two);
        $("#ai-2").text("LOST");
        $("#ai-2").hide("slow");
        break;
      case ai.three:
        defeat.three=true;
        ai.three=[];
        upd(ai.three);
        $("#ai-3").text("LOST");
        $("#ai-3").hide("slow");
        break;
      default:
        console.log("Not found");
    }
    win();
  }
}

/* upd() is a function that updates the current card count of each other player*/

const upd = (player)=>{

  if(typeof player === "undefined"){
    $("#ai-1").html(ai.one.length);
    $("#ai-2").html(ai.two.length);
    $("#ai-3").html(ai.three.length);
  }else{
    switch (player) {
      case ai.one:
        $("#ai-1").html(ai.one.length);
        break;
      case ai.two:
        $("#ai-2").html(ai.two.length);
        break;
      case ai.three:
          $("#ai-3").html(ai.three.length);
        break;
      default:
          console.log("None");
    }
  }

}

const decNucleus = (stat,def,cur)=>{
  if(user.length!=0){
    if(stat == false){
      nuc.play();
      $("#deck").attr("src","./Images/Deceased Nucleus.jpg");
    }else{
    cur.splice(def,1);
      setTimeout(()=>{
        $("#deck").attr("src","./Images/BackOfCard.jpg");
      },1500);
    }
  }
}

const get =(val)=>{
  let y = val.split("/");
  return y[2].split(".");
};

const check = (e,player)=>{
  let cur = (player === user?"user":"AI");
  if(e === 10){
    decNucleus(false);
    let sample = player.findIndex((val)=>{
      let checkVal = get(val)[0];
      return(checkVal === "Lysosome" || checkVal === "SmoothER")
    });
    sample!=-1?decNucleus(true,sample,player):gameOver(cur,player);
    upd(player);
  }else{
    player.push(info[e]);
    upd(player);
  }
}

/*first() gives each player their first defense cards during start of the game*/

const first = ()=>{
  user.push(info[1]);
  ai.one.push(info[1]);
  ai.two.push(info[1]);
  ai.three.push(info[1]);
}

const cur = (player)=>{
  (playAgain===false)&&$(player).css("box-shadow","1px 9px 34px -10px rgba(99,255,51,0.8) ");
}

const res = (player)=>{
  $(player).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
}

const back = ()=>{
  $("#deck").click(draw);
  $("#board .shadow").css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52)");
  upd();
}

const turnDelay = ()=>{
  //set delay per turn
  //box shadow is green for current player
  //wait for current player to finish

  if(!playAgain){
    setTimeout(()=>{
      if(userBlock){
        userBlock=false;
        $(curUser).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52)");
      }
      $("#deck").unbind();
      $("#curUser").children().unbind();
      if(!block&&!defeat.one){
        cur($("#player2"));
        check(generate("player2"),ai.one);
        turn(ai.one);
      }else{
        block = false;
        defeat.one&&$("#player-2").css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.8)");
      }
      setTimeout(()=>{
        res($("#player2"));
          if(!defeat.two){
          cur($("#player3"));
          check(generate("player3"),ai.two);
          turn(ai.two);
          }else{
            block = false;
            defeat.two&&$("#player-3").css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.8)");
          }
            setTimeout(()=>{
              res($("#player3"));
              if(!defeat.three){
              cur($("#player4"));
              check(generate("player4"),ai.three);
                turn(ai.three);
                }else{
                  block = false;
                  defeat.three&&$("#player-4").css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.8)");
              }
                setTimeout(()=>{
                  res($("#player4"));
                  sample();
                  $("#deck").click(draw);
                  block=false;
                  },850);
              },850);
            },850);
    },850);
    $("#deck").click(draw);
  }

}

const draw = ()=>{

  if(playAgain===true){
    round = 0;
    user = [];
    ai = {
      one:[],
      two:[],
      three:[]
    };
      $("#ai-1").show();
      $("#ai-2").show();
      $("#ai-3").show();
    upd();
    playAgain = false;
  }

  if(round===0){
    first();
    for(let x=0;x<3;x++){
      user.push(info[Math.floor(Math.random()*(info.length-2))]);
      ai.one.push(info[Math.floor(Math.random()*(info.length-2))]);
      ai.two.push(info[Math.floor(Math.random()*(info.length-2))]);
      ai.three.push(info[Math.floor(Math.random()*(info.length-2))]);
    }
    display();
    upd();
    round++;
  }else{
    check(generate("user"),user);
    display(user[user.length-1]);
    if(block === false){
      turnDelay();
    }else{
      setTimeout(()=>{
        turnDelay();
        func.CellMembrane($("#player2"),block);
      },1000);
    }
    round++;
  }
};

const who = (player)=>{
  let ret;
  let retArr = [];
  switch (player) {
    case ai.one:
        ret = $("#player2").siblings();
      break;
    case ai.two:
          ret = $("#player3").siblings();
      break;
    case ai.three:
        ret = $("#player4").siblings();
      break;
    default:
      console.log("None");
  }
  for (let div of ret) {
    let x =$(div).attr("id");
    if(x!="deck"&&!($(div).hasClass("not"))){
      retArr.push(div);
    }
  }
  return retArr;
}

const turn = (player)=>{
  //get random card from ai deck
  //get the name of the card using get()
  //call handler --> identify siblings of current

  if(player.length != 0){
    let use = (player[Math.floor(Math.random()*(player.length))]);
    if(use!=-1){
      let card = get(use);//breaks down
      card = card[0].replace(/\s+/g, '');
      handler(card,who(player),player);
      // i tang tang ang space sa card[0] boi
    }
  }
}

$("#readyBtn").click(draw);
$("#deck").click(draw);

info.map((e)=>{
  cardCont.append(`
    <img src="${e}" class="card"/>
  `);
});

board.hide();
$(".reset").hide();
ready.click(()=>{
  ready.hide();
  board.fadeIn();
  $(".reset").fadeIn();
  $(".reset").click(restart);
});

})
