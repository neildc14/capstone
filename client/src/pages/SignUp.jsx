import React from "react";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";

const SignUp = () => {
  const [firstName, bindFirstName] = useInput();
  const [lastName, bindLastName] = useInput();
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();
  const [terms, bindTerms] = useInput();

  const [userType, changeUserType] = useSelect();

  console.log(userType);

  return (
    <div className="">
      <div className=" flex flex-col  md:flex-row-reverse justify-evenly md:justify-between h-screen mx-auto  md:px-0 ">
        <div className="md:w-1/3 grid place-items-center md:place-content-evenly gap-10 mx-6 md:mx-10 ">
          <h1 className="w-full place-self-start md:mt-14 text-3xl font-bold text-center text-green-1300">
            Sign up an account.
          </h1>

          <form
            action=""
            className="w-full place-self-center md:place-self-start md:mb-20"
          >
            <div className="flex flex-col md:max-w-md mb-4">
              <FormLabel htmlFor="first_name" label="First Name" />
              <FormInput
                type="text"
                name="first_name"
                autocomplete="off"
                onChangeHook={bindFirstName}
              />
            </div>
            <div className="flex flex-col md:max-w-md mb-4">
              <FormLabel htmlFor="last_name" label="Last Name" />
              <FormInput
                type="text"
                name="last_name"
                autocomplete="off"
                onChangeHook={bindLastName}
              />
            </div>
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
              <FormLabel
                htmlFor="password"
                label="Password"
                onChangeHook={bindPassword}
              />
              <FormInput type="password" name="password" />
            </div>
            <div className="flex flex-col md:max-w-md mb-4">
              <FormLabel htmlFor="user_type" label="User Type" />
              <select
                name="user_type"
                id="user_type"
                className="w-full py-2 px-2 border-2 active:border-3 focus:border-3 outline-2 active:outline-green-300 hover:outline-green-300 focus:outline-green-300  rounded font-semibold"
                onChange={changeUserType}
              >
                <option value="Requestor">Requestor</option>
                <option value="Ambulance Personnel">Ambulance Personnel</option>
                <option value="Ambulance Personnel">Administrator</option>
              </select>
            </div>
            <div className="flex flex-row md:max-w-md mb-4 gap-2">
              <input
                type="checkbox"
                className="border checked:bg-blue-500 "
                name="terms"
                {...bindTerms}
              />
              <label htmlFor="terms" className="text-green-1000">
                I have read the{" "}
                <a className="underline">terms and conditions</a>
              </label>
            </div>
            <div className="mb-2">
              <button
                type="submit"
                className="w-full py-2 rounded text-lg md:text-xl bg-red-600 hover:outline  active:outline outline-2 outline-red-600 outline-offset-2 hover:bg-red-700 transition ease-in-out text-slate-100 tracking-wide"
              >
                Sign Up
              </button>
            </div>
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="cursor-pointer underline text-blue-600s"
              >
                Login
              </a>
            </p>
          </form>
        </div>

        <div className="w-full hidden md:block bg-red-800 "></div>
      </div>
    </div>
  );
};

export default SignUp;
