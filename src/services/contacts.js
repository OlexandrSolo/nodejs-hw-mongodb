import ContactsCollection from "../db/models/contacts.js"
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = "name", sortOrder = "asc" }) => {
    const limit = perPage;
    const skip = (page - 1) * limit;
    const items = await ContactsCollection.find().skip(skip).limit(limit).sort({ [sortBy]: sortOrder });
    const totalItems = await ContactsCollection.countDocuments();

    const paginationData = calcPaginationData({ totalItems, page, perPage })

    return {
        items,
        total: totalItems,
        ...paginationData
    }
};

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
