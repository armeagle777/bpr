import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api/personsApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, Popconfirm, Typography } from "antd";

const useLikesData = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { isLoading, isError, error, data } = useQuery(
    ["likes"],
    () => getLikes(),
    {
      keepPreviousData: true,
    }
  );

  const toggleLikeMutation = useMutation((uid) => toggleLike(uid), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("likes");
      toast.success("Հաջողությամբ խմբագրվել է", {
        progress: undefined,
      });
    },
    onError: (error, variables, context, mutation) => {
      toast.error(error.response?.data?.message || error.message, {
        progress: undefined,
      });
    },
  });

  const modifiedLikesData = data?.likes?.map((likeRow) => ({
    ...likeRow,
    key: likeRow.id.toString(),
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Անուն",
      dataIndex: "firstName",
      editable: true,
      required: true,
    },
    {
      title: "Ազգանուն",
      dataIndex: "lastName",
      editable: true,
      required: true,
    },
    {
      title: "Էլ. փոստ",
      dataIndex: "email",
      editable: true,
      required: true,
    },
    {
      title: "Հեռ.",
      dataIndex: "phoneNumber",
      editable: true,
      regex: /^0\d{8}$/,
      placeholder: "0xxaabbcc",
    },
    {
      title: "Գաղտնաբառ",
      dataIndex: "password",
      editable: true,
    },
    {
      title: "...",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Պահպանել
            </Typography.Link>
            <Popconfirm title="Համոզվածե՞ք" onConfirm={cancel}>
              <a>Չեղարկել</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Խմբագրել
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        required: col.required,
        editing: isEditing(record),
        ...(col.regex && { regex: col.regex }),
        ...(col.placeholder && { placeholder: col.placeholder }),
      }),
    };
  });

  const onLikeToggle = (uid) => {
    toggleLikeMutation.mutate(uid);
  };

  return {
    onLikeToggle,
    isLoading,
    isError,
    error,
    data,
    mergedColumns,
  };
};

export default useLikesData;
