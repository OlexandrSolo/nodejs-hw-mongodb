import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortByList } from "../db/models/contacts.js";
import { parseContactFilterParams } from "../utils/filters/parseContactFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";

// const { ENABLE_CLOUDINARY } = process.env;

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const filter = parseContactFilterParams(req.query);
    filter.userId = req.user._id;

    const contacts = await contactServices.getAllContacts({ page, perPage, sortBy, sortOrder, filter });

    res.json({
        status: 200,
        message: "Successfully find contacts",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { id: _id } = req.params;
    // const contact = await contactServices.getContactById(id);

    const contact = await contactServices.getContact({ _id, userId });

    if (!contact) {
        throw createHttpError(404, `Contact with id=${_id} not found`)
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${_id}!`,
        data: contact,
    })
}

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;

    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const body = { ...req.body, photo: photoUrl }

    const data = await contactServices.addContact({ ...body, userId });

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data
    })
}

export const upsertContactController = async (req, res) => {
    const { id: _id } = req.params;
    const { _id: userId } = req.user;

    const result = await contactServices.updateContact(_id, { ...req.body, userId }, { upsert: true });

    const status = result.isNew ? 200 : 201

    res.status(status).json({
        status,
        message: "Contact upserted successfully",
        data: result
    })
}

export const patchContactController = async (req, res, next) => {
    const { id: _id } = req.params;
    const { _id: userId } = req.user;

    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        }
        else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const result = await contactServices.updateContact({ _id, userId }, { photo: photoUrl }, req.body,);

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
    const { _id: userId } = req.user;

    const data = await contactServices.deleteContact({ _id, userId })

    if (!data) {
        throw createHttpError(404, `Contact with id-${_id} not found`)
    }

    res.status(204).send()

}


// export const patchStudentController = async (req, res, next) => {
//     const { id: userId } = req.params;
//     const photo = req.file;

//     let photoUrl;

//     if (photo) {
//         if (ENABLE_CLOUDINARY === "true") {
//             photoUrl = await saveFileToCloudinary(photo);
//         }
//     }

//     const result = await updateStudent(userId, {
//         ...req.body,
//         photo: photoUrl,
//     });

//     if (!result) {
//         next(createHttpError(404, 'Student not found'));
//         return;
//     }

//     res.json({
//         status: 200,
//         message: `Successfully patched a student!`,
//         data: result.contacts,
//     });

// }