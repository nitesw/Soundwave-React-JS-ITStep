import React, { useEffect, useState } from "react";
import { LeftCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Space,
  Upload,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { TextArea } = Input;

const api = "https://soundwave-web-api.azurewebsites.net/api/";

const EditTrack = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [track, setTrack] = useState({});
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    fetch(api + "music/genres")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGenres(
          data.map((x) => {
            return { label: x.name, value: x.id };
          })
        );
      });

    fetch(api + "music/getTrack?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTrack(data);
        form.setFieldsValue(data);
      });
  }, []);

  const [selectedGenre, setSelectedGenre] = useState(1);
  const onSubmit = (item) => {
    const entity = new FormData();
    Object.keys(item).forEach((key) => {
      const value = item[key];
      if (key !== "image" && key !== "track") {
        if (value) {
          entity.append(key, value);
        } else if (key === "isPublic") {
          entity.append(key, false);
        } else if (key === "genreId") {
          entity.append(key, selectedGenre);
        } else {
          entity.append(key, "");
        }
      } else {
        if (value) entity.append(key, value.file);
        else entity.append(key, "");
      }
    });

    entity.append("isArchived", false);
    console.log(entity);

    fetch(api + "music/edit", {
      method: "PUT",
      body: entity,
    }).then((res) => {
      if (res.status === 200) {
        message.success("Track edited successfully!");
        navigate(-1);
      } else {
        res.json().then((res) => {
          const msg = res.errors[Object.keys(res.errors)[0]][0];
          message.error(msg);
        });
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        color="default"
        variant="text"
        icon={<LeftCircleOutlined />}
      ></Button>
      <h1>Create new track</h1>
      <Form
        labelCol={{
          span: 6,
        }}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        form={form}
      >
        <Form.Item name="id" hidden></Form.Item>
        <Form.Item name="uploadDate" hidden></Form.Item>
        <Form.Item label="Title" name="title" rules={{ max: 100 }} required>
          <Input placeholder="Enter the title..." maxLength={100} />
        </Form.Item>

        <div style={{ display: "flex", width: "100%", gap: "16px" }}>
          <Form.Item
            label="Image"
            name="image"
            style={{ width: "100%" }}
            required
          >
            <Upload
              maxCount={1}
              style={{ width: "100%" }}
              accept=".pjp,.jpg,.pjpeg,.jpeg,.jfif,.png"
              beforeUpload={() => {
                return false;
              }}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Track"
            name="track"
            style={{ width: "100%" }}
            required
          >
            <Upload
              maxCount={1}
              style={{ width: "100%" }}
              accept=".mp3,.wav"
              beforeUpload={() => {
                return false;
              }}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <div style={{ display: "flex", width: "100%", gap: "16px" }}>
          <Form.Item
            label="Genre"
            name="genreId"
            required
            style={{ width: "100%" }}
          >
            <Select
              options={genres}
              defaultValue={selectedGenre}
              onChange={(value) => {
                setSelectedGenre(value);
              }}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Additional tags"
            name="additionalTags"
            style={{ width: "100%" }}
          >
            <Input placeholder="Enter additional tags..." maxLength={40} />
          </Form.Item>
          <Form.Item label="Artist" name="artistName" style={{ width: "100%" }}>
            <Input placeholder="Enter artist name..." maxLength={20} />
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description">
          <TextArea
            rows={8}
            placeholder="Enter description..."
            maxLength={100}
          />
        </Form.Item>

        <Form.Item name="isPublic" valuePropName="checked">
          <Checkbox>Public</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditTrack;
