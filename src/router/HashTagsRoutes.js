import express from 'express'
import { PostHashTags, trendding } from '../controller/hashtagController.js'
import validateToken from '../middlewares/validateToken.js'

const hashTagsRoutes = express.Router()

hashTagsRoutes.get('/hashtag/:hashtag', validateToken, PostHashTags)
hashTagsRoutes.get("/trendding", validateToken, trendding)

export default hashTagsRoutes