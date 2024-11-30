import { Router } from "express";

import * as contactControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController))

contactsRouter.get('/:id', validateBody(contactAddSchema), ctrlWrapper(contactControllers.getContactByIdController))

contactsRouter.post('/', ctrlWrapper(contactControllers.addContactController));

contactsRouter.put('/:id', ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch('/:id', ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", ctrlWrapper(contactControllers.deleteContactController))

export default contactsRouter;