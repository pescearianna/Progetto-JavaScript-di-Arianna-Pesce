const MAX_LIFE = 50;
let lifePoints = 20;
let rocket = 10;
const navMenu = document.querySelector('nav');
const startbtn = document.createElement("button");
const resetbtn = document.createElement("button");
const instrbtn = document.createElement("button");
const recharge = document.createElement("button");
const shootOne = document.createElement("button");

const userConsole = document.querySelector('.yourconsole');
const gun = document.querySelector('.gun')
const lifeMonster = document.getElementById("life");
const mesCons = document.querySelector(".messageConsole");
const instr = document.querySelector(".instructions");
const blurEffect = document.querySelector(".blur");
const rocketUn = document.querySelector("#rocket");
let finalMessage = document.querySelector("#finalmessage");
let addingLife;

//RELOAD BUTTON
recharge.textContent = "RELOAD";         
recharge.className = "gamebutton"; 
userConsole.appendChild(recharge);
//SHOOT BUTTON
shootOne.textContent = "SHOOT";         
shootOne.className = "gamebutton"; 
gun.appendChild(shootOne);
//START BUTTON
startbtn.textContent = "Start";      
startbtn.className = "startgamebutton"; 
navMenu.appendChild(startbtn);
//RESET BUTTON
resetbtn.textContent = "Reset";      
resetbtn.className = "startgamebutton"; 
navMenu.appendChild(resetbtn); 
//instruction mobile mobile version
function addMobileButton() {
  if (window.innerWidth <= 992) {
    if (!document.getElementById("insMobile")) {
    instrbtn.textContent = "Instructions";
    instrbtn.className = 'startgamebutton';

    instrbtn.onclick = () => {
      const basicStuff = document.querySelector('#basic-stuff');
        if (basicStuff.style.display === 'block') {
          basicStuff.style.display = 'none';        
        } else {
          basicStuff.style.display = 'block';
        }
    };
    navMenu.appendChild(instrbtn);
    }
  } 
  else {
    if (instrbtn) {
      instrbtn.remove();
    }
  }
}
    
  window.addEventListener("resize", addMobileButton);
  addMobileButton()
  
//avoid default zoomin doubleclick in mobile version
document.ondblclick= (event)=>{
  event.preventDefault();
}           

//GAME FUNCTIONS

function addLife() {
  if (lifePoints < MAX_LIFE) {
    lifePoints += 10;
    lifePoints = Math.min(lifePoints, MAX_LIFE);
    lifeMonster.innerHTML = lifePoints;
  }
  if (lifePoints === 50) {
    shootOne.disabled = true;
    shootOne.style.opacity = "0.2";
    recharge.disabled = true;
    recharge.style.opacity = "0.2";
    instrbtn.textContent = "YOU LOST!";
    finalMessage.innerHTML = "YOU LOST! The Alien now is too strong. They are coming for you.&#128126;";
    finalMessage.style.fontSize = "2.5rem"
    blurEffect.classList.add("blur");
    clearInterval(addingLife);
  }
}

startbtn.onclick = () => {
  if (instr.classList.contains("activemes")) {
    instr.classList.remove("activemes");
    mesCons.classList.add("activemes");
  }
  if (blurEffect.classList.contains("blur")) {
    blurEffect.classList.remove("blur");
  }
  if (addingLife) {
    clearInterval(addingLife);
  }
  addingLife = setInterval(addLife, 5000);
  recharge.disabled = true;
  recharge.style.opacity = "0.2";
  shootOne.style.opacity = "1";
  if (window.innerWidth <= 992) {
      const basicStuff = document.querySelector('#basic-stuff');
        if (basicStuff.style.display === 'block') {
          basicStuff.style.display = 'none';        
        } 
    }
}

resetbtn.onclick = () => {
  lifePoints = 20;
  lifeMonster.innerHTML = lifePoints;
  ammo = 10;
  rocketUn.innerHTML = ammo;
  shootOne.disabled = false;
  recharge.disabled = false;
  instrbtn.textContent = "INSTRUCTIONS";
  if (mesCons.classList.contains("activemes")) {
    mesCons.classList.remove("activemes");
    instr.classList.add("activemes");
  }
  blurEffect.classList.add("blur");
  if (addingLife) {
    clearInterval(addingLife);
    addingLife = null; // Imposta a null per evitare problemi futuri
  }
};

function match() {
  if (lifePoints === 0) {
    shootOne.disabled = true;
    shootOne.style.opacity = "0.2";
    recharge.disabled = true;
    recharge.style.opacity = "0.2";
    instrbtn.textContent = "YOU WON!";
    finalMessage.innerHTML = "YOU WON! Congrats to our superhero. &#127881;";
    finalMessage.style.fontSize = "2.5rem"
    blurEffect.classList.add("blur");
    clearInterval(addingLife);
  }
}

shootOne.onclick = () => {
  let ammo = parseInt(rocketUn.textContent, 10);
  if (ammo > 0) {
    ammo -= 1; // Diminuisce di 1
    rocketUn.textContent = ammo;
    finalMessage.innerHTML = "Go ahead! You are a superhero!"
  }
  if (ammo === 0) {
    shootOne.disabled = true;
    shootOne.style.opacity = "0.2"; // Disabilita il bottone "Shoot"
    recharge.disabled = false;
    recharge.style.opacity = "1";
    finalMessage.innerHTML = "Remember to recharge your weapon!" // Abilita il bottone "Recharge"
  }
  const laserShoot = Array.from(document.querySelectorAll(".laser"));
  // Trova i div .laser  che non abbiano la classe active e immagazzinali nella variabile nextLaserShoot,
  // restituisci un solo div .laser casuale che sarà il prossimo ad avere l'animazione
  const nextLaserShoot = laserShoot.filter(
    (div) => !div.classList.contains("active")
  );

  if (nextLaserShoot.length > 0) {
    const randomIndex = Math.floor(Math.random() * nextLaserShoot.length);
    const theActiveLaser = nextLaserShoot[randomIndex];
    // Aggiungi la classe per animare
    theActiveLaser.classList.add("active");
    theActiveLaser.style.opacity = "1";
    theActiveLaser.style.transform = "translateY(-120vh)";
    // Ripristina la posizione iniziale dopo 1 secondi
    setTimeout(() => {
      theActiveLaser.classList.remove("active");
      theActiveLaser.style.transform = "translateY(0)";
      theActiveLaser.style.opacity = "0";
    }, 1000); // Durata della transizione
  }
  if (lifePoints > 0) {
    lifePoints--;
    lifeMonster.innerHTML = lifePoints;
  }
  match();
};

recharge.onclick = () => {
  rocketUn.textContent = 10;
  shootOne.disabled = false;
  shootOne.style.opacity = "1";
  recharge.disabled = true;
  recharge.style.opacity = "0.2";
};