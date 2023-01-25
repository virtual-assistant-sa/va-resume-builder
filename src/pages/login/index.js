import React from "react";
import LoginForm from "../../utils/Login";
import { useDispatch, useSelector } from "react-redux";
import { switchUser } from "../../features/login/action";

const config = {
  loginUrl: "http://localhost:4002/api/login",
  registerUrl: "http://localhost:4002/api/register",
  redirectUrl: "https://localhost:4002/app",
};

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login).user;
  const users = useSelector((state) => state.users);

  const setUser = (v) => {
    dispatch(switchUser(v));
  };

  return (
    <LoginForm users={users} user={[user, setUser]} config={config}></LoginForm>
  );
}
