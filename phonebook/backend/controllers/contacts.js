import Contact from '../models/contact.js';

// Obtain all contacts
export const getContacts = async (req, res) => {
  try {
    console.log('Fetching contacts from database...');
    const contacts = await Contact.find({});
    console.log(`Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtain a contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(400).json({ error: 'Invalid contact ID' });
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { name, number } = req.body;

    // Basic validation
    if (!name || !number) {
      return res.status(400).json({ error: 'Name and number are required' });
    }

    // Check if the contact already exists
    const existingContact = await Contact.findOne({ name });
    if (existingContact) {
      return res.status(400).json({ error: 'Contact with this name already exists' });
    }

    const contact = new Contact({
      name,
      number
    });

    const savedContact = await contact.save();
    console.log(`Contact created: ${savedContact.name}`);
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  try {
    const { name, number } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    console.log(`Contact updated: ${updatedContact.name}`);
    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a contact (3.15)
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    console.log(`Contact deleted: ${deletedContact.name}`);
    res.json(deletedContact);
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(400).json({ error: 'Invalid contact ID' });
  }
};

// Obtain information about the API
export const getInfo = async (req, res) => {
  try {
    const contactCount = await Contact.countDocuments({});
    const currentTime = new Date().toString();
    
    res.send(`
      <div>
        <p>Phonebook has info for ${contactCount} people</p>
        <p>${currentTime}</p>
      </div>
    `);
  } catch (error) {
    console.error('Error getting info:', error);
    res.status(500).json({ error: error.message });
  }
};