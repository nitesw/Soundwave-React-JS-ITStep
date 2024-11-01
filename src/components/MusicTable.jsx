import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const api = "https://localhost:7015/api/";
const serverUrl = "https://localhost:7015";

const MusicTable = () => {
  const [music, setMusic] = useState([]);
  const allMusic = `${api}music/all`;

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "image",
      render: (_, item) => (
        <img height="50" src={serverUrl + item.imgUrl} alt={item.title} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Visibility",
      dataIndex: "isPublic",
      key: "visibility",
      render: (text) =>
        text === true ? (
          <Tag color="green">Public</Tag>
        ) : (
          <Tag color="volcano">Private</Tag>
        ),
    },
    {
      title: "Genre",
      dataIndex: "genreName",
      key: "genre",
    },
    {
      title: "Upload Date",
      key: "uploadDate",
      dataIndex: "uploadDate",
      render: (date) => (
        <p>
          {new Date(date).getDate() < 10
            ? "0" + new Date(date).getDate()
            : new Date(date).getDate()}
          .
          {new Date(date).getMonth() + 1 < 10
            ? "0" + (new Date(date).getMonth() + 1)
            : new Date(date).getMonth() + 1}
          .{new Date(date).getFullYear()}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/music/${record.id}`}>
            <Button
              color="primary"
              variant="filled"
              icon={<InfoCircleOutlined />}
            />
          </Link>
          <Button color="default" variant="filled" icon={<EditOutlined />} />
          <Popconfirm
            title="Delete the track"
            description={`Are you sure you want to delete ${record.title}?`}
            onConfirm={() => deleteItem(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" variant="filled" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetch(allMusic)
      .then((res) => res.json())
      .then((data) => {
        setMusic(data);
      });
  }, []);
  const deleteItem = (id) => {
    setMusic(music.filter((x) => x.id !== id));
    message.success("Track deleted successfuly!");
  };

  return <Table columns={columns} dataSource={music} rowKey="id" />;
};
export default MusicTable;
