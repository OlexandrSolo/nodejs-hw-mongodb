import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";
import { contactAddSchema } from "../validation/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully find contacts",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const contact = await contactServices.getContactById(id);

    if (!contact) {
        throw createHttpError(404, `Contact with id=${contact} not found`)
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
    })
}

export const addContactController = async (req, res) => {
    if (req.body.name && req.body.phoneNumber && req.body.contactType) {
        const data = await contactServices.addContact(req.body);
        res.status(201).json({
            status: 201,
            message: "Successfully created a contact!",
            data
        })
    }
    throw createHttpError(500, "Incorrect body of request")
}

export const upsertContactController = async (req, res) => {
    const { id: _id } = req.params;

    const result = await contactServices.updateContact({
        _id, payload: req.body, options: {
            upsert: true
        }
    });

    const status = result.isNew ? 200 : 201

    res.status(status).json({
        status,
        message: "Contact upserted successfully",
        data: result
    })
}

export const patchContactController = async (req, res, next) => {
    const { id: _id } = req.params;

    const result = await contactServices.updateContact({ _id, payload: req.body });

    if (result === null) {
        next(createHttpError(404, `Contact with id ${_id} not found`));
        return;
    }

    res.json({
        status: 200,
        message: "Contact patched successfully",
        data: result.data
    })
};

export const deleteContactController = async (req, res) => {
    const { id: _id } = req.params;

    const data = await contactServices.deleteContact({ _id })

    if (!data) {
        throw createHttpError(404, `Contact with id-${_id} not found`)
    }

    res.status(204).send()

}