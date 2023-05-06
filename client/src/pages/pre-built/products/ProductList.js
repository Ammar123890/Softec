import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import SimpleBar from "simplebar-react";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
} from "../../../components/Component";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";
import { productData, categoryOptions } from "./ProductData";
import { useForm } from "react-hook-form";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../../components/Component";

const ProductList = () => {
  const [data, setData] = useState(productData);
  const [sm, updateSm] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
      title: "",
      market_price: 0,
      cost_price: 0,
      margin: 0,
      inventory_type: "",
      minimum_age: 18,
      quantity: 0,
      img_Url: "",
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [files, setFiles] = useState([]);

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = productData.filter((item) => {
        return item.sku.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...productData]);
    }
  }, [onSearchText]);

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // category change
  const onCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      title: "",
      market_price: 0,
      cost_price: 0,
      margin: 0,
      inventory_type: "",
      minimum_age: 18,
      quantity: 0,
      img_Url: "",
    });
    reset({});
  };

  const onFormSubmit = (form) => {
    const { title, market_price, cost_price, margin,inventory_type,minimum_age,quantity,img_Url } = form;
    let submittedData = {
      id: 0,
      title: title,
      market_price: market_price,
      cost_price: cost_price,
      margin: margin,
      inventory_type: formData.inventory_type,
      minimum_age: minimum_age,
      quantity: quantity,
      img_Url: img_Url,
    };

    console.log(submittedData);
    setData([submittedData, ...data]);
    setView({ open: false });
    setFiles([]);
    resetForm();
  };

  const onEditSubmit = () => {
    let submittedData;
    let newItems = data;
    let index = newItems.findIndex((item) => item.id === editId);

    newItems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: editId,
      title: formData.title,
      market_price: formData.market_price,
      cost_price: formData.cost_price,
      margin: formData.margin,
      inventory_type: formData.inventory_type,
      minimum_age: formData.minimum_age,
      quantity: formData.quantity,
      img_Url: formData.img_Url,
        };
      }
    });
    newItems[index] = submittedData;
    //setData(newItems);
    resetForm();
    setView({ edit: false, add: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
      id: item.id,
      title: item.title,
      market_price: item.market_price,
      cost_price: item.cost_price,
      margin: item.margin,
      inventory_type: item.inventory_type,
      minimum_age: item.minimum_age,
      quantity: item.quantity,
      img_Url: item.img_Url,
        });
      }
    });
    setEditedId(id);
    setFiles([]);
    setView({ add: false, edit: true });
  };

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to delete a product
  const deleteProduct = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteProduct = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit, reset } = useForm();

  return (
    <React.Fragment>
      <Head title="Product List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Products</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Quick search by SKU"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Product</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Card className="card-bordered">
            <div className="card-inner-group">
              <div className="card-inner p-0">
                <DataTableBody>
                  <DataTableHead>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="uid_1"
                          onChange={(e) => selectorCheck(e)}
                        />
                        <label className="custom-control-label" htmlFor="uid_1"></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Title</span>
                    </DataTableRow>
                    
                    <DataTableRow size="md">
                      <span>Type</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Quantity</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Market Price</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Cost Price</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Margin</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Minimum Age</span>
                    </DataTableRow>
                   
                    
                  </DataTableHead>
                  {currentItems.length > 0
                    ? currentItems.map((item) => {
                        return (
                          <DataTableItem key={item.id}>
                            <DataTableRow className="nk-tb-col-check">
                              {/* <div className="custom-control custom-control-sm custom-checkbox notext">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  defaultChecked={item.check}
                                  id={item.id + "uid1"}
                                  key={Math.random()}
                                  onChange={(e) => onSelectChange(e, item.id)}
                                />
                                <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                              </div> */}
                            </DataTableRow>
                            <DataTableRow size="sm">
                              <span className="tb-product">
                                <img src={item.img_Url ? item.img_Url : ProductH} alt="product" className="thumb" />
                                <span className="title">{item.title}</span>
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.inventory_type}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.quantity}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub"> {item.market_price} PKR</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub"> {item.cost_price} PKR</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub"> {item.market_price-item.cost_price} PKR</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-sub">{item.minimum_age}</span>
                            </DataTableRow>
                            
                            <DataTableRow className="nk-tb-col-tools">
                              <ul className="nk-tb-actions gx-1 my-n1">
                                <li className="me-n1">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag="a"
                                      href="#more"
                                      onClick={(ev) => ev.preventDefault()}
                                      className="dropdown-toggle btn btn-icon btn-trigger"
                                    >
                                      <Icon name="more-h"></Icon>
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#edit"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              onEditClick(item.id);
                                              toggle("edit");
                                            }}
                                          >
                                            <Icon name="edit"></Icon>
                                            <span>Edit Product</span>
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#view"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              onEditClick(item.id);
                                              toggle("details");
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>View Product</span>
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#remove"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              deleteProduct(item.id);
                                            }}
                                          >
                                            <Icon name="trash"></Icon>
                                            <span>Remove Product</span>
                                          </DropdownItem>
                                        </li>
                                      </ul>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </li>
                              </ul>
                            </DataTableRow>
                          </DataTableItem>
                        );
                      })
                    : null}
                </DataTableBody>
                <div className="card-inner">
                  {data.length > 0 ? (
                    <PaginationComponent
                      itemPerPage={itemPerPage}
                      totalItems={data.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-silent">No products found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Block>

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Product Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.title}
                          />
                          {errors.title && <span className="invalid">{errors.title.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="regular-price">
                          Market Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            name="market_price"
                            ref={register({ required: "This is required" })}
                            className="form-control"
                            defaultValue={formData.market_price}
                            onChange={(e) => { setFormData({ ...formData, market_price: e.target.value }) } }
                          />
                          {errors.price && <span className="invalid">{errors.price.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="cost_price">
                          Cost Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="cost_price"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.cost_price}
                            onChange={(e) => { setFormData({ ...formData, cost_price: e.target.value }) } }
                          />
                          {errors.salePrice && <span className="invalid">{errors.salePrice.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="stock">
                          Stock
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.quantity}
                            onChange={(e) => { setFormData({ ...formData, quantity: e.target.value }) } }
                          />
                          {errors.stock && <span className="invalid">{errors.stock.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="SKU">
                          Minimum Age
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="minimum_age"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.minimum_age}
                            onChange={(e) => { setFormData({ ...formData, minimum_age: e.target.value }) }}

                          />
                          {errors.stock && <span className="invalid">{errors.stock.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="inventory_type">
                          Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            
                            options={[{
                              value: "Gaming Gear",
                              label: "Gaming Gear",
                            },
                            {
                              value: "Video Games",
                              label: "Electronics",
                            }]}
                            defaultValue={formData.inventory_type}
                            onChange={(e) => {
                              setFormData({ ...formData, inventory_type: e.value });
                            }}

                          />
                          {errors.category && <span className="invalid">{errors.category.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="img_Url">
                          Product Image
                        </label>
                        <div className="form-control-wrap">
                          <img src={formData.img_Url} alt=""></img>
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                              {files.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Update Product</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Product <small className="text-primary"> {formData.title}</small>
              </h4>
              <img src={formData.img_Url} alt="" />
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Product Name</span>
                  <span className="caption-text">{formData.title}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Market Price</span>
                  <span className="caption-text">$ {formData.market_price}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Category</span>
                  <span className="caption-text">{formData.inventory_type}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Stock</span>
                  <span className="caption-text"> {formData.quantity}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Product</BlockTitle>
              <BlockDes>
                <p>Add information or update product.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Product Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.title}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Market Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        name="market_price"
                        ref={register({ required: "This is required" })}
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.market_price}
                      />
                      {errors.price && <span className="invalid">{errors.price.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Cost Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        name="cost_price"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.cost_price}
                      />
                      {errors.salePrice && <span className="invalid">{errors.salePrice.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock">
                      Stock
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.quantity}
                      />
                      {errors.stock && <span className="invalid">{errors.stock.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="minimum_age">
                      Minimum Age
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_age"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.minimum_age}
                      />
                      {errors.sku && <span className="invalid">{errors.sku.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <div className="form-control-wrap">
                      <RSelect
                        name="inventory_type"
                        options={[{
                          value: "Gaming Gear",
                          label: "Gaming Gear",
                        },
                        {
                          value: "Video Games",
                          label: "Electronics",
                        }]}
                        defaultValue={formData.inventory_type}
                        onChange={(e) => {
                          setFormData({ ...formData, inventory_type: e.value });
                        }}
                        
                        //ref={register({ required: "This is required" })}
                      />
                      {errors.category && <span className="invalid">{errors.category.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                          <input {...getInputProps()} />
                          {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                              <div className="dz-image">
                                <img src={file.preview} alt="preview" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Product</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default ProductList;
