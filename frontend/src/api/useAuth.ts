import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "./auth.api";

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser
  });

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser
  });
