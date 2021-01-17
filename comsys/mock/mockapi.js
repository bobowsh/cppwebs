

Mock.mock('/api/login', 'post',  {
    "ret":0,
    "data": {
      username:"admin",//随机获取boolean值
      toker:"admin",//随机获取图片路径
    }
  });