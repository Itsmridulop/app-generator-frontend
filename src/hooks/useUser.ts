import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {},
  });
  return { user, isLoading, isError };
};

export { useUser };
