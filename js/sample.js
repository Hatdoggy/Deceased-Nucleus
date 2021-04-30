
const info = ["./Images/SmoothER.jpg","./Images/Lysosome.jpg","./Images/Golgi Apparatus.jpg","./Images/Centriole.jpg","./Images/RoughER.jpg","./Images/Ribosome.jpg","./Images/Cell Membrane.jpg","./Images/Cytosol.jpg","./Images/Mitochondria.jpg","./Images/Cytoskeleton.jpg","./Images/Deceased Nucleus.jpg","./Images/BackOfCard.jpg"];

export default info;

/*contains all description of every type of card*/

const desc = {
  SmoothER:"Protects you from the deceased nucleus",
  Lysosome:"Protects you from the deceased nucleus",
  Mitochondria:"Choose an opponent and give them 2 cards",
  RoughER:"Draws one card from the bottom of the deck",
  CellMembrane:"blocks an opponent from drawing a card",
  Cytosol:"enables user to see through 3 random cards of an opponent",
  Cytoskeleton:"Gives a random card to every opponent",
  GolgiApparatus:"shuffles the deck and user draws 1 card",
  Centriole:"cuts the deck in half",
  Ribosome:"Requires two to steal"
};

const deck = $("#deck");
const players = ["player2","player3","player4"];

/*shuffle() shuffles card by running gif*/

const shuffle = ()=>{

  return new Promise((x)=>{
    $("#deck").attr("src","./Images/CardGIF.gif");
    setTimeout(()=>{
      $("#deck").attr("src","./Images/BackOfCard.jpg");
    },2500);
  });

};
/*cut() cuts deck by triggering gif*/
const cut = ()=>{
    $("#deck").attr("src","./Images/Cut.gif");
    setTimeout(()=>{
      $("#deck").attr("src","./Images/BackOfCard.jpg");
    },2500);
};

/*remove() locates card from array and returns index*/

const remove = (player,get,card)=>{
    let sample = player.findIndex((val)=>{
      let checkVal = get(val)[0];
      return checkVal === card
    });
  return sample;
}

/*Mitochondria() changes box-shadow of target and  updates changes of ret*/

function Mitochondria (targets,user,ai,ret,player){

  $("#deck").attr("src","./Images/Mitochondria.jpg");
  if(player){//check if user clicked
    targets.map((key,value)=>{
      if(key!=0&&!($(value).hasClass("not"))){
        $(value).css("box-shadow","1px 9px 34px -10px rgba(240,166,48,0.8) ");
        $(value).css("cursor","pointer");
        $(value).off().on('click',function(){
          $(value).siblings().css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
          $(value).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
          ret.testVar = $(this).attr("id");
          $("#deck").attr("src","./Images/BackOfCard.jpg");
        });
      }
    });
  }else{
    let x = targets[Math.floor(Math.random()*(targets.length-1))];
      $(x).css("box-shadow","1px 9px 34px -10px rgba(240,166,48,0.8) ");
      setTimeout(()=>{
        $(x).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
        $("#deck").attr("src","./Images/BackOfCard.jpg");
      },1000)
      ret.testVar =$(x).attr("id");
  }
}

/*CellMembrane() changes box-shadow for blocked player*/

function CellMembrane (target,block,player){

    if(block){
      $(target).css("box-shadow","1px 9px 34px -10px rgba(255,204,0,0.52)");
    }

}

/*Cytoskeleton() generates random number for every opponent*/
function Cytoskeleton (targets,check,gen,ai,cur,user){

  let ctr = 0;
  for (let x of targets) {
    if($(x).attr("id")!="deck"&&!($(x).hasClass("not"))){
      $(x).css("box-shadow","1px 9px 34px -10px rgba(252,79,56,0.8)");
    }
  }

  if(cur === "user"){
    for (let x in ai) {//generate a card for every ai opponent
      check(gen(players[ctr]),ai[x]);
      ctr++;
    }
  }else{//generate a card for every ai opponent except for current player including player
    for (let x in ai) {
      if(cur!=ai[x]){
        check(gen(players[ctr]),ai[x]);
        ctr++;
      }
    }
    check(gen("user"),user);
  }

  shuffle();

  setTimeout(() => {
    $(targets).siblings().css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
  }, 2800);

}

/*GolgiApparatus() shuffles deck and triggers callback*/

function GolgiApparatus (user,get,callback){
  shuffle();
  callback(remove(user,get,"Golgi Apparatus"));
}

/* breakdown() splits passed parameter and returns split value*/

const breakdown = (cur)=>{
    cur=cur.split("/");
    cur=cur[2].split(".");
    return cur[0]
}

/*ribo() checks if number of ribosome in deck is 2 or more*/

const ribo = (user) =>{
  let ctr =0;
  let riboArr = [];
  user.forEach((item, i) => {
    if(breakdown(item)==="Ribosome"){
      riboArr.push(i);
      ctr++;
    }
  });
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

/*removeClick() removes click for deck*/

const removeClick = (event,target,callback)=>{

  if($(event).attr("alt")=="BackOfCard"){
    callback($(event).parent().attr("id"));
  }else{
    callback($(event).attr("id"));
  }

  for (let x of target) { //code for reset after click
    if($(x).attr("id")!="deck"){
      $(x).unbind("click");
      $(x).css("cursor","auto");
    }
  }
}

/*Ribosome() called when card used is a ribosome. changes box-shadow to white to identify possible targets
  calls the callback function
*/

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
        $(x).off().on('click',(event)=>{
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

/*Cytosol() changes box-shadows to identify available targets*/

function Cystosol (targets,callBack){
  //click opponent show three random cards from his deck
  for (let x of targets) {
    if($(x).attr("id")!="deck"&&!($(x).hasClass("not"))){
      $(x).css("cursor","pointer");
      $(x).css("box-shadow","1px 9px 34px -10px rgba(234,112,250,0.52)");
      $(x).off().on('click',(event)=>{
        $(targets).css("box-shadow","1px 9px 34px -10px rgba(0,0,0,0.52) ");
        removeClick(event.target,targets,callBack);
      });
    }
  }

}

/*roughDisplay() displays user's cards after handler function*/

function roughDisplay(user){
    $("#curUser").empty();
      user.map((e)=>{
        let alt = e.split("/");
        alt = alt[2].split(".");
        let id = alt[0].replace(/\s+/g, '');
        $("#curUser").append(`
          <div class="">
            <img src="${e}" alt="${alt[0]}" id="${id}" class="flex play-card p-right-5 p-bot-5" />
          </div>
      `);
      tippy('#'+id, {
        content: desc[id],
      });
  });
}

/*cytoDisp() displays the random cards generated from cytoSee() */

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

export {shuffle,cytoDisp,ribo,remove,Cystosol,Ribosome,GolgiApparatus,Mitochondria,cut,CellMembrane,Cytoskeleton,roughDisplay,desc};
