// 存放公共配置
const DB_URL = 'mongodb://test:123456@10.211.55.5:27017/testdb'
const REDIS_URL = 'redis://:123456@10.211.55.5:15001'
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodWdoIiwiaWF0IjoiMjAyMi0wMS0xMCAwMDowMDowMCIsImV4cCI6IjIwMjItMDMtMDEgMDA6MDA6MDAiLCJhdWQiOiJpbW9vYyIsInN1YiI6IndvcmsifQ.7aoDd9LbiJQRr9ZcELISLKPEiPjlWNaClgjwUkRqP-g'

export default {
  DB_URL,
  REDIS_URL,
  JWT_SECRET
}
