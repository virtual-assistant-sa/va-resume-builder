import React from "react";
import LoginForm from "../../utils/components/Login";
import { useDispatch, useSelector } from "react-redux";
import { switchUser } from "../../features/users/action";
import { selectActiveUser, selectAllUsers } from "../../features/users/select";

const config = {
  loginUrl: "http://localhost:4002/api/login",
  registerUrl: "http://localhost:4002/api/register",
  redirectUrl: "https://localhost:4002/app",
};

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectActiveUser);
  const users = useSelector(selectAllUsers);

  const setUser = async (user) => {
    dispatch(switchUser(user));
  };

  return (
    <LoginForm users={users} user={[user, setUser]} config={config}></LoginForm>
  );
}
