import { getValue } from "@/config/RedisConfig"

const checkCode = async (key, value) => {
  const redisData = await getValue(key)
  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

// 成功响应
const responseSuccess = (ctx, msg = '', data = {}, code = 200) => {
  ctx.body = {
    code,
    data,
    msg
  }
}

// 失败响应
const responseFail = (ctx, msg = '', data = {}, code = 500) => {
  ctx.status = code
  ctx.body = {
    code,
    data,
    msg
  }
}

export {
  checkCode,
  responseSuccess,
  responseFail
}