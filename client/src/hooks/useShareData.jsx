import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { getShares, getUsers, shareInfo } from "../api/personsApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Form, Popconfirm, Typography, message } from "antd";

const useShareData = () => {
  const queryClient = useQueryClient();
  const [shareForm] = Form.useForm();

  const { isLoading, isError, error, data } = useQuery(
    ["shares"],
    () => getShares(),
    {
      keepPreviousData: true,
    }
  );

  const { isLoading: getUsersLodaing, data: usersData } = useQuery(
    ["users"],
    () => getUsers(),
    {
      keepPreviousData: true,
    }
  );

  const submitShareMutation = useMutation((data) => shareInfo(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("shares");
      message.success("Հաջողությամբ կատարվել է");
    },
    onError: (error, variables, context, mutation) => {
      message.error("Ինչ-որ բան այնպես չէ");
    },
  });

  const modifiedSharesData = data?.shares?.map((shareRow) => ({
    ...shareRow,
    key: shareRow.id.toString(),
  }));

  const usersOptions = usersData?.map((user) => console.log("User", user));

  // const columns = [
  //   {
  //     title: "#",
  //     dataIndex: "id",
  //   },
  //   {
  //     title: "ՀԾՀ / ՀՎՀՀ",
  //     dataIndex: "uid",
  //     render: (_, record) => {
  //       const { uid } = record;
  //       const destinationUrl =
  //         uid.length === 10 ? `/bpr/${uid}` : `/register/${uid}`;
  //       return <Link to={destinationUrl}>{uid}</Link>;
  //     },
  //   },
  //   {
  //     title: "Տվյալներ",
  //     dataIndex: "text",
  //   },
  //   {
  //     title: "...",
  //     dataIndex: "operation",
  //     render: (_, record) => {
  //       return (
  //         <Popconfirm
  //           title="Հեռացնել պահպանված որոնման տողը"
  //           description="Համոզվածե՞ք"
  //           onConfirm={() => onLikeToggle({ uid: record.uid })}
  //           onCancel={cancel}
  //           okText="Հեռացնել"
  //           cancelText="Չեղարկել"
  //           placement="left"
  //         >
  //           <Button danger icon={<DeleteOutlined />} />
  //         </Popconfirm>
  //       );
  //     },
  //   },
  // ];

  const onShareSubmit = (values) => {
    submitShareMutation.mutate(values);
  };

  return {
    sharesData: modifiedSharesData,
    onShareSubmit,
    shareForm,
    isLoading,
    isError,
    error,
    getUsersLodaing,
    usersOptions,
  };
};

export default useShareData;
