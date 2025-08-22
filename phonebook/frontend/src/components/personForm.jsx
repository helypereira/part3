/* eslint-disable react/prop-types */
import '../styles/global.css';

const PersonForm = ({addContact, handleInputChange, newName, newNumber}) => (
        <form onSubmit={addContact} className="formulario">

            Name: <input onChange={handleInputChange} value={newName} name="name"/>


            Phone Number: <input onChange={handleInputChange} value={newNumber} name="number"/>

        <div>
        <button type="submit"><span className="material-symbols-outlined"> person_add</span>Add Contact</button>
        </div>
        </form>
    
)


export default PersonForm;