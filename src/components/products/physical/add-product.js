import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import MDEditor from "@uiw/react-md-editor";
import { imageUpload } from "../../../api/file";
import { addProduct } from "../../../api/product";
import VariantForm from "../../common/variantForm";
import { ToastContainer, toast } from "react-toastify";

const Add_product = () => {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState();
  const [dummyimgs, setDummyimgs] = useState([
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
  ]);

  const [imageData, setImageData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(dummyimgs[0].img);

  const [variantCount, setVariantCount] = useState(0);
  const [variants, setVariants] = useState([]);

  const onChange = (e) => {
    setValue(e);
  };

  const IncrementItem = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    } else {
      return null;
    }
  };
  const DecreaseItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      return null;
    }
  };
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  //	image upload

  const _handleImgChange = (e, i) => {
    e.preventDefault();
    let reader = new FileReader();

    const formData = new FormData();

    const image = e.target.files[0];

    formData.append("file", image);

    // request api call for upload image

    imageUpload(formData).then((data) => {
      setImageData((prev) => {
        return [...prev, data];
      });
    });

    reader.onload = () => {
      dummyimgs[i].img = reader.result;
      setFile(reader.result);
      setDummyimgs(dummyimgs);
    };
    reader.readAsDataURL(image);
  };

  const handleValidSubmit = (e) => {
    e.preventDefault();

    // get data from form

    const name = e.target.name.value;
    const brand = e.target.brand.value;
    const price = e.target.price.value;
    const discount = e.target.discount.value;
    const type = e.target.type.value;
    const category = e.target.category.value;
    const newValue = e.target.new.value === "Yes" ? true : false;
    const sale = e.target.sale.value === "Yes" ? true : false;
    const images = imageData;

    const product_data = {
      name,
      brand,
      price: parseFloat(price),
      discount: parseFloat(discount),
      type,
      category,
      new: newValue,
      sale,
      images,
      description: value,
      quantity: parseFloat(quantity),
      variants: variants || [],
      ratings: [],
      reviews: [],
    };

    // request api call for adding product

    addProduct(product_data).then((res) => {
      console.log(res);
      if (res._id) {
        toast.success("Product created successfully");
        e.target.name.value = "";
        e.target.brand.value = "";
        e.target.price.value = "";
        e.target.discount.value = "";
        e.target.type.value = "";
        e.target.category.value = "";
        e.target.new.value = "";
        e.target.sale.value = "";
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Physical" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Product</h5>
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  <Col xl="5">
                    <div className="add-product">
                      <Row>
                        <Col xl="9 xl-50" sm="6 col-9">
                          <img
                            src={file || one}
                            alt=""
                            className="img-fluid image_zoom_1 blur-up lazyloaded"
                          />
                        </Col>
                        <Col xl="3 xl-50" sm="6 col-3">
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
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xl="7">
                    <Form
                      className="needs-validation add-product-form"
                      onSubmit={handleValidSubmit}
                    >
                      <div className="form form-label-center">
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Name :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="name"
                              id="validationCustom01"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Price :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Brand :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="brand"
                              id="validationCustom03"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Discount :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="discount"
                              id="validationCustom04"
                              type="number"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Type :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="exampleFormControlSelect2"
                              name="type"
                            >
                              {[
                                "electronics",
                                "furniture",
                                "jewellery",
                                "fashion",
                                "beauty",
                                "tools",
                                "watch",
                                "shoes",
                                "bags",
                                "kids",
                                "eyeware",
                                "light",
                                "all",
                              ].map((item, i) => (
                                <option key={i} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Category :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="exampleFormControlSelect3"
                              name="category"
                            >
                              {[
                                "Electronics",
                                "Clothing",
                                "Home",
                                "Beauty",
                                "Books",
                              ].map((item, i) => (
                                <option key={i} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            New :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="exampleFormControlSelect4"
                              name="new"
                            >
                              {["Yes", "No"].map((item, i) => (
                                <option key={i} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Sale :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="exampleFormControlSelect5"
                              name="sale"
                            >
                              {["Yes", "No"].map((item, i) => (
                                <option key={i} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </FormGroup>
                      </div>
                      <div className="form">
                        {/* add quantity section */}

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Total Products :
                          </Label>
                          <fieldset className="qty-box ms-0">
                            <div className="input-group bootstrap-touchspin">
                              <div className="input-group-prepend">
                                <Button
                                  className="btn btn-primary btn-square bootstrap-touchspin-down"
                                  type="button"
                                  onClick={DecreaseItem}
                                >
                                  <i className="fa fa-minus"></i>
                                </Button>
                              </div>
                              <div className="input-group-prepend">
                                <span className="input-group-text bootstrap-touchspin-prefix"></span>
                              </div>
                              <Input
                                className="touchspin form-control"
                                type="text"
                                value={quantity}
                                onChange={handleChange}
                              />
                              <div className="input-group-append">
                                <span className="input-group-text bootstrap-touchspin-postfix"></span>
                              </div>
                              <div className="input-group-append ms-0">
                                <Button
                                  className="btn btn-primary btn-square bootstrap-touchspin-up"
                                  type="button"
                                  onClick={IncrementItem}
                                >
                                  <i className="fa fa-plus"></i>
                                </Button>
                              </div>
                            </div>
                          </fieldset>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4">
                            Add Description :
                          </Label>
                          <div className="col-xl-8 col-sm-7 description-sm">
                            <MDEditor value={value} onChange={onChange} />
                          </div>
                        </FormGroup>

                        {/* add variant section */}

                        <div className="border border-secondary p-2 rounded-1 my-4">
                          <p className="h4">Add variant:</p>

                          {[...Array(variantCount).keys()].map((item) => {
                            return (
                              <VariantForm
                                key={item}
                                setVariants={setVariants}
                              />
                            );
                          })}

                          <div className="">
                            <Button
                              onClick={() =>
                                setVariantCount((prev) => prev + 1)
                              }
                              color="secondary"
                            >
                              Add New
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                          Add
                        </Button>
                        <Button type="button" color="light">
                          Discard
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Add_product;
