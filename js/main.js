import info,* as func  from "./sample.js";

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
let players = ["player2","player3","player4"];
let curUse = "#curUser";

let instance = tippy(curUse,{
  trigger:"manual",
  placement: 'bottom',
  duration:300,
});

const suc = new Audio('https://dl.dropbox.com/s/05oyx1mvawozwdj/Win.wav');
const def = new Audio('https://dl.dropbox.com/s/c85w733ud3rxxna/Lost.wav');
const cyt = new Audio('https://dl.dropbox.com/s/168iw1gosdvelx7/Cytosol.mp3');
const nuc = new Audio('https://dl.dropbox.com/s/dg4xvl20omuigr6/Nucleus.mp3');
const mit = new Audio('https://dl.dropbox.com/s/jmvt8udz5otuk7b/Mito.mp3');
const ran = new Audio('https://dl.dropbox.com/s/fktip0t46fwfs55/Random.mp3');
const rib = new Audio('https://dl.dropbox.com/s/lufn8q5xjndz3g7/ribo.mp3');

/*ret handles mitochondria changes*/

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
        instance[0].show();
        instance[0].setContent("2 from a Mitochondria");
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

/*checkPlayer() identifies the target player, used by ribosome handler*/

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

/*gets a random number*/

const getRandom = (length)=>{
  return Math.floor(Math.random()*(length));
}

/*cytoSee() creates an array of random cards from target player and displays it using cytoDisp()*/

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

/* handler() identifies what card is used and activates the cards effects*/

const handler = (clicked,targets,curPlayer)=>{
  clicked = clicked.replace(/\s+/g, '');
  $("#deck").off("click");
  switch (clicked) {
    case "Mitochondria":
        let ndx;
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
          mit.play();
          func.Mitochondria(targets,curPlayer,ai,ret,false);
        }
        $("#deck").off().on('click',draw);
         break;
    case "Centriole":
          curPlayer.splice(func.remove(curPlayer,get,"Centriole"),1);
          ran.play();
          func.cut();
          if(curPlayer==user){
            func.roughDisplay(user);
            sample();
          }
        $("#deck").off().on('click',draw);
         break;
    case "CellMembrane":
          console.log("Cell Membrane");
          if(curPlayer===user){
            block = true;
            user.splice(func.remove(user,get,"Cell Membrane"),1);
            func.roughDisplay(user);
            sample();
            func.CellMembrane($("#player2"),block,"user");
            $("#deck").off().on('click',draw);
          }else if(curPlayer===ai.three){
            userBlock = true;
            curPlayer.splice(func.remove(curPlayer,get,"Cell Membrane"),1);
            func.CellMembrane(curUser,userBlock,curPlayer);
            $(curUser).children().unbind();
            instance[0].show();
            instance[0].setContent("Blocked by a Cell Membrane");
          }
        $("#deck").off().on('click',draw);
         break;
    case "Cytoskeleton":
          curPlayer.splice(func.remove(curPlayer,get,"Cytoskeleton"),1);
          cyt.play();
          if(curPlayer==user){
            func.Cytoskeleton(targets,check,generate,ai,"user");
          }else{
            func.Cytoskeleton(targets,check,generate,ai,curPlayer,user);
            instance[0].show();
            instance[0].setContent("Oh no a random card");
          }
          func.roughDisplay(user);
          sample();
          upd();
          $("#deck").off().on('click',draw);
          break;
    case "GolgiApparatus"://RECHECK THIS
          console.log("Golgi");
            func.GolgiApparatus(curPlayer,get,function(retVal){
              ran.play();
              curPlayer.splice(retVal,1);
              check(generate("curPlayer"),curPlayer);

              if(curPlayer===user){
                func.roughDisplay(user);
                sample();
              }
            });
        $("#deck").off().on('click',draw);
         break;
    case "RoughER":
          console.log("Rough");
          curPlayer.splice(func.remove(curPlayer,get,"RoughER"),1);
          check(generate("curPlayer"),curPlayer);
              if(curPlayer===user){
                func.roughDisplay(user);
                sample();
              }
          $("#deck").off().on('click',draw);
         break;
    case "Ribosome":
          if(Array.isArray(func.ribo(curPlayer))){
          rib.play();
            for(let x=0;x<2;x++){
              curPlayer.splice(func.remove(curPlayer,get,"Ribosome"),1);
            }
              if(curPlayer===user){
                func.roughDisplay(user);
                sample();
                $("#deck").off().on('click',draw);
              }else{
                instance[0].show();
                instance[0].setContent("A thief took a card");
              }
            func.Ribosome(targets,curPlayer,user,function(find){
              checkPlayer(find,curPlayer);
              upd();
            });
        $("#deck").off().on('click',draw);
          }else{
            console.log("Lack one more ribosome");
          }
         break;
    case "Cytosol":

          if(curPlayer===user){
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
            $("#deck").off().on('click',draw);
          }
         break;
    default:
        console.log("Used a Defense card");
  }
};

