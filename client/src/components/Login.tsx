// DEV CODE
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TEMP MOCK LOGIN HANDLER
  const handleMockLogin = () => {
    // TEMP — replace this with your real seeded user _id from Mongo!
    localStorage.setItem("userId", "683f9f0346cea04223081fec");
    localStorage.setItem("email", "lisa@email.com");
    localStorage.setItem("firstname", "Lisa");
    localStorage.setItem("lastname", "Jorgensen");

    navigate("/dashboard");
  };

  // You can still keep your real REST login here if you want
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If you're not using REST yet → leave this empty
    console.log("Real login not connected yet");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-neutral px-4">
      <h1 className="text-4xl font-header text-primary mb-6">Login</h1>

      {/* Real login form (inactive for now) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mb-4"
          disabled // TEMP disable real submit
        >
          Login (Real — Not Ready)
        </button>
      </form>

      {/* TEMP Mock Login button */}
      <button onClick={handleMockLogin} className="btn-secondary mt-4 text-lg">
        🚀 Mock Login as Lisa (Dev Testing)
      </button>
    </div>
  );
}

// PRODUCTION CODE
// import { useState, type FormEvent, type ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import Auth from "../utils/auth";
// import { login } from "../routes/authAPI";
// import type { UserLogin } from "../types/user";

// const Login = () => {
//   const [loginData, setLoginData] = useState<UserLogin>({
//     email: "",
//     password: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setErrorMessage("");
//     try {
//       const data = await login(loginData);
//       Auth.login(data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       const error = err as Error;
//       console.error("Failed to login", err);
//       setErrorMessage(
//         error.message || "Incorrect username or password. Please try again"
//       );
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

//         {errorMessage && (
//           <div className="text-red-600 font-semibold text-sm text-center">
//             {errorMessage}
//           </div>
//         )}
//         <div className="flex flex-col">
//           <label
//             htmlFor="email"
//             className="mb-1 text-sm font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             name="email"
//             value={loginData.email || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label
//             htmlFor="password"
//             className="mb-1 text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="password"
//             name="password"
//             value={loginData.password || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <button className="btn-dark" type="submit">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
