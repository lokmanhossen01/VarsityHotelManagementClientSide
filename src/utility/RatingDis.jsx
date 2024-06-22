import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { checkPropTypes } from 'prop-types';
const RatingDis = ({ vlu }) => {
  return <Rating style={{ maxWidth: 180 }} value={vlu} readOnly />;
};

export default RatingDis;
RatingDis.propTypes = {
  vlu: checkPropTypes.number,
};
