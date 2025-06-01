import { UserLogin } from "../interfaces/UserLogin";

interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const signup = async (userInfo: SignupData) => {
  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed. Please try again");
    }
    return data;
  } catch (err) {
    const error = err as Error;
    console.log("Error with signup", err);
    return Promise.reject(error.message || "Could not signup user");
  }
};

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed. Please try again");
    }

    return data;
  } catch (err) {
    const error = err as Error;
    console.log("Error with login", err);
    return Promise.reject(error.message || "Could not login user");
  }
};

export { login, signup };
