import React from "react";


function SCMConfig() {

    return ( 
    <div class = "step-2" >
        <div class = "form-group" >
            <div class = "q4" >
                <label for = "none"> None </label>  
                    <input type = "radio" id = "none" name = "answer" value = "none"/> 
                 <label for = "github"> Github </label>  
                    <input type = "radio" id = "github" name = "answer" value = "github"/>  

            </div> 
        </div> 
    </div> 

    )
}

export default SCMConfig;