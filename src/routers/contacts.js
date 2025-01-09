import { Router } from "express";

import * as contactControllers from "../controllers/contacts.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";

import { contactsAddSchema, contactsUpdateSchema } from "../validation/contacts.js";

import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

// contactsRouter.use(authorization)

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController))

contactsRouter.get('/:id', isValidId, ctrlWrapper(contactControllers.getContactByIdController))

contactsRouter.post('/', validateBody(contactsAddSchema), ctrlWrapper(contactControllers.addContactController));

contactsRouter.put('/:id', isValidId, validateBody(contactsAddSchema), ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch('/:id', isValidId, validateBody(contactsUpdateSchema), ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactControllers.deleteContactController))

export default contactsRouter;