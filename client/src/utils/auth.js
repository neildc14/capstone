import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Authorization = () => {
  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const token = parsed_user_data?.token;
  const headers = {
    Authorization: `Bearer ${parsed_user_data?.token}`,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };
  return { headers, config, parsed_user_data, user, token };
};

export default Authorization;
