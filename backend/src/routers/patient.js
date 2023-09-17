const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patient");
const { Router } = require("express");
const { handleUpload, handleDestroy } = require("../utils/cloudinary");
const multer = require("multer");
const router = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    req.body = { ...req.body, imageUrl: "", publicId: "" };
    next();
  } else {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      req.body = {
        ...req.body,
        imageUrl: cldRes.secure_url,
        publicId: cldRes.public_id,
      };

      next();
    } catch (error) {
      req.body = { ...req.body, imageUrl: "", publicId: "" };
      next();
    }
  }
};

const updateImage = async (req, res, next) => {
  if (!req.file) {
    next();
  } else {
    // try {

    if (req.body.publicId === "") {
      console.log(
        "no public id is present so trying to upload the current image to cloudinary"
      );

      try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        if (cldRes) {
          console.log(
            "new image uploaded successfully and adding details to body"
          );

          req.body = {
            ...req.body,
            imageUrl: cldRes.secure_url,
            publicId: cldRes.public_id,
          };
        }
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
      }
    } else if (req.body.publicId !== "") {
      try {
        console.log("public id present and im deleting it");
        const deleteOldImg = await handleDestroy(req.body.publicId);

        if (deleteOldImg.result === "ok") {
          console.log("old image deleted successfully");

          const b64 = Buffer.from(req.file.buffer).toString("base64");
          let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
          const cldRes = await handleUpload(dataURI);

          if (cldRes) {
            console.log(
              "new image uploaded successfully adding image details to body"
            );

            req.body = {
              ...req.body,
              imageUrl: cldRes.secure_url,
              publicId: cldRes.public_id,
            };
          }
        }
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
      }
    }

    next();
  }
};

const deleteImage = async (req, res, next) => {
  if (req.body.publicId) {
    const cls = handleDestroy(req.body.publicId);

    if (cls) {
      next();
    }
  } else {
    next();
  }
};

router.get("/all", getPatients);

router.post("/", upload.single("image"), uploadImage, addPatient);

router.put("/", upload.single("imageUrl"), updateImage, updatePatient);

router.delete("/", deleteImage, deletePatient);

module.exports = router;
