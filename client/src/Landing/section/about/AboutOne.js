import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { ImageBlock } from '../../components/images/Images'
import { Section } from '../../layout/section/Section'
import ThumbImg1 from '../../images/gfx/f.png'
import { Paragraph, TextBlock, TitleH2 } from '../../components/textBlock/TextBlock'
import User from '../../components/user/User'
import User1 from '../../images/client/sq-a.jpg'
import User2 from '../../images/client/sq-b.jpg'

const AboutOne = (props) => {
  return (
    <Section className={props.className && props.className} id={props.id && props.id}>
        <Container>
            <Row className="align-items-center justify-content-between g-gs">
                <Col lg="6">
                    <ImageBlock>
                        <img src={ThumbImg1} alt="thumb-img" />
                    </ImageBlock>
                </Col>
                <Col xl="5" lg="6">
                    <TextBlock>
                        <TitleH2 className="fw-medium">Story of Making NGOLab</TitleH2>
                        <Paragraph>Once upon a time, a group of individuals who were passionate about making a difference in their communities started working for an NGO. They quickly realized that managing finances was a cumbersome and time-consuming process, often taking away from the important work they were doing to serve their community.</Paragraph>
                        <Paragraph>Envisioning a comprehensive platform that would provide everything NGOs needed to manage their finances with ease and confidence.</Paragraph>
                        <Paragraph>The website is now the go-to choice for NGOs, allowing them to focus on their work with confidence in their financial management.</Paragraph>
                        <h6 className="overline-title">Designed and developed by</h6>
                        <Row className="gy-3">
                            <Col sm="6">
                                <User className="user-s1" src={User2} name="Abdullah Khan" role="Role as Manager" />
                            </Col>
                            <Col sm="6">
                                <User className="user-s1" src={User1} name="Sameer Iltaf" role="As Developer" />
                            </Col>
                        </Row>
                    </TextBlock>
                </Col>
            </Row>
        </Container>
    </Section>
  )
}

export default AboutOne
