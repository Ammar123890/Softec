
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { RSelect } from "../../components/Component";
import { OverlineTitle } from "../../components/Component";

import { Button } from "../../components/Component";
import axios from "axios";


function ModalAdd(props){
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    campaignType: "",
    Audience: "",
    type: "receiving",
    Amount: 0,
    date: Date.now(),
    balance: 0,
    teamleadId: "",
    status: "pending",

  });
  const { register, handleSubmit, errors } = useForm();
  const [data, setData] = useState(props.data);
  const onFormCancel = () => {
    resetForm();
    props.toggle();
  };


  const resetForm = () => {
    setFormData({
      id: "",
      Cause: "",
      type: "receiving",
      description: "",
      Amount: 0,
      date: Date.now(),
      balance: 0,
      teamleadId: "",
      status: "pending",
    });
  };


  const onFormSubmit = (submitData) => {
    
    
    
    axios
      .post("http://localhost:5000/api/advocacy/create", formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // Do something with the response if needed
      })
      .catch((err) => {
        console.error(err);
        // Handle errors if needed
      });
    console.log(formData);
    resetForm();
    props.toggle();
  };
  


return(
    <>
    <div className="p-2">
              <h5 className="title">Add Compaign</h5>
              <Form className="mt-4" onSubmit={handleSubmit(onFormSubmit)} noValidate>
                <Row className="g-gs">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Transaction Type</label>
                      <div className="form-control-wrap">
                        <RSelect 
                            options={ [{ value: "receiving", label: "Receive" }, { value: "spending", label: "Withdraw" }]}
                          defaultValue={[{ value: "deposit", label: "Deposit" }]}
                          onChange={(e) => setFormData({ ...formData, type: e.value })}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={ [{ value: "completed", label: "Completed" }, { value: "pending", label: "Pending" }]}
                          defaultValue={[{ value: "Pending", label: "Pending" }]}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                          name="status"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <OverlineTitle className="pt-4"> Details </OverlineTitle>
                <hr className="hr mt-2 border-light" />
                <Row className="g-gs">
                   <Col md="6">
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <div className="form-control-wrap">
                            <input 
                                type="text"
                                name="title"
                                defaultValue={formData.title}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                ref={register({ required: "This field is required" })} />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label">compaignType</label>
                            <div className="form-control-wrap">
                            <input 
                                type="text"
                                name="description"
                                defaultValue={formData.teamleadId}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                                ref={register({ required: "This field is required" })} />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label"> Target Audience</label>
                            <div className="form-control-wrap">
                            <input 
                                type="text"
                                name="description"
                                defaultValue={formData.Audience}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, Audience: e.target.value })}
                                ref={register({ required: "This field is required" })} />
                            </div>
                        </div>
                    </Col>
                    
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label">Team Lead Id</label>
                            <div className="form-control-wrap">
                                <input 
                                type="text"
                                name="teamleadId"
                                defaultValue={formData.teamleadId}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, teamleadId: e.target.value })}
                                ref={register({ required: "This field is required" })} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <OverlineTitle className="pt-4"> Amount </OverlineTitle>
                <hr className="hr mt-2 border-light" />
                <Row className="g-gs">
                 
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">PKR</label>
                      <input
                        type="number"
                        name="amountUSD"
                        defaultValue={formData.Amount}
                        className="form-control"
                        onChange={(e) => setFormData({ ...formData, Amount: e.target.value })}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </div>
                  </Col>
                </Row>
                
                <hr className="hr mt-2 border-light" />
                <Row className="gy-4">
                  
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button type="submit" color="primary" size="md">
                          Add Transaction
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Form>
            </div>
    
    </>

)
}
export default ModalAdd;