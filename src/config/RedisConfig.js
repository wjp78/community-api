import { createClient } from 'redis';
import config from './index'

const client = createClient({
  url: config.REDIS_URL
})

client.on('reday', () => {
  console.log('Redis Client Connect Successfully: ' + config.REDIS_URL)
})

client.on('error', (err) => {
  console.log('Redis Client Error: ' + err)
})

client.connect();

// 设置 redis 的值
const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, {
        EX: time
      })
    }
  } else if (typeof value === 'object') {
    Object.keys(value).forEach((item) => {
      client.hSet(key, item, value[item])
    })
  }
}
// 获取key键值
const getValue = (key) => {
  return client.get(key)
}
// 获取Hash的键值
const getHValue = (key) => {
  return client.hGetAll(key)
}
// 删除键值
const delValue = (key) => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully: ' + key);
    } else {
      console.log('delete redis key error: ' + key + ',error: ' + err)
    }
  })
}

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue
}