const connect = require("../../models/UserModel")
const NewsService = {
    getList: async ({ tid }) => {
        let res = await new Promise((resolve, reject) => {
            tid ? connect.query("select * from news5 where tid=? and  isPublish = 1", tid, (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            }) : connect.query("select * from news5 where isPublish = 1 order by editTime desc", (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })

        return res
    },
    getTopList: async ({ limit }) => {
        let res = await new Promise((resolve, reject) => {
            let query = `SELECT * FROM news5 WHERE isPublish = 1 ORDER BY editTime DESC LIMIT ${limit}`;
            connect.query(query, (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })

        return res
    }
}
module.exports = NewsService