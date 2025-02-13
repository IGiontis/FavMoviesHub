import { useState } from "react";
import { Input, ListGroup, ListGroupItem, Spinner, Alert, Button, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useDebounce } from "../../hooks/useDebounce";

const FriendSearchTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: users = [], isLoading, isError } = useSearchUsers(debouncedSearch.trim());

  return (
    <div className="p-3">
      {/* Label for accessibility */}
      <Label htmlFor="search-input" className="fw-bold">
        Search Username
      </Label>
      
      {/* Search Input */}
      <Input
        id="search-input"
        type="text"
        placeholder="Type a username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="text-center">
          <Spinner size="sm" />
        </div>
      )}

      {/* Error Message */}
      {isError && <Alert color="danger">Error fetching users</Alert>}

      {/* No Users Found */}
      {!isLoading && !isError && debouncedSearch && users.length === 0 && (
        <Alert color="info">No users found</Alert>
      )}

      {/* Users List */}
      {users.length > 0 && (
        <>
          <div className="fw-bold mb-2">Users Found:</div>
          <ListGroup>
            {users.map((user) => (
              <ListGroupItem
                key={user.id}
                className="d-flex justify-content-between align-items-center flex-wrap"
              >
                {/* Username (wraps if too long) */}
                <span className="text-truncate flex-grow-1" style={{ wordBreak: "break-word", minWidth: "0" }}>
                  {user.username}
                </span>

                {/* Add Friend Button */}
                <Button color="success" size="sm" className="ms-3">
                  <FontAwesomeIcon icon={faUserPlus} />
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default FriendSearchTab;
