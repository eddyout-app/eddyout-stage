import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authAPI";
import Auth from "../utils/auth";
import Footer from "../components/Footer";

export default function Signup() {
  const Navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      Auth.login(response.token);
      Navigate("/dashboard");
    } catch (err) {
      const error = err as Error;
      console.error("Signup failed. Please try again.", error);
      setErrorMessage(
        error.message ||
          "Email already in use. Please try again with a different email."
      );
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-screen w-screen flex flex-col md:flex-row">
        {/* Left side: Logo area */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <img
            src="/Logo_whitenobg_EddyOut.png"
            alt="Eddy Out Logo"
            className="max-w-xs w-full object-contain"
          />
        </div>

        {/* Right side: Sign up form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            {errorMessage && (
              <div className="text-red-600 font-semibold text-sm text-center">
                {errorMessage}
              </div>
            )}

            {["firstName", "lastName", "username", "email", "password"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              )
            )}

            <button type="submit" className="btn-dark">
              Sign Up
            </button>
          </form>
        </div>

        <Footer />
      </div>

      <Footer />
    </div>
  );
}
