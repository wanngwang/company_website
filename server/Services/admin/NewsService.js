const connect = require("../../models/UserModel")
const NewsService = {
    add: async ({ title, content, category, cover, isPublish, editTime,author }) => {

        await new Promise((resolve, reject) => {
             
            connect.query("insert into news5(title,content,category,cover,isPublish,editTime,author)values(?,?,?,?,?,?,?)", [title, content, category, cover, isPublish, editTime,author], (error, success) => {

                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })
    },
    getList:async({tid})=>{
        let res = await new Promise((resolve, reject) => {
                tid?connect.query("select * from news5 where tid=?",tid,(error, success) =>{
                    if (error) {
                        reject(error)
                    }
                   
                    resolve(success)
                }):connect.query("select * from news5 ",(error, success) =>{
                    if (error) {
                        reject(error)
                    }
                 
                    resolve(success)
                })
               
        })
    
        return res
    },
    publish:async({tid,isPublish,editTime})=>{
        await new Promise((resolve, reject) => {
            connect.query('update news5 set isPublish=? ,editTime=?  where tid=?', [isPublish,editTime,tid], (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })
    },
    updateList:async({ title, content, category, isPublish,tid,cover,editTime})=>{
        if (cover) {
            await new Promise((resolve, reject) => {
                connect.query('update news5 set title=?, content=?, category=?, isPublish=?,editTime=?,cover=? where tid=?', [title, content, category, isPublish,editTime,cover,tid], (error, success) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(success)
                })

            })
        } else {
            await new Promise((resolve, reject) => {
                connect.query('update news5 set title=?, content=?, category=?, isPublish=?,editTime=? where tid=?', [title, content, category, isPublish,editTime,tid], (error, success) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(success)
                })
            })
        }
    }
    ,
    delList:async({tid})=>{
        let res = await new Promise((resolve, reject) => {
            connect.query("delete from news5 where tid=?", tid, (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)

            })
        })
    }
}
module.exports = NewsService