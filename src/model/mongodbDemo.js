import User from './test'

// 增
const user = {
  name: 'hugh',
  age: 24,
  email: 'hugh@toimc.com'
}

const insertMethods = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result);
}

// insertMethods()

// 查
const findMethods = async () => {
  const result = await User.find()
  console.log(result);
}

// findMethods()

// 改
const updateMethods = async () => {
  const result = await User.updateOne({name: 'hugh'}, {
    email: 'imooc@imooc.com'
  })
  console.log(result);
}

// updateMethods()

// 删
const deleteMethods = async () => {
  const result = await User.deleteOne({name: 'hugh'})
  console.log(result);
}

deleteMethods()
