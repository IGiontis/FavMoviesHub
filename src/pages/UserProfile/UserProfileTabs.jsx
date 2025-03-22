import { useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import ProfileInfo from "./ProfileInfo";
import "./userProfileTabs.css";
import FavMovies from "./FavMovies";

const tabs = [
  { ID: "1", title: "Fav Movies", content: <FavMovies /> },
  // { ID: "2", title: "Settings", content: "User settings content goes here." },
  { ID: "2", title: "Profile Info", content: <ProfileInfo /> },
];

const UserProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("1");

  // Find the active tab's content dynamically
  const activeTabContent = tabs.find((tab) => tab.ID === activeTab)?.content;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md="auto" className="pt-4 sidebar-container">
          <Nav className="d-flex flex-wrap flex-md-column gap-2 justify-content-center">
            {tabs.map((tab) => (
              <NavItem key={tab.ID}>
                <NavLink active={activeTab === tab.ID} onClick={() => setActiveTab(tab.ID)} className="tab-link">
                  {tab.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>

        <Col xs={12} md className="content-container">
          <TabContent activeTab={activeTab}>
            <TabPane tabId={activeTab}>{activeTabContent}</TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileTabs;
