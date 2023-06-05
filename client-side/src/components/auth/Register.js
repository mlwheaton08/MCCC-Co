import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../helpers/googleAuth";
import { emailAuth } from "../helpers/emailAuth";
import { emailIcon, googleIcon, passwordIcon, userIcon } from "../../icons";

export const Register = ({ getNavCartItemTotal }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  let navigate = useNavigate()

  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    emailAuth.register(user, getNavCartItemTotal, navigate)
  }

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy)
  }

  // Register with google (same as sign in)
  const onSubmitLoginGoogle = async () => {
    googleAuth.signInRegister(getNavCartItemTotal, navigate)
  }

  return (
    <main className="mt-nav-height-plus flex flex-col justify-center items-center gap-24 text-center text-xl">
      <h2 className="text-4xl">Register</h2>
      <form className="flex flex-col gap-8" onSubmit={handleRegister}>
        <fieldset className="flex justify-center items-center gap-2">
          <span>{userIcon()}</span>
          <input
            onChange={updateUser}
            type="text"
            id="name"
            className="w-72 pl-1 bg-transparent border-b border-text-primary-color rounded-none placeholder:font-light placeholder:text-text-secondary-color focus:outline-none"
            placeholder="Full name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="flex justify-center items-center gap-2">
          <span>{emailIcon()}</span>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="w-72 pl-1 bg-transparent border-b border-text-primary-color rounded-none placeholder:font-light placeholder:text-text-secondary-color focus:outline-none"
            placeholder="Email address"
          />
        </fieldset>
        <fieldset className="flex flex-col items-end gap-1">
          <div className="flex justify-center items-center gap-2">
            <span>{passwordIcon()}</span>
            <input
              onChange={updateUser}
              type="password"
              id="password"
              className="w-72 pl-1 bg-transparent border-b border-text-primary-color rounded-none placeholder:font-light placeholder:text-text-secondary-color focus:outline-none"
              placeholder="Password"
              required
            />
          </div>
          <span
            className="text-sm font-thin text-accent-secondary-color-light"
          >
            Password must be at least 6 characters
          </span>
        </fieldset>
        <fieldset>
          <button
            type="submit"
            className="px-3 py-0.5 border border-accent-secondary-color-light text-accent-secondary-color-light"
          >
            Register
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
          <span>Register with Google</span>
        </button>
      </section>
    </main>
  );
};
