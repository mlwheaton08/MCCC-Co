import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { emailAuth } from "../helpers/emailAuth";
import { googleAuth } from "../helpers/googleAuth";
import { emailIcon, googleIcon, passwordIcon } from "../../icons";

export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const updateLogin = (evt) => {
    const copy = { ...login };
    copy[evt.target.id] = evt.target.value;
    setLogin(copy);
  };

  // Login With Email & Password
  const onSubmitLoginEmail = async (e) => {
    e.preventDefault();
    emailAuth.signIn(login, navigate);
  };

  // Login with Google
  const onSubmitLoginGoogle = async () => {
    googleAuth.signInRegister(navigate);
  };

  return (
    <main className="mt-nav-height-plus flex flex-col items-center gap-24 text-center text-xl">
      <h2 className="text-4xl">Sign In</h2>
      <form className="flex flex-col gap-8" onSubmit={onSubmitLoginEmail}>
        <fieldset className="flex justify-center items-center gap-2">
          <span>{emailIcon()}</span>
          <input
            type="email"
            value={login.email}
            id="email"
            onChange={(evt) => updateLogin(evt)}
            className="w-72 pl-1 bg-transparent border-b border-text-primary-color rounded-none placeholder:font-light placeholder:text-text-secondary-color focus:outline-none"
            placeholder="Email address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="flex justify-center items-center gap-2">
          <span>{passwordIcon()}</span>
          <input
            type="password"
            value={login.password}
            id="password"
            onChange={(evt) => updateLogin(evt)}
            className="w-72 pl-1 bg-transparent border-b border-text-primary-color rounded-none placeholder:font-light placeholder:text-text-secondary-color focus:outline-none"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <button
            type="submit"
            className="px-3 py-0.5 border border-accent-primary-color-light text-accent-primary-color-light"
          >
            Sign in
          </button>
        </fieldset>
      </form>

      <section className="flex flex-col gap-4">
        <span className="text-base text-text-secondary-color">or</span>
        <button
          type="submit"
          className="w-auto px-4 py-1 flex justify-center items-center gap-2 border border-text-primary-color text-lg text-text-secondary-color transition-property:all duration-300 hover:bg-bg-tint-color hover:text-text-primary-color"
          onClick={onSubmitLoginGoogle}
        >
          <span>{googleIcon()}</span>
          <span>Sign in with Google</span>
        </button>
      </section>

      <section className="text-lg">
        <span>Not a member yet? </span>
        <Link
          to="/register"
          className="text-accent-secondary-color-light underline"
        >
          Click here to register
        </Link>
      </section>
    </main>
  );
};
