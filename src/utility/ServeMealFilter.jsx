import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: '', label: 'All Request' },
  { value: 'pending', label: 'Pending Request' },
  { value: 'processing', label: 'Processing Request' },
  { value: 'served', label: 'Served Request' },
];

export default function ServeMealFilter({ handleFilter }) {
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
        placeholder="Sorting by Status"
      />
    </div>
  );
}
ServeMealFilter.propTypes = {
  handleFilter: PropTypes.func,
};
