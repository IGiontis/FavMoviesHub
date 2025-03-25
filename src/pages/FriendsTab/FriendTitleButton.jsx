import { Button } from "reactstrap";
import TranslatedText from "../../components/Language/TranslatedText";

import classNames from "classnames";
import { memo, useCallback } from "react";
import { toggleAddFriend } from "../../redux/friendSlice";
import { useDispatch } from "react-redux";

const FriendTitleButton = () => {
  console.log("renders");
  const dispatch = useDispatch();

  const handleToggleAddFriend = useCallback(() => {
    dispatch(toggleAddFriend());
  }, [dispatch]);

  return (
    <div className="d-flex align-items-center mb-4">
      <h4 className="me-2 mb-0">
        <TranslatedText text="myFriends" ns="friendsTab" />
      </h4>
      <strong className="mx-2 text-muted fs-4">/</strong>
      <Button
        color="success"
        size="sm"
        className={classNames("position-relative")}
        aria-label="Open friend requests"
        onClick={handleToggleAddFriend}
      >
        Add Friend
      </Button>
    </div>
  );
};

export default memo(FriendTitleButton);
