import React from "react";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  
  const styles = {
    section: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    text: {
      color: "black",
    },
    goBack: {
      color: "black",
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "5px",
      padding: "10px",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    
  };
  
  return (
    <section style={styles.section}>
      <h1>Whoops. Not Found</h1>
      <p style={styles.text}>Sorry, we couldn't find the page you were looking for.</p>
      <div className="flex-grow-1">
        <button onClick={goBack} style={styles.goBack}>Go Back</button>
      </div>
    </section>
  );
}

export default NotFound;