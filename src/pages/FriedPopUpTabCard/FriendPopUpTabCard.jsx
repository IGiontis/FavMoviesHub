import { useState } from "react";
import { Card, CardBody, CardHeader, Nav, Navbar, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FriendSearchTab from "./FriendSearchTab";
import FriendRequests from "./FriendRequests";
import styles from "./friendsTab.module.css";
import { toggleAddFriend } from "../../redux/friendSlice";
import { useDispatch, useSelector } from "react-redux";
import { useListenForFriendRequests } from "../../hooks/useReceivedFriendRequests";
import { useFriendRequestCount } from "../../hooks/useFriendRequestCount";
import BadgeFriendList from "../../components/BadgeFriendList";
import classNames from "classnames";
import TranslatedText from "../../components/Language/TranslatedText";

const FriendPopUpTabCard = () => {
  const [activeTab, setActiveTab] = useState("search");

  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useListenForFriendRequests(currentUser?.uid);
  const requestCount = useFriendRequestCount(currentUser?.uid);


  return (
    <Card className={styles.friendPopupCard}>
      <CardHeader className={styles.friendPopupHeader}>
        <Navbar color="dark" dark expand="md" className={`${styles.friendPopupNavbar} pt-4`}>
          <Nav
            className={classNames("d-flex flex-wrap align-items-center flex-row gap-4", { "pt-2": requestCount > 0 })}
            navbar
          >
            <NavItem>
              <NavLink
                className={activeTab === "search" ? "active" : ""}
                onClick={() => toggleTab("search")}
                style={{ cursor: "pointer" }}
              >
                <TranslatedText text="searchFriend" ns="friendsPopup" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "requests" ? "active" : ""}
                onClick={() => toggleTab("requests")}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div className="position-relative">
                  <TranslatedText text="friendsRequests" ns="friendsPopup" />
                  <BadgeFriendList requestCount={requestCount} />
                </div>
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
      <div className={styles.friendPopupClose} onClick={() => dispatch(toggleAddFriend())}>
        ✖
      </div>
    </Card>
  );
};

export default FriendPopUpTabCard;
