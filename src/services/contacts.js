import ContactsCollection from "../db/models/contacts.js"

export const getAllContacts = async () => await ContactsCollection.find();

export const getContactById = async (contactId) => await ContactsCollection.findById(contactId);

export const addContact = async (contact) => await ContactsCollection.create(contact);

export const updateContact = async ({ _id, payload, options = {} }) => {
    const rawResult = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
        ...options,
        includeResultMetadata: true
    });

    if (!rawResult || !rawResult.value) return null

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    }
};

export const deleteContact = async filter => ContactsCollection.findOneAndDelete(filter);
