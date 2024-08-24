const ProductService = require("../../Services/admin/ProductService")

const ProductController = {
    add: async (req, res) => {

        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const { title, introduction, detail } = req.body

        // 调用service进行添加
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date(),


        })
        res.send({
            code: "1",
        })
    },
    getList: async (req, res) => {
        const result = await ProductService.getList({ pid: req.params.id })
        res.send({
            code: 1,
            data: result
        })
    },
    //     publish:async(req,res)=>{

    //        const result =await NewsService.publish({
    //           ...req.body,

    //             editTime:new Date()
    //         })
    //         res.send({
    //             code:1,
    //             data:result
    //         })
    //     },
    updateList: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const { pid, title, introduction, detail } = req.body

        // 调用service进行添加
        await ProductService.updateList({
            pid,
            title, detail,
            introduction,
            cover,
            editTime: new Date(),

        })
        res.send({
            code: "1",
        })
    }
    ,
    delList: async (req, res) => {
        await ProductService.delList({ pid: req.params.id })
        res.send({
            code: 1
        })
    }
}

module.exports = ProductController