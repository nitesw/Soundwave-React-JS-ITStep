import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Skeleton, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = "https://soundwave-web-api.azurewebsites.net/api/";
const serverUrl = "https://soundwave-web-api.azurewebsites.net";

export default function TrackInfo() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(api + "music/getTrack?id=" + id)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      return interval === 1 ? "1 week ago" : `${interval} weeks ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }
    return "just now";
  }

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        color="default"
        variant="text"
        icon={<LeftCircleOutlined />}
      ></Button>
      {item ? (
        <div>
          <Flex style={{ padding: "16px" }}>
            <Image
              style={{ borderRadius: "5px" }}
              width={300}
              src={serverUrl + item.imgUrl}
            />
            <div style={{ marginLeft: "16px", width: "100%" }}>
              <Flex justify="space-between">
                <div>
                  <h2 style={{ margin: "0" }}>{item.title}</h2>
                  <h3 style={{ margin: "0" }}>{item.genreName}</h3>
                </div>
                <div>
                  <h3 style={{ margin: "0" }}>
                    <Tag>{timeAgo(item.uploadDate)}</Tag>
                  </h3>
                </div>
              </Flex>
            </div>
          </Flex>
        </div>
      ) : (
        <Flex style={{ padding: "16px" }}>
          <Skeleton.Image active style={{ width: "300px", height: "300px" }} />
          <Flex
            justify="space-between"
            style={{ marginLeft: "16px", width: "100%" }}
          >
            <Skeleton.Input active />
            <Skeleton.Input active />
          </Flex>
        </Flex>
      )}
    </div>
  );
}
