fetch 的跨域请求需要服务端配合
需要添加
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

以及response似乎不能直接访问，只能按照键值访问内部