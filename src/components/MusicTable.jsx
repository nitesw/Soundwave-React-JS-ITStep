import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MusicContext } from "../contexts/music.context";

const api = "https://soundwave-web-api.azurewebsites.net/api/";
const serverUrl = "https://soundwave-web-api.azurewebsites.net";

const MusicTable = () => {
  const { count, setCount, ids, addId, removeId } = useContext(MusicContext);
  const [music, setMusic] = useState([]);
  const allMusic = `${api}music/all`;

  const addToFavourites = (id) => {
    if (ids.includes(id)) {
      removeId(id);
      setCount(ids.length);
    } else {
      addId(id);
      setCount(ids.length);
    }
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
          <Link to={`/music/edit/${record.id}`}>
            <Button color="default" variant="filled" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Delete the track"
            description={`Are you sure you want to delete ${record.title}?`}
            onConfirm={() => deleteItem(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" variant="filled" icon={<DeleteOutlined />} />
          </Popconfirm>
          <ConfigProvider theme={{ token: { colorPrimary: "#fa8c16" } }}>
            <Button
              color="primary"
              variant="filled"
              icon={<StarOutlined />}
              onClick={() => addToFavourites(record.id)}
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
        setMusic(data);
      });
  }, []);
  const deleteItem = (id) => {
    fetch(api + "music/delete?id=" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setMusic(music.filter((x) => x.id !== id));
        message.success("Track deleted successfuly!");
      } else {
        message.error("Something went wrong!");
      }
    });
  };

  return (
    <>
      <Link to="/music/create">
        <Button
          color="primary"
          icon={<AppstoreAddOutlined />}
          variant="filled"
          style={{ marginBottom: "16px" }}
        >
          Create new track
        </Button>
      </Link>

      <Table columns={columns} dataSource={music} rowKey="id" />
    </>
  );
};
export default MusicTable;
