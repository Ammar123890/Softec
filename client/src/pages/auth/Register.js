import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import {Modal,ModalBody} from "reactstrap";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  const toggleSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalFail = () => setModalFail(!modalFail);


  

  const handleFormSubmit = (data) => {
    setLoading(true);
    console.log(data);
    axios.post("http://localhost:5000/api/ngo/register/", data)
      .then((response) => {
        setLoading(false);
        toggleSuccess();
        history.push(`${process.env.PUBLIC_URL}/auth-success`);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toggleModalFail();

      });
   
  };
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-sm">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Register as a new NGO</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="xl"
                    id="email"
                    name="email"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Members
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="xl"
                    id="members"
                    name="members"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter number of members"
                  />
                  {errors.members && <p className="invalid">This field is required</p>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Capital
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="xl"
                    id="capital"
                    name="capital"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your capital"
                  />
                  {errors.capital && <p className="invalid">This field is required</p>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Objective
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="xl"
                    id="objective"
                    name="objective"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter NGO's objective"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Vision
                  </label>
                </div>
                <div className="form-control-wrap">
                  <textarea
                    type="text-box"
                    bssize="lg"
                    id="vision"
                    name="vision"
                    ref={register({ required: true })}
                    className="form-control-lg form-control col"
                    placeholder="Enter your Vision"
                  />
                  {errors.vision && <p className="invalid">This field is required</p>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </div>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-8">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul>
          </PreviewCard>
        </Block>

              <Modal isOpen={modalFail} toggle={toggleModalFail}>
                  <ModalBody className="modal-body-lg text-center">
                    <div className="nk-modal">
                      <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
                      <h4 className="nk-modal-title">Unable to Process!</h4>
                      <div className="nk-modal-text">
                        <p className="lead">
                          We are sorry, we were unable to process your request right now. Please try after sometime.
                        </p>
                        <p className="text-soft">If you need help please contact us at (855) 485-7373.</p>
                      </div>
                      <div className="nk-modal-action mt-5">
                        <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                          Return
                        </Button>
                      </div>
                    </div>
                  </ModalBody>
                </Modal>

        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
