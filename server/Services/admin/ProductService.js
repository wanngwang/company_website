const connect = require("../../models/UserModel")
const ProductService = {
    add: async ({ title,introduction,detail,cover,editTime }) => {

        await new Promise((resolve, reject) => {
             
            connect.query("insert into product( title,introduction,detail,cover,editTime)values(?,?,?,?,?)", [ title,introduction,detail,cover,editTime], (error, success) => {

                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })
    },
    getList:async({pid})=>{
        let res = await new Promise((resolve, reject) => {
            pid?connect.query("select * from product where pid=?",pid,(error, success) =>{
                if (error) {
                    reject(error)
                }
               
                resolve(success)
            }):connect.query("select * from product",(error, success) =>{
                if (error) {
                    reject(error)
                }
               
                resolve(success)
            })
           
    })

    return res
    },
    updateList:async({ pid,title, introduction, detail,cover,editTime})=>{
        if (cover) {
            await new Promise((resolve, reject) => {
                connect.query('update product set title=?, introduction=?, detail=?, editTime=?,cover=? where pid=?', [ title, introduction, detail,editTime,cover,pid], (error, success) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(success)
                })

            })
        } else {
            await new Promise((resolve, reject) => {
                connect.query('update product set title=?, introduction=?, detail=?, editTime=? where pid=?', [title, introduction, detail,editTime,pid], (error, success) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(success)
                })
            })
        }
    }
    ,
    delList:async({pid})=>{
        let res = await new Promise((resolve, reject) => {
            connect.query("delete from product where pid=?", pid, (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)

            })
        })
    }
  
}
module.exports = ProductService