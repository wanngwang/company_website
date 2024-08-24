const content = require("../../models/UserModel")


const UserService = {
    login: async ({ username, password }) => {
        // async await promise 实现异步
        let res = await new Promise((resolve, reject) => {
            content.query('select * from user3 where username=? and password=?', [username, password], (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            })
        })
        return res
    },
    upload: async ({ id, username, introduction, gender, avatar }) => {
        if (avatar) {
            await new Promise((resolve, reject) => {
                content.query('update user3 set username=?, introduction=?, gender=?, avatar=? where id=?', [username, introduction, gender, avatar, id], (error, success) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(success)
                })

            })
        } else {
            await new Promise((resolve, reject) => {
                content.query('update user3 set username=?, introduction=?, gender=? where id=?', [username, introduction, gender, id], (error, success) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(success)
                })

            })
        }
    }
    ,

    add: async ({ username, password, introduction, gender, avatar, role }) => {
        await new Promise((resolve, reject) => {

            content.query("insert into user3(username,password,introduction,gender,avatar,role)values(?,?,?,?,?,?)", [username, password, introduction, gender, avatar, role], (error, success) => {

                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })

    },
    getList: async ({id}) => {
        let res = await new Promise((resolve, reject) => {
            
                id?content.query("select id,username,introduction,role,password from  user3 where id=?",id, (error, success) => {
                    if (error) {
                        reject(error)
                    }
    
                    resolve(success)
    
                }):content.query("select id, username,gender,introduction,role,avatar from  user3", (error, success) => {
                    if (error) {
                        reject(error)
                    }
    
                    resolve(success)
    
                })

        })
        return res
    },
    putList:async(body)=>{
        await new Promise((resolve, reject) => {
            content.query('update user3 set password=? ,username=?, introduction=?, role=? where id=?', [body.password,body.username, body.introduction, body.role, body.id], (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)
            })

        })
    }

    ,
    delList: async ({ id }) => {
        let res = await new Promise((resolve, reject) => {
            content.query("delete from user3 where id=?", id, (error, success) => {
                if (error) {
                    reject(error)
                }

                resolve(success)

            })
        })
}

}


module.exports = UserService