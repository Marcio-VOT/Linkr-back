import express from 'express'
import { PostHashTags } from '../controller/hashtagController.js'

const hashTagsRoutes = express.Router()

hashTagsRoutes.get('/hashtag/:hashtag', PostHashTags)

export default hashTagsRoutes