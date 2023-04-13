import React from "react";
import { useState } from "react";
import "../styles/jobconfig.css";

function ConfigBuild() {

   // generates next text fields based on a button click
    const [entry,setEntry]=useState([]);
    const addTextField=()=>{
        const field=[...entry,[]]
        setEntry(field)
    }

    // lets you add text input to the text fields, saves it in array (?)
    const textContent=(changeInput,i)=>{
        const inputdata=[...entry]
        //gets  value of the element where event occured  
        inputdata[i]=changeInput.target.value;
        setEntry(inputdata)
       }

 return(

    <div className = "step-3" >
    <div className = "form-group">
    <div className="q5"> 
        <p> Apppears if SCM was configured</p>

    <div className="p3_opt1">
        <input type="radio" id="pr_creation" name="selected" value="pr_creation"/>
        <label className="jc-label">PR Creation</label>
    </div>

    <div className="p3_opt2">
        <input type="radio" id="push" name="selected" value="push"/>
        <label className="jc-label">Push</label>
    </div>
    </div>

    <div className="q6"> 
        <p> Build Section </p>
        <select name="script" id="script">
        <option disabled value=""> Select an option </option>
        <option value="batch">Windows Batch File</option>
        <option value="linux_script">Linux Script File</option>
        </select>
        </div>

        <div id="script_input"> 
        <button id="new_field" onClick={()=>addTextField()}>New Script</button>
         {entry.map((data,i)=>{
             return(
                <div>
                     <textarea value={data} onChange={e=>textContent(e,i)} />
                 </div>
            
             )
         })}
    </div>
    </div>
    </div>
 );
 }


export default ConfigBuild;