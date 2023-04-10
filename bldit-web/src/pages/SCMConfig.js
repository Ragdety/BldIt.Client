import React from "react";

function SCMConfig() {
    return (
      <div className="step-2" >
          <div className = "form-group" >
              <div className = "q4" >
                  <label for="none" className="jc-label"> None </label>
                  <input type="radio" id="none" name="answer" value="none"/>
                  <label for="github" className="jc-label"> Github </label>
                  <input type="radio" id="github" name="answer" value="github"/>
              </div>
          </div>
      </div>
    )
}

export default SCMConfig;