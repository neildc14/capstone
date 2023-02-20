import React from "react";
import useInput from "../hooks/useInput";
import ambulanceImg from "../assets/images/ambulance.jpg";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";
const Login = () => {
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();

  return (
    <div className="">
      <div className=" flex flex-col  md:flex-row-reverse justify-evenly md:justify-between h-screen mx-auto  md:px-0 ">
        <div className="md:w-1/3 grid place-items-center md:place-content-evenly gap-10 mx-6 md:mx-10 ">
          <h1 className="w-full place-self-start text-xl md:text-3xl font-bold text-center text-green-1300">
            Log in to your account.
          </h1>

          <form
            action=""
            className="w-full place-self-center md:place-self-start md:mb-20"
          >
            <div className="flex flex-col md:max-w-md mb-4">
              <FormLabel htmlFor="email" label="Email" />
              <FormInput
                type="email"
                name="email"
                autocomplete="off"
                onChangeHook={bindEmail}
              />
            </div>
            <div className="flex flex-col md:max-w-md mb-4">
              <FormLabel htmlFor="password" label="Password" />
              <FormInput
                type="password"
                name="password"
                onChangeHook={bindPassword}
              />
            </div>
            <div className="flex flex-row md:max-w-md mb-4 gap-2">
              <input
                type="checkbox"
                className="border checked:bg-blue-500 "
                name="remember_password"
              />
              <label htmlFor="remember_password " className="text-green-1000">
                Remember password
              </label>
            </div>
            <div className="mb-2">
              <button className="w-full py-2 rounded text-lg md:text-xl bg-green-600 hover:outline  active:outline outline-2 outline-green-600 outline-offset-2 hover:bg-green-700 transition ease-in-out text-slate-100 tracking-wide">
                Login
              </button>
            </div>
            <div className="grid">
              <a className="place-self-end text-blue-600 cursor-pointer">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        <div className="w-full hidden md:block bg-green-800 "></div>
      </div>
    </div>
  );
};

export default Login;
