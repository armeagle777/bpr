import { useEffect, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { login, logOut } from "../api/personsApi";

const useAuthData = () => {
  const [checkErrors, setCheckErrors] = useState(false);
  const [outerNetwork, setOuterNetwork] = useState(() => {
    return localStorage.getItem("serverSwitch") === "true";
  });
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useSignIn();
  const signOut = useSignOut();

  useEffect(() => {
    setCheckErrors(false);
  }, [identifier, password]);

  const redirectPath = location.state?.path || "/";

  const loginMutation = useMutation((credentials) => login(credentials), {
    onSuccess: (data) => {
      const { accessToken, refreshToken, userData } = data;

      setIdentifier("");
      setPassword("");
      signIn({
        auth: {
          token: accessToken,
          type: "Bearer",
        },
        refresh: refreshToken,
        userState: userData,
      });
      return navigate(redirectPath, { replace: true });
    },
    onError: (error, variables, context, mutation) => {},
  });

  const logoutMutation = useMutation((credentials) => logOut(), {
    onSuccess: (data) => {
      signOut();
      return navigate("/login", { replace: true });
    },
    onError: (error, variables, context, mutation) => {},
  });

  const { isLoading: isLogoutLoading } = logoutMutation;
  const { isLoading, error, isError } = loginMutation;

  const handleSubmit = async (e) => {
    setCheckErrors(true);
    e.preventDefault();
    loginMutation.mutate({ email: identifier, password });
  };

  const onLogout = async (e) => {
    logoutMutation.mutate();
  };

  const switchServers = () => {
    const newValue = !outerNetwork;
    setOuterNetwork(newValue);
    localStorage.setItem("serverSwitch", newValue);
  };

  return {
    error,
    isError,
    password,
    isLoading,
    identifier,
    setPassword,
    switchServers,
    outerNetwork,
    checkErrors,
    setIdentifier,
    onLogout,
    onSubmit: handleSubmit,
  };
};

export default useAuthData;