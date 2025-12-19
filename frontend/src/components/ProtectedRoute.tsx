import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";

type Props = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false
  });

  if (isLoading) return <p>Checking auth...</p>;
  if (isError) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
