import ContactsCollection from "../db/models/contacts.js"
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter = {} }) => {
    const skip = (page - 1) * perPage;
    const query = ContactsCollection.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    if (filter.type) {
        query.where("contactType").equals(filter.type)
    }

    if (filter.isFavourite) {
        query.where("isFavourite").equals(filter.isFavourite)
    }

    const data = await query;
    const totalItems = await ContactsCollection.find().merge(query).countDocuments();
    const paginationData = calculatePaginationData({ totalItems, page, perPage })

    return {
        data,
        ...paginationData
    }
}

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
