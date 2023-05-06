import React, { useState, useEffect } from "react";

import {
  Badge,
} from "reactstrap";
import {
  BlockBetween,
  Icon,
  Row,
  Col,
} from "../../components/Component";



function FinanceAdd (props) {

    
    const [detail, setDetail] = useState(props.detail);
    
    return (
            <>
            <div className="nk-modal-head mb-3">
              <h4 className="nk-modal-title title">
                Transaction <small className="text-primary">{}</small>
              </h4>
            </div>
            <div className="nk-tnx-details">
              <BlockBetween className="flex-wrap g-3">
                <div className="nk-tnx-type">
                  <div
                    className={`nk-tnx-type-icon bg-${
                      detail.type === "receiving"
                        ? "success"
                        : "danger"
                    } text-white`}
                  >
                    <Icon name="arrow-up-right"></Icon>
                  </div>
                  <div className="nk-tnx-type-text">
                    <h5 className="title">{detail.type=="receiving"? "+":"-"} {detail.Amount} PKR</h5>
                    <span className="sub-text mt-n1">{detail.date}</span>
                  </div>
                </div>
                <ul className="align-center flex-wrap gx-3">
                  <li>
                    <Badge
                      color={
                        detail.status === "completed"
                          ? "success"
                          : detail.status === "upcoming"
                          ? "warning"
                          : detail.status === "pending"
                          ? "info"
                          : "danger"
                      }
                      size="sm"
                    >
                      {detail.status}
                    </Badge>
                  </li>
                </ul>
              </BlockBetween>
              <div className="nk-modal-head mt-4 mb-3">
                <h5 className="title">Transaction Info</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Transaction ID</span>
                  <span className="caption-text">{detail.id}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Team Lead ID</span>
                  <span className="caption-text text-break">{detail.teamleadId}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Transaction Date</span>
                  <span className="caption-text">{detail.date} PST</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Amount</span>
                  <span className="caption-text">{detail.Amount} PKR</span>
                </Col>
              </Row>
              <div className="nk-modal-head mt-4 mb-3">
                <h5 className="title">Transaction Details</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Transaction Type</span>
                  <span className="caption-text">{detail.type=="spending"?"Spending":"Recieving"}</span>
                </Col>
                
                
                <Col lg={6}>
                  <span className="sub-text">Payment From</span>
                  <span className="caption-text text-break">Finance Department</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Payment For</span>
                  <span className="caption-text text-break">{detail.Cause}</span>
                </Col>
                
                <Col lg={12}>
                  <span className="sub-text">Details</span>
                  <span className="caption-text">{detail.description} funds</span>
                </Col>
              </Row>
            </div>
            
            </>
         
        );
    }

export default FinanceAdd;