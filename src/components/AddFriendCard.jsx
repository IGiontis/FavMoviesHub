import { Card, CardBody, CardHeader } from "reactstrap";

const AddFriendCard = () => {
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
      <CardHeader>HeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeader</CardHeader>
      <CardBody>Body</CardBody>
    </Card>
  );
};

export default AddFriendCard;
