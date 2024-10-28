import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";

const api = "https://localhost:7015/api/";
const serverUrl = "https://localhost:7015";

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
        <a>View</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const MusicTable = () => {
  const [music, setMusic] = useState([]);
  const allMusic = `${api}music/all`;
  useEffect(() => {
    fetch(allMusic)
      .then((res) => res.json())
      .then((data) => {
        setMusic(data);
      });
  }, []);

  return <Table columns={columns} dataSource={music} rowKey="id" />;
};
export default MusicTable;
