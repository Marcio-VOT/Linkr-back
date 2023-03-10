import express from 'express'
import { PostHashTags } from '../controller/hashtagController.js'
import validateToken from '../middlewares/validateToken.js'

const hashTagsRoutes = express.Router()

hashTagsRoutes.get('/hashtag/:hashtag', validateToken, PostHashTags)

export default hashTagsRoutes