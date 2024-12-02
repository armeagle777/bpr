import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTexekanq } from "../api/personsApi";
import { message } from "antd";

export const useTexekanqData = () => {
  const queryClient = useQueryClient();
  const createTexekanqMutation = useMutation((data) => createTexekanq(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("texekanqs");
      message.success("Հաջողությամբ կատարվել է");
    },
    onError: (error, variables, context, mutation) => {
      message.error("Ինչ-որ բան այնպես չէ");
    },
  });
  const onCreateTexekanq = (data) => {
    createTexekanqMutation.mutateAsync(data);
  };
  return {
    onCreateTexekanq,
    texekanqData: createTexekanqMutation.data,
    texekanqIsLoading: createTexekanqMutation.isLoading,
  };
};
