import ContactsCollection from "../db/models/contacts.js"

export const getAllContacts = async () => await ContactsCollection.find();

export const getContactById = async (contactId) => await ContactsCollection.findById(contactId);

export const addContact = async (contact) => await ContactsCollection.create(contact);

export const updateContact = async ({ _id, payload, options = {} }) => {
    const data = ContactsCollection.findOneAndUpdate({ _id }, payload, {
        ...options,
        new: true
    });

    return data
}
