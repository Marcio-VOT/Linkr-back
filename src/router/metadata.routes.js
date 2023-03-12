import {Router} from "express"
import { metadataController } from "../controller/metadataController.js";
const metadataRouter = Router();

metadataRouter.post("/metadata/", metadataController.parseJsonMetadata)

export {metadataRouter}