/* eslint-disable react/prop-types */
import '../styles/global.css';

const Filter = ({ filter, handleInputChange }) => (
    <div className="filter">
        <input name="filter" value={filter} onChange={handleInputChange}  placeholder='Search Contact by name ...'/>
    </div>
)

export default Filter
