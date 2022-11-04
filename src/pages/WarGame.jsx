import React, { useEffect, useState } from 'react'
import "../styles/wargame.css"
import { Game, gameOver } from '../tools/wargame_tool/classObj';
import { angler1, angler2, fireExplosion, gears, layer1, layer2, layer3, layer4, lucky, player, projectile, smokeExplosion } from '../tools/wargame_tool/images';

const WarGame = () => {

    let canvas; 

    
    let ctx;

  
  let game = null;

  let lastTime = 0;

  const [isPlaying, setIsPlaying] = useState(false)

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(animate);
  }

  useEffect(() => {
    canvas = document.getElementById("canvas");
    canvas.width = 1200;
    canvas.height = 500;
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", (e) => {
        const keyPressed = e.key;

       // console.log({keyPressed})
       setIsPlaying(true)
  
        if (
          keyPressed == "Enter" && game === null
        ) {
            game = new Game(canvas.width, canvas.height);
            animate(0)
          
        } 

       
      });

      if(gameOver){
        game = null
        setIsPlaying(false)
        //setgameOver(true)
      }
    
    
  }, [])
  

  return (
    <div className='container-game'>

        {!isPlaying && (<div className='start-game'> Press Enter Key to start the game </div>)}
    
    <img src={player} alt="player" id="player" className="player" />
    <img src={angler1} alt="angler1" id="angler1" className="angler1" />
    <img src={angler2} alt="angler2" id="angler2" className="angler2" />
    <img src={lucky} alt="lucky" id="lucky" className="lucky" />
 
    <img src={projectile} alt="projectile" id="projectile" />
    <img src={gears} alt="gears" id="gears" />
    <img
      src={smokeExplosion}
      alt="smoke explosion"
      id="smoke-explosion"
    />
    <img
      src={fireExplosion}
      alt="fire explosion"
      id="fire-explosion"
    />
  

    <img className="layer" src={layer1} alt="layer1" id="layer1" />
    <img className="layer" src={layer2}alt="layer2" id="layer2" />
    <img className="layer" src={layer3} alt="layer3" id="layer3" />
    <img className="layer" src={layer4} alt="layer4" id="layer4" />

    </div>
    
  )
}

export default WarGame