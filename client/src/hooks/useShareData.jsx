import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { getLightUsers, getShares, shareInfo } from "../api/personsApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Form, Popconfirm, Typography, message } from "antd";
import { useState } from "react";

const useShareData = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const queryClient = useQueryClient();
  const [shareForm] = Form.useForm();

  const { isLoading, isError, error, data } = useQuery(
    ["shares"],
    () => getShares(),
    {
      keepPreviousData: true,
      enabled: false,
    }
  );

  const { isLoading: getUsersLodaing, data: usersData } = useQuery(
    ["users-light"],
    () => getLightUsers(),
    {
      keepPreviousData: true,
    }
  );

  const submitShareMutation = useMutation((data) => shareInfo(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("shares");
      shareForm.resetFields();
      setDrawerOpen(false);
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

  const usersOptions = usersData?.users?.map((user) => ({
    label: `${user.firstName[0]}. ${user.lastName}`,
    value: user.id,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "ՀԾՀ / ՀՎՀՀ",
      dataIndex: "uid",
      render: (_, record) => {
        const { uid } = record;
        const destinationUrl =
          uid.length === 10 ? `/bpr/${uid}` : `/register/${uid}`;
        return <Link to={destinationUrl}>{uid}</Link>;
      },
    },
    {
      title: "Տվյալներ",
      dataIndex: "text",
    },
    {
      title: "Մեկնաբանություն",
      dataIndex: "comment",
    },
    {
      title: "...",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Հեռացնել տվյալ տողը"
            description="Համոզվածե՞ք"
            onConfirm={() => onLikeToggle({ uid: record.uid })}
            onCancel={onCancel}
            okText="Հեռացնել"
            cancelText="Չեղարկել"
            placement="left"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];

  const onShareSubmit = (values) => {
    submitShareMutation.mutate(values);
  };

  const onCancel = () => console.log("canceled");

  return {
    sharesData: modifiedSharesData,
    onShareSubmit,
    shareForm,
    isLoading,
    isError,
    error,
    getUsersLodaing,
    usersOptions,
    drawerOpen,
    setDrawerOpen,
    onCancel,
    columns,
  };
};

export default useShareData;
