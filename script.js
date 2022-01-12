class Fish {
  speed = 20;
  bgd = "";
  position = window.innerWidth;
  topPosition = Math.floor(
    Math.random() * document.getElementById("water").offsetHeight
  );
  able = true;
  element = "";

  constructor(sp, bg) {
    this.speed = sp;
    this.bgd = bg;
    this.element = document.createElement("div");
    document.getElementById("water").appendChild(this.element);
    this.element.classList = "fish";
    this.element.style.top = this.topPosition + "px";
    this.element.style.background = `url(${this.bgd}.jpg)`
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
  }
  //moving the element to the left.
  updateDiv() {
    this.element.style.left = this.position + "px";
  }
  //Swiming to left. Not stopping until the fish reaches the end or is caught.
  swim() {
    if (this.position > -100 && this.able == true) {
      this.position -= this.speed;
      this.updateDiv(); 
      // here this != undefined because of arrow function
      setTimeout(() => {
        this.swim();
      }, 50);
    }
  }
}

var fList = []; //List of fishes.
//Checking for the collision between the rod and any of the fish.
function checkForCollision() {
  for (let k = 0; k < fList.length; k++) {
    if (
      fList[k].topPosition <
        document.getElementById("rod").offsetHeight +
          30 -
          window.innerHeight / 7 &&
      fList[k].topPosition >
        document.getElementById("rod").offsetHeight -
          30 -
          window.innerHeight / 7 &&
      rod.empty
    ) {
      if (
        fList[k].position > document.getElementById("rod").offsetLeft - 30 &&
        fList[k].position < document.getElementById("rod").offsetLeft &&
        rod.empty &&
        fList[k].able
      ) {
        //locking the rod and bringing the fish to the top.
        fList[k].able = false;
        fList[k].element.style.top = "-40px";
        rod.empty = false;
        //Deleting the element and freeing the rod.
        setTimeout(function () {
          addNumberOfFish(fList[k].bgd)
          fList[k].element.remove();
          fList.splice(fList[k], 1);
          rod.empty = true;
        }, 1000);
      }
    }
  }
}

const rod = {
  empty: true
};

//moving the rod up and down. I know these 2 functions are not productive but i had no better solution.
function move(e) {
  if (rod.empty == true) {
    let Y = e.clientY - window.innerHeight / 7 - 25;
    //let YbutForPhone = e.touches[0].clientY;
    document.getElementById("rod").style.height = Y + "px";
    checkForCollision();
  } else {
    document.getElementById("rod").style.transition = "height 1s";
    document.getElementById("rod").style.transitionTimingFunction = "linear";
    document.getElementById("rod").style.height = "50px";
    setTimeout(function () {
      document.getElementById("rod").style.transition = "height 0.1s";
      document.getElementById("rod").style.transitionTimingFunction = "linear";
    }, 1100);
  }
}
//The same but for phone.
function movePh(e) {
  if (rod.empty == true) {
    let Y = e.touches[0].clientY;
    document.getElementById("rod").style.height = Y + "px";
    checkForCollision();
  } else {
    document.getElementById("rod").style.transition = "height 1s";
    document.getElementById("rod").style.transitionTimingFunction = "linear";
    document.getElementById("rod").style.height = "50px";
    setTimeout(function () {
      document.getElementById("rod").style.transition = "height 0.1s";
      document.getElementById("rod").style.transitionTimingFunction = "linear";
    }, 1100);
  }
}

//List of fish images.
const fishImages = [
  "https://imgur.com/96AlkBK",
  "https://imgur.com/tqSQ4sW",
  "https://imgur.com/iBUPvny",
  "https://imgur.com/86QbBnx"
]

//Creating a new fish and adding it to the list.
function newFish() {
  fList.push(new Fish(Math.floor(Math.random() * 5) + 2, fishImages[Math.floor(Math.random() * fishImages.length)]));
  fList[fList.length - 1].swim();
}


//Adding +1 fish caught in the text on the boat.
var orangeFish = 0;
var aquaFish = 0;
var blueFish = 0;
var greenFish = 0;
function addNumberOfFish(f){
  switch(f){
    case "https://imgur.com/96AlkBK":
      orangeFish++;
      document.getElementById("fish1val").innerText = `: ${orangeFish}`;
      break;
     case "https://imgur.com/tqSQ4sW":
      aquaFish++;
      document.getElementById("fish2val").innerText = `: ${aquaFish}`;
      break;
     case "https://imgur.com/iBUPvny":
      blueFish++;
      document.getElementById("fish3val").innerText = `: ${blueFish}`;
      break;
     case "https://imgur.com/86QbBnx":
      greenFish++;
      document.getElementById("fish4val").innerText = `: ${greenFish}`;
      break;
  }
}

alert("Le jeu consiste a faire la peche et a attrapper des poissons merci pour l interet  que vpous porter a notre jeu.Partager au maximum et liker pour faire aggrandir notre communauté")

window.onload = function () {
  //Adding a fish at a certain interval.
  setInterval(function () {
    newFish();
  }, 12000);
  setInterval(function () {
    newFish();
  }, 2500);
  setInterval(function () {
    newFish();
  }, 6000);
  //Mouse and Touch events for the rod position.
  document.getElementById("water").addEventListener("mousemove", move);
  document.getElementById("water").addEventListener("touchmove", movePh);
};
