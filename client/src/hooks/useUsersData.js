import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  checkEmail,
  createUser,
  getUsers,
  updateUser,
} from "../api/personsApi";
import { toast } from "react-toastify";

const useUsersData = () => {
  const { isLoading, isError, error, data } = useQuery(
    ["users"],
    () => getUsers(),
    {
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient();

  const editUserMutation = useMutation(
    ({ id, data }) => updateUser({ id, data }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("users");
        toast.success("Հաջողությամբ խմբագրվել է", {
          progress: undefined,
        });
      },
      onError: (error, variables, context, mutation) => {
        toast.error(error.response?.data?.message || error.message, {
          progress: undefined,
        });
      },
    }
  );

  const createUserMutation = useMutation((data) => createUser(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      toast.success("Հաջողությամբ գրանցվել է", {
        progress: undefined,
      });
    },
    onError: (error, variables, context, mutation) => {
      toast.error(error.response?.data?.message || error.message, {
        progress: undefined,
      });
    },
  });

  return {
    data,
    error,
    isError,
    isLoading,
    editUserMutation,
    createUserMutation,
  };
};

export default useUsersData;
