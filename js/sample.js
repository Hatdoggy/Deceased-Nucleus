/*

  COMPLETED
  Mitochondria
  Animate Cutting deck
  Centriole
  ribosomes
  Cytoskeleton
  Cell Membrane
  Cytosol
  add Card count for each player
  Cell membrane (tarunga ang pag block sa sunod turn sa opponent)
  Current user Glow
  Turn per player

  To be debugged:
  RoughER (Gameover sequence)
  Golgi Apparatus (Gameover sequence)
  Gameover sequence sa alert
  Cytoskeleton bug for opponent

  TO DO LIST!
  Opponents turn
  If hand is empty place text else place user cards
  Remove ability to click when it is opponent's turn

*/

const info = ["./Images/SmoothER.png","./Images/Lysosome.png","./Images/Golgi Apparatus.png","./Images/Centriole.png","./Images/RoughER.png","./Images/Ribosome.png","./Images/Cell Membrane.png","./Images/Cytosol.png","./Images/Mitochondria.png","./Images/Cytoskeleton.png","./Images/Deceased Nucleus.png","./Images/BackOfCard.png"];

export default info;

const deck = $("#deck");
const players = ["player2","player3","player4"];

const shuffle = ()=>{

  return new Promise((x)=>{
    $("#deck").attr("src","./Images/CardGIF.gif");
    setTimeout(()=>{
      $("#deck").attr("src","./Images/BackOfCard.png");
    },2500);
  });

};

const cut = ()=>{
    $("#deck").attr("src","./Images/Cut.gif");
    setTimeout(()=>{
      $("#deck").attr("src","./Images/BackOfCard.png");
    },2500);
};

const remove = (player,get,card)=>{
    let sample = player.findIndex((val)=>{
      let checkVal = get(val)[0];
      return checkVal === card
    });
  console.log(sample);
  return sample;
}

function Mitochondria (targets,user,ai,ret,player){

  $("#deck").attr("src","./Images/Mitochondria.png");
  if(player){//check if user ang click
    targets.map((key,value)=>{
      if(key!=0&&!($(value).hasClass("not"))){
        $(value).css("box-shadow","1px 9px 34px -10px rgba(240,166,48,0.8) ");
        $(value).css("cursor","pointer");
        $(value).click(function(){
          $(value).siblings().css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
          $(value).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
          ret.testVar = $(this).attr("id");
          $("#deck").attr("src","./Images/BackOfCard.png");
        });
      }
    });
  }else{
    let x = targets[Math.floor(Math.random()*(targets.length-1))];
      $(x).css("box-shadow","1px 9px 34px -10px rgba(240,166,48,0.8) ");
      setTimeout(()=>{
        $(x).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
      },1000)
      ret.testVar =$(x).attr("id");
  }
}

function CellMembrane (target,block,player){

    if(block){
      $(target).css("box-shadow","1px 9px 34px -10px rgba(255,204,0,0.52)");
      console.log(target);
    }
  //when chosen next player will be blocked
  //click card set block to true
  // on draw next player shadow will turn orange then proceed to next next

}

function Cytoskeleton (targets,check,gen,ai,cur,user){
  //generate random cards for every opponent
  let ctr = 0;
  console.log(ai);
  for (let x of targets) {
    if($(x).attr("id")!="deck"&&!($(x).hasClass("not"))){
      $(x).css("box-shadow","1px 9px 34px -10px rgba(252,79,56,0.8)");
    }
  }

  if(cur === "user"){
    console.log("USER");
    for (let x in ai) {
      check(gen(players[ctr]),ai[x]);
      ctr++;
    }
  }else{
    console.log("You went here");
    for (let x in ai) {
      if(cur!=ai[x]){
        check(gen(players[ctr]),ai[x]);
        ctr++;
      }
    }
    check(gen("user"),user);
    console.log(user);
  }

  shuffle();

  setTimeout(() => {
    $(targets).siblings().css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
  }, 2800);

}

function GolgiApparatus (user,get,callback){
  console.log(user);
  shuffle();
  callback(remove(user,get,"Golgi Apparatus"));
  // return remove(user,get,"GolgiApparatus");
}

const breakdown = (cur)=>{
    cur=cur.split("/");
    cur=cur[2].split(".");
    return cur[0]
}

const ribo = (user) =>{
  let ctr =0;
  let riboArr = [];
  user.forEach((item, i) => {
    if(breakdown(item)==="Ribosome"){
      riboArr.push(i);
      ctr++;
    }
  });
  console.log(ctr);
  return(ctr>=2)?riboArr:false;
};

let ret = {
    value: '',
    get testVar() {
      return this.value;
    },
    set testVar(value) {
      this.value = value;
    }
  }

const removeClick = (event,target,callback)=>{

  if($(event).attr("alt")=="BackOfCard"){
    // ret.testVar = $(event).parent().attr("id");
    callback($(event).parent().attr("id"));
  }else{
    // ret.testVar = $(event).attr("id");
    callback($(event).attr("id"));
  }

  for (let x of target) { //code for reset after click
    if($(x).attr("id")!="deck"){
      $(x).unbind("click");
      $(x).css("cursor","auto");
    }
  }
}

function Ribosome (targets,cur,user,callback){
  let curPlayer;

  if(cur!=user){
    for (let x of targets) {
      if($(x).attr("id")==="curUser"){
        curPlayer = x;
      }
    }
  }

  for (let x of targets) {
    if($(x).attr("id")!="deck"&&!($(x).hasClass("not"))){
      $(x).css("cursor","pointer");
      $(x).css("box-shadow","1px 9px 34px -10px rgba(254,254,254,0.52)");
      if(cur===user){
        $(x).click((event)=>{
          $(targets).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
          removeClick(event.target,targets,callback);
        });
      }else{
        setTimeout(()=>{
          $(targets).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
        },1000);
        return callback("curUser");
      }
    }
  }
}

function Cystosol (targets,callBack){
  //click opponent show three random cards from his deck
  for (let x of targets) {
    if($(x).attr("id")!="deck"&&!($(x).hasClass("not"))){
      $(x).css("cursor","pointer");
      $(x).css("box-shadow","1px 9px 34px -10px rgba(48,220,242,0.52)");
      $(x).click((event)=>{
        $(targets).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
        removeClick(event.target,targets,callBack);
      });
    }
  }

}

function roughDisplay(user){
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
}

function cytoDisp(arr){

  arr.forEach((item) => {
    let alt = item.split("/");
    alt = alt[2].split(".");
    $("#card-cont").append(`
        <div class="">
          <img src="${item}" alt="${alt[0]}" class="flex card p-right-5 p-bot-5" />
        </div>
    `);
  });
}


export {shuffle,cytoDisp,ribo,remove,Cystosol,Ribosome,GolgiApparatus,Mitochondria,cut,CellMembrane,Cytoskeleton,roughDisplay};
