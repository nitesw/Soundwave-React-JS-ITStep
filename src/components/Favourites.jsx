import React, { useContext, useEffect, useState } from "react";
import { Button, ConfigProvider, Space, Table, Tag } from "antd";
import { InfoCircleOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MusicContext } from "../contexts/music.context";

const api = "https://soundwave-web-api.azurewebsites.net/api/";
const serverUrl = "https://soundwave-web-api.azurewebsites.net";
export default function Favourites() {
  const { count, setCount, ids, setIds, addId, removeId } =
    useContext(MusicContext);
  const [music, setMusic] = useState([]);
  const allMusic = `${api}music/all`;

  const removeFromFavourites = (id) => {
    const updatedIds = ids.filter((x) => x !== id);
    setIds(updatedIds);
    setCount(updatedIds.length);
  };

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
          <ConfigProvider theme={{ token: { colorPrimary: "#fa8c16" } }}>
            <Button
              color="primary"
              variant="filled"
              icon={<StarOutlined />}
              onClick={() => removeFromFavourites(record.id)}
            />
          </ConfigProvider>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetch(allMusic)
      .then((res) => res.json())
      .then((data) => {
        const tmp = data.filter((item) => ids.includes(item.id));
        setMusic(tmp);
      });
  }, [allMusic, ids]);

  return (
    <>
      <Table columns={columns} dataSource={music} rowKey="id" />
    </>
  );
}
