import { useState } from "react";
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FriendSearchTab from "./FriendSearchTab";

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
        width: "auto", // Allows it to shrink if needed
        maxWidth: "350px", // Ensures it doesn't exceed this size
        minWidth: "150px", // Prevents it from being too small
        zIndex: 10000,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardHeader className="p-0">
        <Nav tabs>
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
              className={activeTab === "list" ? "active" : ""}
              onClick={() => toggleTab("list")}
              style={{ cursor: "pointer" }}
            >
              FriendList
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="search">
            {/* Replace this with your actual Search Friend content */}
            <FriendSearchTab />
          </TabPane>
          <TabPane tabId="list">
            {/* Replace this with your actual Friendlist content */}
            <p>Friendlist Content</p>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default FriendPopUpTabCard;
