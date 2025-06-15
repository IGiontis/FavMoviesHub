import PropTypes from "prop-types";
import { useInfiniteScroll } from "../hooks/useinfiniteScroll";

const LoadMoreWrapper = ({ itemsLength, loadCount = 6, children }) => {
  const { visibleCount, loadMoreRef } = useInfiniteScroll(itemsLength, loadCount);

  return (
    <>
      {children(visibleCount)}
      {visibleCount < itemsLength && <div ref={loadMoreRef} style={{ height: "10px" }} />}
    </>
  );
};

LoadMoreWrapper.propTypes = {
  itemsLength: PropTypes.number.isRequired,
  loadCount: PropTypes.number,
  children: PropTypes.func.isRequired, 
};

export default LoadMoreWrapper;
