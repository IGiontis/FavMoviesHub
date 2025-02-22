import { useState } from "react";
import { Card, CardBody, CardHeader, Nav, Navbar, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FriendSearchTab from "./FriendSearchTab";
import FriendRequests from "./FriendRequests";
import styles from "./friendsTab.module.css";
import {toggleAddFriend} from "../../redux/friendSlice"
import { useDispatch } from "react-redux";

const FriendPopUpTabCard = () => {
  const [activeTab, setActiveTab] = useState("search");
  const dispatch = useDispatch();

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Card className={styles.friendPopupCard}>
      <CardHeader className={styles.friendPopupHeader}>
        <Navbar color="dark" dark expand="md" className={`${styles.friendPopupNavbar} pt-4`}>
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
      <div className={styles.friendPopupClose} onClick={() => dispatch(toggleAddFriend())}>✖</div>
    </Card>
  );
};

export default FriendPopUpTabCard;
