import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  
  ModalBody,
  Modal,
  DropdownItem,
  Form,
  Badge,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  TooltipComponent,
  Row,
  Col,
  OverlineTitle,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
  RSelect,
} from "../../components/Component";
import { useForm } from "react-hook-form";
import Modelview from "./OperationsView"
import ModalAdd from "./OperationsModalAdd";
import axios from "axios";

const OperationsList = () => {
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    add: false,
  });
  const [modalDetail, setModalDetail] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [formData, setFormData] = useState({
        id : 1,
        Cause: "donation",
        type: "receiving",
        description: "Added few dollars",
        Amount: 5000,
        date : "20 August 2020",
        balance: 2000000,
        teamleadId: "AX-0916",
        status:"completed"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.ref.localeCompare(b.ref));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.ref.localeCompare(a.ref));
      setData([...sortedData]);
    }
  };
  const token = localStorage.getItem("accessToken");
  
 



  // Changing state value when searching name
  useEffect(() => {
    axios.get("http://localhost:5000/api/operations/get", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        const responseData = response.data;
  
        if (onSearchText !== "") {
          const filteredObject = responseData.filter((item) => {
            return item.teamleadId.toLowerCase().includes(onSearchText.toLowerCase());
          });
          setData(filteredObject);
        } else {
          setData(responseData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [onSearchText]);
  

  const getOperationsList=()=>{
    axios.get("http://localhost:5000/api/operations/get", {
  headers: {
    Authorization: `Bearer ${token}`
  }

})
  .then((response) => {
    console.log(response.data);
    setData(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

  onFilterChange("");

  
  }

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
        id : 0,
        Cause: "",
        type: "",
        description: "",
        Amount: 0,
        date : "",
        balance: 0,
        teamleadId: "0",
        status:"completed"
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ add: false });
    resetForm();
  };

  // function to change to reject property for an item
  const onRejectClick = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Rejected";
    setData([...newData]);
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setDetail(data[index]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // function to toggle the form modal
  
  // function to toggle details modal
  const toggleModalDetail = () => setModalDetail(!modalDetail);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Trasaction List - Crypto"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Operations</BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {data.length} Activities.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Button color="light" outline className="btn-white">
                    <Icon name="download-cloud"></Icon>
                    <span>Export</span>
                  </Button>
                </li>
                <li>
                  <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                    <Icon name="plus"></Icon>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">All Activities</h5>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <Button
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </Button>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <div className="dot dot-primary"></div>
                          <Icon name="filter-alt"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end className="filter-wg dropdown-menu-xl">
                          <div className="dropdown-head">
                            <span className="sub-title dropdown-title">Advanced Filter</span>
                            <div className="dropdown">
                              <Button size="sm" className="btn-icon">
                                <Icon name="more-h"></Icon>
                              </Button>
                            </div>
                          </div>
                          <div className="dropdown-body dropdown-body-rg">
                            <Row className="gx-6 gy-4">
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Type</label>
                                  <RSelect  placeholder="Any Activity" />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Status</label>
                                  <RSelect placeholder="Any Status" />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Pay Currency</label>
                                  <RSelect  placeholder="Any coin" />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Method</label>
                                  <RSelect  placeholder="Any Method" />
                                </div>
                              </Col>

                              <Col size="6">
                                <div className="form-group">
                                  <div className="custom-control custom-control-sm custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="includeDel" />
                                    <label className="custom-control-label" htmlFor="includeDel">
                                      {" "}
                                      Including Deleted
                                    </label>
                                  </div>
                                </div>
                              </Col>

                              <Col size="12">
                                <div className="form-group">
                                  <Button type="button" className="btn btn-secondary">
                                    Filter
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="dropdown-foot between">
                            <a
                              href="#reset"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                              className="clickable"
                            >
                              Reset Filter
                            </a>
                            <a
                              href="#save"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              Save Filter
                            </a>
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <Icon name="setting"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end className="dropdown-menu-xs">
                          <ul className="link-check">
                            <li>
                              <span>Show</span>
                            </li>
                            <li className={itemPerPage === 10 ? "active" : ""}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setItemPerPage(10);
                                }}
                              >
                                10
                              </DropdownItem>
                            </li>
                            <li className={itemPerPage === 15 ? "active" : ""}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setItemPerPage(15);
                                }}
                              >
                                15
                              </DropdownItem>
                            </li>
                          </ul>
                          <ul className="link-check">
                            <li>
                              <span>Order</span>
                            </li>
                            <li className={sort === "dsc" ? "active" : ""}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setSortState("dsc");
                                  sortFunc("dsc");
                                }}
                              >
                                DESC
                              </DropdownItem>
                            </li>
                            <li className={sort === "asc" ? "active" : ""}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setSortState("asc");
                                  sortFunc("asc");
                                }}
                              >
                                ASC
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
                <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                  <div className="search-content">
                    <Button
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                      className="search-back btn-icon toggle-search"
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by Order Id"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody bodyclass="nk-tb-tnx">
              <DataTableHead>
                <DataTableRow>
                  <span>Name</span>
                </DataTableRow>

                
                
                <DataTableRow size="lg">
                  <span>Type</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span>Purpose</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Team Lead Id</span>
                </DataTableRow>
                <DataTableRow size="sm" >
                  <span>Operational Cost</span>
                </DataTableRow>
                <DataTableRow >
                  <span className="sub-text d-none d-md-block">Balance</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-status">
                  <span className="sub-text d-none d-md-block">Status</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools"></DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => {
                    return (
                      <DataTableItem key={item.id}>
                        <DataTableRow>
                          <div className="nk-tnx-type">
                            
                            <div className="nk-tnx-type-text">
                              <span className="tb-lead">{item.name}</span>
                              <span className="tb-date">{item.date}</span>
                            </div>
                          </div>
                        </DataTableRow>
                        <DataTableRow  size="lg">
                            <span className="tb-amount">{item.type}</span>
                        </DataTableRow>
                        <DataTableRow  size="lg">
                            <span className="tb-amount">{item.purpose}</span>
                        </DataTableRow>

                        <DataTableRow size="sm">
                          <span className="tb-amount">{item.teamleadId}</span>
                        </DataTableRow>
                        
                        <DataTableRow  size="sm">
                            <span className="tb-amount">
                          {item.type=="recing"? "+":"-"} {item.amount} <span>PKR</span>
                          </span>
                        </DataTableRow>
                        <DataTableRow  size="sm">
                          <span className="tb-amount">
                          {item.balance} <span>PKR</span>
                          </span>
                          
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-status">
                          <div
                            className={`dot dot-${
                              item.status === "completed"
                                ? "success"
                                : item.status === "upcoming"
                                ? "warning"
                                : item.status === "pending"
                                ? "info"
                                : "danger"
                            } d-md-none`}
                          ></div>
                          <Badge
                            className="badge-sm badge-dim d-none d-md-inline-flex"
                            color={`outline-${
                              item.status === "completed"
                                ? "success"
                                : item.status === "upcoming"
                                ? "warning"
                                : item.status === "pending"
                                ? "info"
                                : "danger"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li
                              className="nk-tb-action-hidden"
                              onClick={() => {
                                loadDetail(item.id);
                                toggleModalDetail();
                              }}
                            >
                              <TooltipComponent
                                tag="a"
                                containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                id={"a"+item.id + "details"}
                                icon="eye"
                                direction="top"
                                text="Details"
                              />
                            </li>
                            {item.status !== "completed" && item.status !== "pending" && (
                              <React.Fragment>
                                <li className="nk-tb-action-hidden" onClick={() => onRejectClick(item.id)}>
                                  <TooltipComponent
                                    tag="a"
                                    containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                    id={"a"+item.id + "reject"}
                                    icon="cross-round"
                                    direction="top"
                                    text="Remove"
                                  />
                                </li>
                              </React.Fragment>
                            )}
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  tag="a"
                                  className="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon"
                                >
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    {item.status !== "Completed" && item.status !== "Rejected" && (
                                      <React.Fragment>
                                        
                                        <li onClick={() => onRejectClick(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#reject"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="cross-round"></Icon>
                                            <span>Reject</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
                                    )}
                                    <li
                                      onClick={() => {
                                        loadDetail(item.id);
                                        toggleModalDetail();
                                      }}
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#details"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="eye"></Icon>
                                        <span>Details</span>
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
              {currentItems.length > 0 ? (
                <PaginationComponent
                  noDown
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            
             <ModalAdd get={getOperationsList} toggle={() => setModal({ add: false })} />
          </ModalBody>
        </Modal>

        <Modal isOpen={modalDetail} toggle={() => toggleModalDetail()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                toggleModalDetail();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <Modelview detail={detail} />
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default OperationsList;