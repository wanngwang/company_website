const ProductService = require("../../Services/web/ProductService")


const ProductController = {
    getList: async (req, res) => {
        const result = await ProductService.getList({ pid: req.params.id })
        res.send({
            code: 1,
            data: result
        })
    }
}

module.exports = ProductController