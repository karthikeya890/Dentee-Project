import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import "./UploadImage.css";

const UploadImage = (details, setDetails) => {
  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChange = (file) => {
    setDetails((prev) => ({ ...prev, image: file, imageError: false }));
  };

  return (
    <ImgCrop rotationSlider onModalOk={handleChange}>
      <Upload
        customRequest={({ onSuccess }) => onSuccess("ok")}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
      >
        {details.image ? (
          <img
            src={
              typeof details.image === "string"
                ? details.image
                : URL.createObjectURL(details.image)
            }
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;
