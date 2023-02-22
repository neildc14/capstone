import React, { useState } from "react";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import TermsAndConditionsModal from "../components/TermsAndConditionsModal";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Checkbox,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [firstName, bindFirstName] = useInput();
  const [lastName, bindLastName] = useInput();
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();
  const [terms, bindTerms] = useInput();

  const [userType, changeUserType] = useSelect();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <div className="">
        <div className=" flex flex-col  md:flex-row-reverse justify-evenly md:justify-between h-screen mx-auto  md:px-0 ">
          <div className="md:w-1/3 grid place-items-center md:place-content-evenly gap-10 mx-6 md:mx-10 ">
            <h1 className="w-full place-self-start md:mt-16 text-3xl font-bold text-center text-green-1300">
              Sign up an account.
            </h1>

            <form
              action=""
              className="w-full place-self-center md:place-self-start md:mb-20"
            >
              <div className="flex flex-col md:max-w-md mb-4">
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </div>
              <div className="flex flex-col md:max-w-md mb-4">
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </div>
              <div className="flex flex-col md:max-w-md mb-4">
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" />
                </FormControl>
              </div>
              <div className="flex flex-col md:max-w-md mb-4">
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input pr="4.5rem" type={show ? "text" : "password"} />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        variant="ghost"
                        onClick={handleClick}
                      >
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </div>
              <div className="flex flex-col md:max-w-md mb-4">
                <FormControl>
                  <FormLabel>User Type</FormLabel>
                  <Select onChange={changeUserType}>
                    <option value="Requestor">Requestor</option>
                    <option value="Ambulance Personnel">
                      Ambulance Personnel
                    </option>
                    <option value="Ambulance Personnel">Administrator</option>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-row md:max-w-md mb-4 gap-2">
                <Checkbox></Checkbox>
                <label htmlFor="">
                  {" "}
                  I have read the{" "}
                  <a className="underline" onClick={onOpen}>
                    terms and conditions
                  </a>
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
                  className="cursor-pointer underline text-blue-600"
                >
                  Login
                </a>
              </p>
            </form>
          </div>

          <div className="w-full hidden md:block bg-red-800 "></div>
        </div>
      </div>

      <TermsAndConditionsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SignUp;
