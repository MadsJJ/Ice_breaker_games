import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./style/VisitGame.css";
//routing
import react from "react";
import { useNavigate } from "react-router-dom";



function VisitGame() {
    const [count, setCount] = useState(0)
  
    return (
      <>
       <Navbar />
       
  
  
  
        <div className='newGameContainer'>
  
          <div className ='gameHeader'>
              <h2>GameName</h2>
              
              
          </div>
          <p>Laget av: Jenny</p>
          <br></br>
  
          <div className='descBox'>
              <div className='descBox'>
                  <div className='textLeft'>
                      <p>Text on theContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. left side...</p>
                  </div>
                  <div className='textRight'>
                      <p>Text on the righContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.t side...</p>
                  </div>
  
  
              
              </div>
  
              <div class='additionalInfo'>
                  <div class='ratingDiv'>
           
                      <p>Rating: 4.5</p>
                  </div>
              <div class='categoryDiv'>
             
                  <p>Category: Example Category</p>
              </div>
              <button>Button</button>
              <button id="reportButton">Rapporter Lek</button>
          </div>
  
          
  
          </div>
  
  
  
      
        </div>
  
  
  
  
  
  
  
  
      </>
  
  
  
    )
  }
  
  export default VisitGame