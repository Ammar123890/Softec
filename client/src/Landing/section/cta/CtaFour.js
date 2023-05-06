import React from "react"
import { Container, Col, Row } from "reactstrap"
import { Link } from "../../components/button/Button"
import { Paragraph, TextBlock, TitleH2 } from "../../components/textBlock/TextBlock"
import { Section } from "../../layout/section/Section"


const CtaFour = (props) =>{
    return (
        <Section className ={props.className && props.className} id={props.id && props.id} >
            <Container>
                <Row className="justify-content-center text-center">
                    <Col xl="6" lg="7" md="8">
                        <TextBlock className="is-compact">
                            <TitleH2>Experience Our Analytics</TitleH2>
                            <Paragraph>By providing a centralized platform for financial management and analytics, we aim to promote transparency, efficiency, and accountability, ultimately contributing to a more sustainable and equitable world. </Paragraph>
                            <ul className="btns-inline">
                                <li>
                                    <Link to="/auth-login" target="_blank" rel="noreferrer" className="btn-lg btn-primary">Get Started</Link>
                                </li>
                            </ul>
                        </TextBlock>
                    </Col>
                </Row>
            </Container>
        </Section>
    )
}

export default CtaFour
