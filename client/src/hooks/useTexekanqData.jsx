import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTexekanq,
  getTexekanqBase64,
  getTexekanqs,
} from "../api/personsApi";
import { Button, Space, message } from "antd";
import { formatDate } from "../components/pdf-templates/templates.helpers";
import { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const useTexekanqData = () => {
  const queryClient = useQueryClient();

  const [fileName, setFileName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const { isLoading, isError, error, data } = useQuery(
    ["texekanqs"],
    () => getTexekanqs(),
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isBase64Loading,
    isFetching: isBase64Fetching,
    isError: isBase64Error,
    error: base64Error,
    data: base64Data,
  } = useQuery(["texekanqs", fileName], () => getTexekanqBase64(fileName), {
    keepPreviousData: true,
    enabled: !!fileName,
  });

  const createTexekanqMutation = useMutation((data) => createTexekanq(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("texekanqs");
      message.success("Հաջողությամբ կատարվել է");
    },
    onError: (error, variables, context, mutation) => {
      console.log("error,error", error);
      message.error(error?.response?.data?.message || "Ինչ-որ բան այնպես չէ");
    },
  });

  const onCreateTexekanq = (data) => {
    createTexekanqMutation.mutateAsync(data);
  };

  const onDownloadClick = (fileName) => {
    setFileName(fileName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewDocument = () => {
    setAnchorEl(null);
    setShowDialog(true);
  };

  const columns = [
    {
      title: "N",
      dataIndex: "document_number",
    },
    {
      title: "Մալբրի N",
      dataIndex: "mul_number",
    },
    {
      title: "Ձև",
      dataIndex: "Texekanqtype",
      render: (_, record) => record.Texekanqtype.name,
    },
    {
      title: "ՀԾՀ",
      dataIndex: "pnum",
    },
    {
      title: "Անուն, ազգանուն",
      dataIndex: "User",
      render: (_, record) => record.person_fname + " " + record.person_lname,
    },
    {
      title: "Աշխատակից",
      dataIndex: "User",
      render: (_, record) => record.User.firstName + " " + record.User.lastName,
    },
    {
      title: "Ստեղծման ա/թ",
      dataIndex: "createdAt",
      render: (_, record) => formatDate(new Date(record.createdAt)),
    },
    {
      title: "Արտահանել",
      key: "action",
      render: (_, record) =>
        fileName && fileName === record.file_name && base64Data?.attachment ? (
          <Space size="middle" align="center">
            <Button
              type="primary"
              danger
              ghost
              onClick={() => handleViewDocument(base64Data.attachment)}
              icon={<VisibilityIcon />}
              loading={fileName === record.file_name && isBase64Fetching}
            />
            <Button
              type="primary"
              danger
              ghost
              onClick={handleClose}
              loading={fileName === record.file_name && isBase64Fetching}
            >
              <a
                href={`data:application/pdf;base64,${base64Data.attachment}`}
                download={fileName}
                style={{
                  textDecoration: "none",
                }}
              >
                <FileDownloadIcon />
              </a>
            </Button>
          </Space>
        ) : (
          <Button
            type="primary"
            danger
            ghost
            onClick={() => onDownloadClick(record.file_name)}
            icon={<PictureAsPdfIcon />}
            loading={fileName === record.file_name && isBase64Fetching}
          />
        ),
    },
  ];

  const texekanqsWithKeys = data?.texekanqs?.map((row) => ({
    ...row,
    key: row.id,
  }));

  return {
    data: texekanqsWithKeys,
    error,
    columns,
    isError,
    isLoading,
    isBase64Loading,
    isBase64Error,
    base64Error,
    base64Data,
    showDialog,
    setShowDialog,
    anchorEl,
    onCreateTexekanq,
    texekanqData: createTexekanqMutation.data,
    texekanqIsLoading: createTexekanqMutation.isLoading,
  };
};