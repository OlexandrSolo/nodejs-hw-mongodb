import { Router } from "express";
import { upload } from '../middlewares/multer.js';

import * as contactControllers from "../controllers/contacts.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";

import { contactsAddSchema, contactsUpdateSchema } from "../validation/contacts.js";

import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', upload.single('photo'), ctrlWrapper(contactControllers.getContactsController))

contactsRouter.get('/:id', isValidId, ctrlWrapper(contactControllers.getContactByIdController))

contactsRouter.post('/', validateBody(contactsAddSchema), ctrlWrapper(contactControllers.addContactController));

contactsRouter.put('/:id', upload.single('photo'), isValidId, validateBody(contactsAddSchema), ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch('/:id', upload.single('photo'), isValidId, validateBody(contactsUpdateSchema), ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactControllers.deleteContactController))

export default contactsRouter;