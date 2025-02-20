import { useState } from "react";
import { Card, CardBody, CardHeader, Nav, Navbar, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FriendSearchTab from "./FriendSearchTab";
import FriendRequests from "./FriendRequests";

const FriendPopUpTabCard = () => {
  const [activeTab, setActiveTab] = useState("search");

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Card
      style={{
        position: "fixed",
        bottom: "40px",
        right: "13px",
        width: "auto",
        maxWidth: "350px",
        minWidth: "150px",
        zIndex: 10000,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardHeader className="p-0">
        <Navbar color="dark" dark expand="md" style={{ borderRadius: "6px 8px 0 0 " }}>
          <Nav className="ms-auto d-flex flex-wrap align-items-center flex-row gap-2" navbar>
            <NavItem>
              <NavLink
                className={activeTab === "search" ? "active" : ""}
                onClick={() => toggleTab("search")}
                style={{ cursor: "pointer" }}
              >
                Search Friend
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "requests" ? "active" : ""}
                onClick={() => toggleTab("requests")}
                style={{ cursor: "pointer" }}
              >
                Friend Requests
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="search">
            <FriendSearchTab />
          </TabPane>
          <TabPane tabId="requests">
            <FriendRequests />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default FriendPopUpTabCard;
