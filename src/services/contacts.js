import ContactsCollection from "../db/models/contacts.js"

export const getAllContacts = async () => await ContactsCollection.find();

export const getContactById = async (contactId) => await ContactsCollection.findById(contactId);

export const addContact = async (contact) => await ContactsCollection.create(contact);

export const updateContact = async ({ _id, contact, options = {} }) => {
    const data = await ContactsCollection.findOneAndUpdate({ _id }, contact, {
        ...options,
        new: true
    });
    return data;
}