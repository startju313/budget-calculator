// AlertMessage.jsx
import React from "react";

function AlertMessage({ type, text }) {
 return (
   <div className={`alert ${type}`} role="alert">
     {text}
   </div>
 );
}

export default AlertMessage;