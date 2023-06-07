import React, { Fragment, useState } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

import user from "../../assets/images/user.png";
import { imageUpload } from "../../api/file";

function VariantForm({ setVariants }) {
  const [variant, setVariant] = useState({
    color: {
      color_name: "",
      color_code: "",
    },
    size: {
      size: "",
      stock: 0,
    },
    sku: "",
  });

  const [showValue, setShowValue] = useState(false);

  const [dummyimgs, setDummyimgs] = useState([{ img: user }]);

  const [imageData, setImageData] = useState({ id: "", image_id: "" });

  const _handleImgChange = (e, i) => {
    e.preventDefault();
    let reader = new FileReader();

    const formData = new FormData();

    const image = e.target.files[0];

    formData.append("file", image);

    imageUpload(formData).then((data) => {
      setImageData(data);
    });

    reader.onload = () => {
      dummyimgs[i].img = reader.result;

      setDummyimgs(dummyimgs);
    };
    reader.readAsDataURL(image);
  };

  const handleSubmit = () => {
    const { id, image_id } = imageData;

    setVariants((prev) => {
      const data = {
        ...variant,
        id,
        image_id,
      };

      return [...prev, data];
    });
    setShowValue(true);
  };

  console.log(imageData);

  return (
    <Fragment>
      {showValue ? (
        <div className="my-4">
          <h5>Color: </h5>
          <p>Color name: {variant.color.color_name}</p>
          <p>Color code: {variant.color.color_code}</p>
          <h5>Size: </h5>
          <p>Size: {variant.size.size}</p>
          <p>Stock: {variant.size.stock}</p>
          <p>Sku: {variant.sku}</p>
        </div>
      ) : (
        <>
          <p className="h5">Color: </p>
          <FormGroup className="form-group mb-3 row d-flex">
            <div className="w-50">
              {" "}
              <Label className="">Name: </Label>
              <Input
                className="touchspin form-control"
                type="text"
                name="color_name"
                onChange={(e) => {
                  setVariant({
                    ...variant,
                    color: { ...variant.color, color_name: e.target.value },
                  });
                }}
              />
            </div>
            <div className="w-50">
              {" "}
              <Label className="">Value: </Label>
              <Input
                className="touchspin form-control"
                type="color"
                name="color_code"
                onChange={(e) => {
                  setVariant({
                    ...variant,
                    color: { ...variant.color, color_code: e.target.value },
                  });
                }}
              />
            </div>
          </FormGroup>
          <p className="h5">Size: </p>
          <FormGroup className="form-group mb-3 row d-flex">
            <div className="w-50">
              {" "}
              <Label className="">Select Size :</Label>
              <div className="">
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect1"
                  name="size"
                  onChange={(e) => {
                    setVariant({
                      ...variant,
                      size: { ...variant.size, size: e.target.value },
                    });
                  }}
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                </select>
              </div>
            </div>
            <div className="w-50">
              {" "}
              <Label className="">Stock: </Label>
              <Input
                className="touchspin form-control"
                type="number"
                name="stock"
                onChange={(e) => {
                  setVariant({
                    ...variant,
                    size: {
                      ...variant.size,
                      stock: parseFloat(e.target.value),
                    },
                  });
                }}
              />
            </div>
          </FormGroup>
          <FormGroup className="form-group mb-3 row">
            <Label className="">Sku :</Label>
            <div className="">
              <Input
                className="form-control mb-0"
                name="sku"
                id="validationCustom04"
                type="text"
                required
                onChange={(e) => {
                  setVariant({ ...variant, sku: e.target.value });
                }}
              />
            </div>
            <div className="valid-feedback">Looks good!</div>
          </FormGroup>

          <ul className="file-upload-product">
            {dummyimgs.map((res, i) => {
              return (
                <li key={i}>
                  <div className="box-input-file">
                    <Input
                      className="upload"
                      type="file"
                      onChange={(e) => _handleImgChange(e, i)}
                    />
                    <img
                      alt=""
                      src={res.img}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <Button
            onClick={handleSubmit}
            color="dark"
            style={{ marginBottom: "20px" }}
          >
            Add
          </Button>
        </>
      )}
    </Fragment>
  );
}

export default VariantForm;
