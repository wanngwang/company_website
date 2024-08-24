const NewsService = require("../../Services/admin/NewsService")

const NewsController = {
    add: async (req, res) => {

        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        const { title, content, category, isPublish, author } = req.body

        // 调用service进行添加
        await NewsService.add({
            title,
            content,
            category: Number(category)
            ,
            isPublish: Number(isPublish)
            ,
            cover,
            editTime: new Date(),
            author

        })
        res.send({
            code: "1",
        })
    },
    getList: async (req, res) => {
        const result = await NewsService.getList({ tid: req.params.id })
        res.send({
            code: 1,
            data: result
        })
    },
    publish: async (req, res) => {

        const result = await NewsService.publish({
            ...req.body,

            editTime: new Date()
        })
        res.send({
            code: 1,
            data: result
        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        const { title, content, category, isPublish, tid } = req.body

        // 调用service进行添加
        await NewsService.updateList({
            title,
            content,
            category: Number(category)
            ,
            isPublish: Number(isPublish)
            ,
            cover,
            editTime: new Date(),
            tid

        })
        res.send({
            code: "1",
        })
    }
    ,
    delList: async (req, res) => {
        await NewsService.delList({ tid: req.params.id })
        res.send({
            code: 1
        })
    }
}

module.exports = NewsController