/*Modal exit button*/

$(".close").click(()=>{
  playAgain?$("#lose").fadeOut("fast"):$("#myModal").fadeOut("fast");
  $("#card-cont").empty();
  $("#message").empty();
});

/* sample() identifies if user is blocked or not
  If user is blocked user cant click their card
  else click event is set to the cards
*/

const sample = ()=>{
  console.log("You went here");
  if(userBlock){
    turnDelay(0);
  }else{
    $("#curUser").children().off().on('click',(e)=>{
      console.log("You clicked: "+ $(e.target).attr("alt"));
      let siblings = $(e.target).parent().parent().siblings();
      handler($(e.target).attr("alt"),siblings,user);
    });
  }
}

/* display() displays the user's cards after drawing or after other opponents attack*/

const display = (value)=>{

  if($("#curUser").children().length === 0){
    user.map((e)=>{
      let alt = e.split("/");
      alt = alt[2].split(".");
      let id = alt[0].replace(/\s+/g, '');
      $("#curUser").append(`
        <div class="">
          <img src="${e}" alt="${alt[0]}" id="${id}" class="tooltip flex play-card p-right-5 p-bot-5" />
        </div>
      `);
      tippy('#'+id, {
        content: func.desc[id],
      });
    });
    sample();
  }
  else{
  $("#curUser").empty();
    user.map((e)=>{
      let alt = e.split("/");
      alt = alt[2].split(".");
      let id = alt[0].replace(/\s+/g, '');
      $("#curUser").append(`
        <div class="">
          <img src="${e}" alt="${alt[0]}" id="${id}" class="tooltip flex play-card p-right-5 p-bot-5 cur-card" />
        </div>
      `);
      tippy('#'+id, {
        content: func.desc[id],
      });
    });
    sample();
  }

}

/* generate() generates a random number and returns an index value for that card*/

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

/* reset() resets the game*/

const reset = ()=>{

    players.forEach((item) => {
      tippy("#"+item,{
        content:" ",
      });
    });
    $("#deck").off().on('click',draw);
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

/*Displays Win message if res is true and Lost if res if false*/

const mes = (res)=>{
  if(!end){
    $("#lose").fadeIn("fast");
    res?suc.play():def.play();
    $("#message").append(`
        <h1 class="font-desc flex p-20 flex-jc-ce">You ${res?"Won":"Lost"}</h1>
    `);
  }
}

/*refill() resets the cards of every defeated opponent*/

const refill = ()=>{

  let targPlayers = ["#player2","#player3","#player4"];

  targPlayers.forEach((item) => {
    $(item).empty();
    for (var i = 0; i < 3; i++) {
      $(item).append(`
        <img src="./Images/BackOfCard.jpg" alt="BackOfCard" class="play-card margin-left-2" />
      `);
    }
  });

}

/*Restarts the whole game, triggers when reset game is clicked*/
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
      $("movecont").empty();
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
      refill();
};

/*checks if user won*/
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

/*Sets defeat true if ai lost and checks if user won and identifies if user lost then calls reset()*/

const gameOver = (player,cur)=>{

  let defeated,lost,target;

  if(user.length!=0&&player==="user"){
    $(".reset").css("color","#f35230");
    mes(false);
    reset();
  }else{
    switch (cur) {
      case ai.one:
        defeat.one=true;
        defeated = ai.one;
        target="#player2";
        lost = "#ai-1";
        break;
      case ai.two:
        defeat.two=true;
        defeated = ai.one;
        target="#player3";
        lost = "#ai-2";
        break;
      case ai.three:
        defeat.three=true;
        defeated = ai.one;
        target="#player4";
        lost = "#ai-3";
        break;
      default:
        console.log("Not found");
    }

    defeated=[];
    upd(defeated);

    setTimeout(()=>{
      $(target).empty();
      $(target).append(`<h4 class="font-desc">DEFEATED</h4>`);
      $(lost).hide("slow");
    },2000);
    win();//checks if every opponent lost
  }
}

