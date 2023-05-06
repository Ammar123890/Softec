import React, { useState, useEffect } from 'react'
import LogoDrak2x from '../../images/logo-dark2x.png'
import LogoLight2x from '../../images/logo2x.png'
import Menu from '../../layout/menu/Menu'
import MobileMenu from '../../layout/menu/MobileMenu'
import {Logo} from "../../components/logo/Logo"
import { Col, Container, Row } from "reactstrap"
import {Header, HeaderContent, HeaderMain, HeaderWrap} from "../../layout/header/Header"
import {Link} from "../../components/button/Button"
import { HeaderCaption, HeaderTitle } from '../../components/headerCaption/HeaderCaption'
import {BannerFourData} from './BannerData'
import JS from '../../images/icon/libs/statistics.png'
import SASS from '../../images/icon/libs/ngo2.png'
import GULP from '../../images/icon/libs/profit.png'
import BS from '../../images/icon/libs/predictive-chart.png'
import HTML from '../../images/icon/libs/transparency.png'
import CSS from '../../images/icon/libs/css3.png'

const BannerFour = (props) =>{
    const [toggle, setToggle] = useState(false);
    const [offset, setOffset] = useState(0);
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
        setOffset(window.pageYOffset)
        }
        window.scrollTo(0,0);
        viewChange();
        window.addEventListener("resize", viewChange);
        return () => {
            window.removeEventListener('resize', viewChange);
        };
    }, []);

    // function to change the design view under 1200 px
    const viewChange = () => {
        if (window.innerWidth < 992) {
        setMobileView(true);
        } else {
        setMobileView(false);
        }
    };
    
    
    return(
        <Header className={props.className && props.className} id={props.id && props.id} >
            <HeaderMain className={`header-main header-main-s1 is-sticky is-transparent on-dark ${offset > 0 ? "has-fixed" : ""}`}>
                <Container className='header-container'>
                    <HeaderWrap>
                        <div className="header-logo">
                            <Logo to="/IndexFour"
                            dark ={LogoDrak2x}
                            light ={LogoLight2x}
                            />
                        </div>
                        <div className="header-toggle" onClick={() => setToggle(!toggle)}>
                            <button className={`menu-toggler ${toggle === true ? "active" : ""}`}> 
                                <em className="menu-on icon ni ni-menu"></em>
                                <em className="menu-off icon ni ni-cross"></em>
                            </button>
                        </div>
                        <nav className={`header-menu menu ${toggle === true ? "active" : ""} ${mobileView ? "mobile-menu" : ""}`}> 
                            {!mobileView ? <Menu className="ms-lg-auto" data={BannerFourData} /> : <MobileMenu data={BannerFourData}/>}
                            <ul className="menu-btns">
                                <li>
                                    <Link to="" target="_blank" rel="noreferrer" className="btn-primary btn-lg">Download App</Link>
                                </li>
                            </ul>
                        </nav>
                        {toggle && window.innerWidth < 992 && <div className="header-overlay" onClick={() => setToggle(!toggle)}></div>}
                    </HeaderWrap>
                </Container>
            </HeaderMain>
            <HeaderContent className="py-6 is-dark mt-lg-n1 mt-n3">
                <Container>
                    <Row className='row justify-content-center text-center g-gs'>
                        <Col lg="6" md="7">
                            <HeaderCaption>
                                <HeaderTitle>Empowering NGOs with Financial Insights</HeaderTitle>
                                <p>With a focus on transparency and impact, our platform empowers NGOs to make informed decisions that drive positive change in their communities.</p>
                                <ul className="header-action btns-inline py-3">
                                    <li>
                                        <Link to="/auth-register"  className="btn-primary btn-lg"><span>Get Started</span></Link>
                                    </li>
                                    <li>
                                        <Link to="/auth-login" className="btn-danger btn-lg"><span>Already Registered</span></Link>
                                    </li>
                                </ul>
                                <ul className="header-icon list-inline pt-1">
                                    
                                    <li><img className="h-40px" src={SASS} alt="icon" /></li>
                                    <li><img className="h-40px" src={JS} alt="icon" /></li>
                                    
                                    <li><img className="h-40px" src={BS} alt="icon" /></li>
                                    <li><img className="h-40px" src={HTML} alt="icon" /></li>
                                    
                                </ul>
                            </HeaderCaption>
                        </Col>
                    </Row>
                </Container>
            </HeaderContent>
        </Header>
    )
}

export default BannerFour
