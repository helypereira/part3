/* eslint-disable react/prop-types */
import '../styles/global.css';


const Persons = ({ persons, onDelete }) => (
    <div className="contactList">
        {persons.map(person => (
            <div key={person._id} className="contact">
                
                    <span>
                        <span className="material-symbols-outlined">account_circle</span>
                        {person.name}
                    </span>
                    <span>
                        <span className="material-symbols-outlined">call</span>
                        {person.number}
                    </span>
                    <button onClick={() => onDelete(person._id)}>
                        <span className="material-symbols-outlined">delete_forever</span>
                    </button>
                
            </div>
        ))}
    </div>
);


export default Persons;