/* upd() is a function that updates and displays the current card count of each other player*/

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
          console.log("user");
    }
  }

}

/*decNucleus() displays a deceased nucleus card in the middle if deceased nucleus is drawn*/

const decNucleus = (stat,def,cur,curP)=>{

  if(user.length!=0){
    if(stat == false){
      nuc.play();
      $("#deck").attr("src","./Images/Deceased Nucleus.jpg");
    }else{
    cur.splice(def,1);
      if(curP==="user"){
        console.log("YOU GOT A DECEASED NUCLEUS");
        console.log(user);
      }
      setTimeout(()=>{
        $("#deck").attr("src","./Images/BackOfCard.jpg");
      },1500);
    }
  }
}

/*Gets the string for the card used by splitting the card src*/

const get =(val)=>{
  let y = val.split("/");
  return y[2].split(".");
};

/*check() checks if generated card is a deceased nucleus or not and checks if player has Defense
  else pushes the card to players deck*/

const check = (e,player)=>{
  let cur = (player === user?"user":"AI");
  if(e === 10){
    decNucleus(false);
    let sample = player.findIndex((val)=>{
      let checkVal = get(val)[0];
      return(checkVal === "Lysosome" || checkVal === "SmoothER")
    });
    sample!=-1?decNucleus(true,sample,player,cur):gameOver(cur,player);
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

/*cur() highlights current playing opponent*/

const cur = (player)=>{
  (playAgain===false)&&$(player).css("box-shadow","1px 9px 34px -10px rgba(99,255,51,0.8) ");
}

/*res() resets the box-shadow of player after turn*/

const res = (player)=>{
  $(player).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
}

const back = ()=>{
  $("#deck").click(draw);
  $("#board .shadow").css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52)");
  upd();
}

/*turnDelay() is the delay per turn for every opponent*/

const turnDelay = (ctr)=>{
  //set delay per turn
  //box shadow is green for current player
  //wait for current player to finish
  if(ctr<players.length&&user.length!=0){

    let curP = players[ctr];
    let def;
    let curAI;

    switch (curP) {
      case "player2":
        $("#deck").unbind();
        $("#curUser").children().unbind();
        curAI = ai.one;
        if(userBlock){
          userBlock=false;
          $(curUser).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52)");
        }
          def = defeat.one;
        break;
      case "player3":
          curAI = ai.two;
          def = defeat.two;
        break;
      case "player4":
          curAI = ai.three;
          def = defeat.three;
        break;
      default:
        console.log("End");
    }

    if(!block&&!def){
      cur($("#"+players[ctr]));
      check(generate(players[ctr]),curAI);
      turn(curAI);
    }else{
      block = false;
      defeat&&$("#"+players[ctr]).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.8)");
    }

    setTimeout(()=>{
      res($("#"+players[ctr]));
      ctr++;
      turnDelay(ctr);
    },1500);

  }else{
    sample();
    instance[0].setContent(" ");
    instance[0].hide();
    $("#deck").off().on('click',draw);
    block=false;
  }

}

/*draw() triggered when user clicks middle deck generates card*/

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
    $("#movecont").children().empty();
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
      turnDelay(0);
    }else{
      setTimeout(()=>{
        turnDelay(0);
        func.CellMembrane($("#player2"),block);
      },1000);
    }
    round++;
  }
};

/*who() identifies the current player and adds a tooltip on last card chosen to that user */

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
  if(typeof ret != "undefined"){
    for (let div of ret) {
      let x =$(div).attr("id");
      if(x!="deck"&&!($(div).hasClass("not"))){
        retArr.push(div);
      }
    }
  }
  return retArr;
}

/*identify() identifies which opponent is playing*/
let ins;

const identify = (player,card)=>{

  let set;

  $("#movecont").empty();
  switch (player) {
    case ai.one:
      set = '#player2'
      break;
    case ai.two:
      set = '#player3'
      break;
    case ai.three:
      set = '#player4'
      break;
    default:
      set="unknown";
      console.log("unknown");
  }
  if((set!="unknown")&&(round<=2)){
    ins = tippy(set,{
      content:"Last card used: "+ card,
    });
  }else{
    ins[0].setContent(" ");
    ins[0].setContent("Last card used: "+ card);
  }
}

// console.log(instance[0].show());
/*turn() triggered when ai's turn*/

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
      identify(player,card);
    }
  }
}

$("#readyBtn").click(draw);
$("#deck").off().on('click',draw);

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
  $(".reset").off().on('click',restart);
});

})
