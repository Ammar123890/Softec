
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
      purpose: "",
      type: "receiving",
      description: "",
      amount: 0,
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
      purpose: "",
      type: "receiving",
      description: "",
      amount: 0,
      date: Date.now(),
      balance: 0,
      teamleadId: "",
      status: "pending",
    });
  };


  const onFormSubmit = (submitData) => {
    // Assuming submitData is the form data object
    console.log(submitData);
    axios
      .post("http://localhost:5000/api/operations/create", formData, {
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
  
    // Assuming these functions are defined elsewhere
    resetForm();
    props.toggle();
    
    
    props.get();
  };
  


return(
    <>
    <div className="p-2">
              <h5 className="title">Add Transaction</h5>
              <Form className="mt-4" onSubmit={handleSubmit(onFormSubmit)} noValidate>
                <Row className="g-gs">
                <Col md="6">
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <div className="form-control-wrap">
                            <input 
                                type="text"
                                name="name"
                                defaultValue={formData.name}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                ref={register({ required: "This field is required" })} />
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
                            <label className="form-label">Type</label>
                            <div className="form-control-wrap">
                            <input 
                                type="text"
                                name="type"
                                defaultValue={formData.type}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                ref={register({ required: "This field is required" })} />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label">Purpose</label>
                            <div className="form-control-wrap">
                            <input 
                                type="text"
                                name="purpose"
                                defaultValue={formData.purpose}
                                className="form-control"
                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
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
                        defaultValue={formData.amount}
                        className="form-control"
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                          Add Operation
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