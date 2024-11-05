import ContactsCollection from "../db/models/contacts.js"

export const getAllContacts = async () => await ContactsCollection.find();

export const getContactById = async (contactId) => await ContactsCollection.findById(contactId);