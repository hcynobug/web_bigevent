// 注意 每次调用 $.post() $.get() 或$.ajax()时
// 都先调用这个函数.ajaxPrefilter()
// 在这个函数中我们可以拿到Ajax提供的配置对象options
$.ajaxPrefilter(function(options){
  // console.log(options.url);
  // 调用ajax的时候调用统一配置拼接路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 统一为有请求权限的接口设置 headers请求头
  if (options.url.indexOf('/my/') !== -1 ){
      options.headers ={
        Authorization:localStorage.getItem('token') ||''
      }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // 从complete回调函数中可以利用 res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！') {
          // 强制清空 token
          localStorage.removeItem('token')
          // 强制跳转到首页
          location.href = '/login.html'
        }
    }
})