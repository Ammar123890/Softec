import React from "react"
import { Container, Col, Row } from "reactstrap"
import { ImageBlock } from "../../components/images/Images"
import { Section } from "../../layout/section/Section"
import { TextBlock, TitleH2 } from "../../components/textBlock/TextBlock"
import ThumbImg1 from '../../images/gfx/d.png'
import ThumbImg2 from '../../images/gfx/e1.png'
import { CheckedCircle } from "../../components/styledList/StyledList"
import { FeatureThereeList } from './FeatureData'


const FeatureThree = (props) => {
  return (
    <Section className = {props.className && props.className} id={props.id && props.id}>
        <Container>
            <Row className="g-gs justify-content-between align-items-center">
                <Col lg="6"> 
                    <ImageBlock>
                        <img src={ThumbImg1} alt="thumb-img" />
                    </ImageBlock>
                </Col>
                <Col lg="5">
                    <TextBlock>
                        <TitleH2 className="mb-3">Streamline Your Finances and Insights in One Central Hub</TitleH2>
                        <ul className="list list-lg list-purple list-checked-circle gy-4">
                            <li className="ps-5"><strong>Tools:</strong>:  Our finance platform includes budgeting, expense tracking, and reporting capabilities, all accessible from a centralized location.</li>
                            <li className="ps-5"><strong>Insights:</strong>:  With customizable reports and real-time insights into your organization's financial performance, you can optimize your resources and maximize your impact in the community.</li>
                        </ul>
                    </TextBlock>
                </Col>
            </Row>
        </Container>
    </Section>
  )
}

const FeatureThreeAlt = (props) =>{
    return(
        <Section className={ props.className && props.className } id={ props.id && props.id }>
            <Container>
                <Row className="g-gs flex-row-reverse justify-content-between align-items-center">
                    <Col lg="6">
                        <ImageBlock>
                            <img src={ThumbImg2} alt="thumb-img" />
                        </ImageBlock>
                    </Col>
                    <Col lg="5">
                        <TextBlock>
                            <TitleH2 className="mb-3">A complete Suite</TitleH2>
                            <p> With customizable reporting, expense tracking, and advanced analytics, managing your finances has never been easier. Say goodbye to spreadsheets and hello to confidence with our platform.</p>
                            <CheckedCircle className="list-lg list-purple list-checked-circle pt-1" data={FeatureThereeList} />
                        </TextBlock>
                    </Col>
                </Row>
            </Container>
        </Section>
    )
}

export { FeatureThree, FeatureThreeAlt }
