import { Router } from "express";

import * as contactControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { contactsAddSchema, contactsUpdateSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController))

contactsRouter.get('/:id', isValidId, ctrlWrapper(contactControllers.getContactByIdController))

contactsRouter.post('/', validateBody(contactsAddSchema), ctrlWrapper(contactControllers.addContactController));

contactsRouter.put('/:id', isValidId, validateBody(contactsAddSchema), ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch('/:id', isValidId, validateBody(contactsUpdateSchema), ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactControllers.deleteContactController))

export default contactsRouter;