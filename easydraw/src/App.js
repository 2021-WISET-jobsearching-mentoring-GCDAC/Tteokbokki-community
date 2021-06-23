
import React, {createRef, useEffect} from "react";

function App(props){
  let canvas;
  let canvasRef = createRef();
  
  let pos = {
      drawable :false,
      X:-1,
      Y:-1
  };
  
  let ctx;
  
  useEffect(()=>{
      canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      canvas.addEventListener("mousedown",initDraw);
      canvas.addEventListener("mousemove",draw);
      canvas.addEventListener("mouseup",finishDraw);
      canvas.addEventListener("mouseout",finishDraw);
  
  },[]);
  
  function getPosition(event){
      return{X: event.offsetX
      ,Y : event.offsetY};
  }
  
  function initDraw(event) {
      ctx.beginPath();
      pos={drawable: true, ...getPosition(event)};
      ctx.moveTo(pos.X,pos.Y);
  }
  
  function draw(event) {
      if(pos.drawable){
          pos = {...pos, ...getPosition(event)};
          ctx.lineTo(pos.X, pos.Y);
          ctx.stroke();
      }
  }
  
  function finishDraw(){
      pos={drawable: false, X:-1, Y:-1};
  }
  
  
  return (
      <>
      <canvas ref={canvasRef} width="400" height={"300"}/>
      </>
  );
}

export default App;