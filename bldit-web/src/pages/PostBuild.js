import React from "react";
import "../styles/jobconfig.css";

function PostBuild() {
    return (
      <div className="step-4" >
          <div className="form-group">
              <div className="q10">
                  <label for="email_notif" className="jc-label"> Receive email notifications </label>
                  <input type="checkbox" id="email_notif" name="email_notif" value="email_notif"/>
              </div>
          </div>
      </div>
    )
}

export default PostBuild;