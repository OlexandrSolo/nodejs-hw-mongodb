import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully find contacts",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactServices.getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, `Contact id=${contact} not found`)
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    })
}

export const addContactController = async (req, res) => {
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Contact successful add",
        data
    })
}

export const upsertContactController = async (req, res) => {
    const { id: _id } = req.params;
    const data = await contactServices.updateContact({ _id, contact: req.body });

    res.json({
        status: 200,
        message: "Contact update successfully",
        data,
    })
}