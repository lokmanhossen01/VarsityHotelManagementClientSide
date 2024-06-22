import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: '', label: 'All Users' },
  { value: 'Silver', label: 'Silver Users' },
  { value: 'Gold', label: 'Gold Users' },
  { value: 'Platinum', label: 'Platinum Users' },
  { value: 'Bronze', label: 'Bronze Users' },
];

export default function UsersBadgeFilter({ handleFilter }) {
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
        placeholder="Sorting by Badge"
      />
    </div>
  );
}
UsersBadgeFilter.propTypes = {
  handleFilter: PropTypes.func,
};
