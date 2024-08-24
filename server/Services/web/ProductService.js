const connect = require("../../models/UserModel")
const ProductService = {
    getList: async ({ pid }) => {
        let res = await new Promise((resolve, reject) => {
            pid ? connect.query("select * from product where pid=?", pid, (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            }) : connect.query("select * from product  order by editTime desc", (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })

        return res
    },
}
module.exports = ProductService