var express = require('express');
const UserController =require('../../controllers/admin/UserController')



var UserRouter = express.Router();
// 图片上传
const multer  = require('multer')
// 存放目的目录
const upload = multer({ dest: 'public/avataruploads/' })


 UserRouter.post('/adminapi/user/login',UserController.login);
//  upload.single 下载单一个文件
 UserRouter.post('/adminapi/user/upload',upload.single('file'),UserController.upload);


 UserRouter.post('/adminapi/user/add',upload.single('file'),UserController.add);
 UserRouter.get('/adminapi/user/list',UserController.getList);
 UserRouter.delete('/adminapi/user/list/:id',UserController.delList);
 UserRouter.get('/adminapi/user/list/:id',UserController.getList);
 UserRouter.put('/adminapi/user/list/:id',UserController.putList);

module.exports = UserRouter;
