import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: '', label: 'All Meals' },
  { value: 'like', label: 'Sort by Like' },
  { value: 'review', label: 'Sort by Review' },
];

export default function FilterLikeReview({ handleFilter }) {
  const [selectedOption, setSelectedOption] = useState(null);
  // console.log(selectedOption?.value);
  handleFilter(selectedOption?.value || '');
  return (
    <div className="w-full md:w-80 max-w-full md:max-w-80">
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Sort Meals"
      />
    </div>
  );
}
FilterLikeReview.propTypes = {
  handleFilter: PropTypes.func,
};
