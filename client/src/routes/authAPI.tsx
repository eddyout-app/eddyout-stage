import { LOGIN_USER, REGISTER_USER } from "../graphql/mutations/userMutations";
import client from "../utils/apolloClient";
import type { UserLogin } from "../types/user";

interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const login = async (userInfo: UserLogin) => {
  try {
    const response = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        email: userInfo.email,
        password: userInfo.password,
      },
    });

    if (!response.data?.login?.token) {
      throw new Error("Login failed. Please try again");
    }

    return response.data.login;
  } catch (err) {
    const error = err as Error;
    console.log("Error with login", err);
    return Promise.reject(error.message || "Could not login user");
  }
};

const signup = async (userInfo: SignupData) => {
  try {
    const response = await client.mutate({
      mutation: REGISTER_USER,
      variables: {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      },
    });

    if (!response.data?.registerUser?.token) {
      throw new Error("Signup failed. Please try again");
    }

    return response.data.registerUser;
  } catch (err) {
    const error = err as Error;
    console.log("Error with signup", err);
    return Promise.reject(error.message || "Could not signup user");
  }
};

export { login, signup };
