import { useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import ProfileInfo from "./ProfileInfo";
import "./userProfileTabs.css";
import FavMovies from "./FavMovies";


const tabs = [
  { id: "1", title: "Fav Movies", content: <FavMovies /> },
  { id: "2", title: "Settings", content: "User settings content goes here." },
  { id: "3", title: "Profile Info", content: <ProfileInfo /> },
];

const UserProfileTabs = () => {

  const [activeTab, setActiveTab] = useState("1");

  return (
    <Container fluid>
      <Row className="justify-content-center ">
        <Col xs={12} md="auto" className="pt-4 sidebar-container ">
          <Nav className="d-flex flex-wrap flex-md-column gap-2 justify-content-center ">
            {tabs.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className="tab-link">
                  {tab.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>

        
        <Col xs={12} md className="content-container">
          <TabContent activeTab={activeTab}>
            {tabs.map((tab) => (
              <TabPane tabId={tab.id} key={tab.id}>
                {tab.content}
              </TabPane>
            ))}
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileTabs;
