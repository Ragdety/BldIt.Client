import React from "react";
import "../styles/config.css";

function PostBuild() {
    
    
    
    return (
        <div className = "step-4" >
        <div className = "form-group">
        <div className="q10"> 
        <label for="email_notif"> Receive email notifications </label>
            <input type="checkbox" id="email_notif" name="email_notif" value="email_notif"/>
        
        </div>

        <button type="submit" id="submit-button" class="submit-button"> Submit </button>
        </div>
    </div>

       


    )
}

export default PostBuild;