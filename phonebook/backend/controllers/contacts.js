import Contact from '../models/contact.js';

// Obtain all contacts
export const getContacts = async (req, res, next) => {
  try {
    console.log('Fetching contacts from database...');
    const contacts = await Contact.find({});
    console.log(`Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// Obtain a contact by ID
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// Create a new contact
export const createContact = async (req, res, next) => {
  try {
    // const { name, number } = req.body;
    const name = req.body.name.trim();
    const number = req.body.number.trim();

    // Basic validation
    if (!name || !number) {
      return res.status(400).json({ error: 'Name and number are required' });
    }

    // Check if the contact already exists
    const existingContact = await Contact.findOne({ name });
    
    if (existingContact) {
      const updatedContact = await Contact.findByIdAndUpdate(
        existingContact._id,
        { name, number },
        { new: true, runValidators: true }
      );
      console.log(`Contact updated: ${updatedContact.name}`);
      return res.json(updatedContact);
    }

    const contact = new Contact({
      name,
      number
    });

    const savedContact = await contact.save();
    console.log(`Contact created: ${savedContact.name}`);
    res.status(201).json(savedContact);
  } catch (error) {
    //console.error('Error creating contact:', error);
    //res.status(400).json({ error: error.message });
    next(error);
  }
};

// Update a contact
export const updateContact = async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const number = req.body.number?.trim();

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
    // console.error('Error updating contact:', error);
    // res.status(400).json({ error: error.message });
    next(error);
  }
};

// Delete a contact (3.15)
export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    console.log(`Contact deleted: ${deletedContact.name}`);
    res.json(deletedContact);
  } catch (error) {
    next(error);
  }
};

// Obtain information about the API
export const getInfo = async (req, res, next) => {
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
    // console.error('Error getting info:', error);
    // res.status(500).json({ error: error.message });
    next(error);
  }
};