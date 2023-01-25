// import * as React from "react";
// import { Routes, Route } from "react-router-dom";

// import SignUp from "./SignUp";
// import Login from "./Login";
// import Signup2 from "./SignUp2";

// export default function NavTest() {
//   return (
//     <div className="NavTest">
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="signup" element={<SignUp />} />
//         <Route path="signup2" element={<Signup2 />} />
//       </Routes>
//     </div>
//   );
// }

// import { Routes, Route, useNavigate } from "react-router-dom";
// import React from "react";

// export default function SignUp() {
//   const navigate = useNavigate();

//   const navigateToSignup = () => {
//     // 👇️ navigate to /contacts
//     navigate("/signup2");
//   };

//   const navigateHome = () => {
//     // 👇️ navigate to /
//     navigate("/");
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={navigateHome}>Home</button>
//         <hr />
//         <button onClick={navigateToSignup}>Sign Up</button>

//         <Routes>
//           <Route path="/contacts" element={<Contacts />} />
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function Contacts() {
//   return <h2>Contacts</h2>;
// }
