import { useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import ProfileInfo from "./ProfileInfo";
import "./UserProfileTabs.css";
import FavMovies from "./FavMovies";
const tabs = [
  { id: "1", title: "Profile Info", content: <ProfileInfo /> },
  { id: "2", title: "Settings", content: "User settings content goes here." },
  { id: "3", title: "Activity", content: "User activity history goes here." },
  { id: "4", title: "Fav Movies", content: <FavMovies /> },
];

const UserProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Container fluid>
      <Row>
        <Col className="pt-4 sidebar-container" md="auto">
          <Nav vertical pills>
            {tabs.map((tab) => (
              <NavItem key={tab.id} className="mb-2">
                <NavLink active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className="tab-link">
                  {tab.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>

        <Col className="content-container">
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
