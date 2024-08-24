const NewsService = require("../../Services/web/NewsService")


const NewsController = {
    getList: async (req, res) => {
        const result = await NewsService.getList({ tid: req.params.id })
        res.send({
            code: 1,
            data: result
        })
    },
    getTopList: async (req, res) => {
        const result = await NewsService.getTopList({ limit: req.query.limit })
        res.send({
            code: 1,
            data: result
        })
    }
}

module.exports = NewsController