import ContactsCollection from "../db/models/contacts.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = "name",
    sortOrder = "asc",
    filter = {},
    userId
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({ userId });

    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
    }

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    const totalItems = await ContactsCollection.find().merge(contactsQuery).countDocuments();
    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calcPaginationData(contactsCount, page, perPage);

    return { data: contacts, ...paginationData, totalItems, page, perPage };
};

export const getContactById = async (contactId) => await ContactsCollection.findById(contactId);

export const getContact = filter => ContactsCollection.findOne(filter);

export const addContact = async (contact) => await ContactsCollection.create(contact);

export const updateContact = async (filter, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(filter, payload, {
        ...options,
        includeResultMetadata: true
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    };
};

export const deleteContact = async filter => ContactsCollection.findOneAndDelete(filter);