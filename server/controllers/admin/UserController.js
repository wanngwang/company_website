const UserService = require('../../Services/admin/UserService');
const JWT = require('../../util/JWT');
require("../../util/JWT")
const UserController = {
    login: async (req, res) => {

        var result = await UserService.login(req.body)

        if (result.length === 0) {
            res.send({
                code: "0",
                error: "用户名密码不匹配"
            })
        } else {
            const token = JWT.generate({
                id: result[0].id,
                username: result[0].username
            }, "1d")
            res.header("Authorization", token)
            res.send({
                code: "1",
                ActionType: "登录成功",
                data: {
                    id: result[0].id,
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role
                }

            })
        }
    },
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body
        const avatar = req.file ? `avataruploads/${req.file.filename}` : ""
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        // 调用service模块更新数据
        await UserService.upload({ id: payload.id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                code: "1",
                data: {
                    username,
                    introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                code: "1",
                data: {
                    username,
                    introduction,
                    gender: Number(gender),

                }
            })
        }
    },
    add: async (req, res) => {
        const { username, password, introduction, role, } = req.body

        const avatar = req.file ? `avataruploads/${req.file.filename}` : ""
        const gender = 0
        // 调用service模块更新数据
        await UserService.add({ username, password, introduction, gender: Number(gender), avatar, role: Number(role) })
        res.send({
            code: "1"
        })
    },
    getList: async (req, res) => {
        const result = await UserService.getList(req.params)

        res.send({
            code: "1",
            data: result
        })
    },
    delList: async (req, res) => {
        const result = await UserService.delList({ id: req.params.id })
        res.send({
            code: "1",

        })
    },
    putList: async (req, res) => {
        const result = await UserService.putList(req.body)
        res.send({
            code: "1"
        })
    }
}

module.exports = UserController