import send from '../config/MailConfig'
// import bcrypt from 'bcrypt'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode, responseSuccess, responseFail } from '@/common/Utils'
import User from '@/model/User'

class LoginController {
  constructor() { }
  async forget (ctx) {
    const { body } = ctx.request
    console.log(body)
    try {
      let result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Hugh'
      })
      responseSuccess(ctx, '邮件发送成功', result)
    } catch (e) {
      console.log(e)
    }
  }

  async login (ctx) {
    // 接收用户的数据
    const { sid, code, username, password } = ctx.request.body
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      // 验证用户账号密码是否正确
      let checkUserPasswd = false
      let user = await User.findOne({ username })
      if (password === user.password) {
        checkUserPasswd = true
      }
      // if (await bcrypt.compare(password, user.password)) {
      //   checkUserPasswd = true
      // }
      // mongoDB查库
      if (checkUserPasswd) {
        // 验证通过, 返回token数据
        let token = jsonwebtoken.sign({ _id: 'hugh' }, config.JWT_SECRET, {
          expiresIn: '1d'
        })
        responseSuccess(ctx, '登录成功', token)
      } else {
        // 用户名 密码验证失败,返回提示
        responseFail(ctx, '用户名或密码错误, 请重新输入!')
      }
    } else {
      // 图片验证码校验失败
      responseFail(ctx, '验证码不正确, 请重新输入!')
    }
  }

  async reg (ctx) {
    // 接收客户端的数据
    const { sid, code, name, username, password } = ctx.request.body
    // 校验验证码的内容 (时效性、有效性)
    let msg = ``
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    let check = true
    if (result) {
      // 查库, 看username是否被注册
      let user1 = await User.findOne({ username })
      if (user1 !== null && typeof user1.username !== 'undefined') {
        msg += ` 此邮箱已经被注册, 可以通过邮箱找回密码! `
        check = false
      }
      // 查库, 看name是否被注册
      let user2 = await User.findOne({ name })
      if (user2 !== null && typeof user2.name !== 'undefined') {
        msg += `此昵称已经被注册, 请修改!`
        check = false
      }
      // 写入数据到数据库
      if (check) {
        // password = await bcrypt.hash(password, 5)
        let user = new User({
          username: username,
          name: name,
          password: password,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        let result = await user.save()
        console.log('result', result);
        responseSuccess(ctx, '注册成功', result)
        return
      }
    } else {
      msg = `验证码已经失效, 请重新获取!`
    }
    responseFail(ctx, msg)
  }
}

export default new LoginController()