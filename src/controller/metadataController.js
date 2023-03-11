import htmlMetadataParser from "html-metadata-parser"

export const metadataController = {
    async parseJsonMetadata(req, res) {
        const { url } = req.body;
        try {
            const metadata = await htmlMetadataParser.parser(url)
            const jsonMetadata = JSON.stringify(metadata)
            return res.send(jsonMetadata)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
}

/*

*/