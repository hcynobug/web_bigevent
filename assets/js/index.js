$(function(){
  // 调用获取用户信息函数
  getUserInfo()

  // 调用退出功能
  $('#btnLogOut').on('click',function(){
    var layer = layui.layer
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
      //清除本地存储的token
      localStorage.removeItem('token')
      // 退出登录 返回到登录页
      location.href='/login.html'
      // 清除confirm 询问框
      layer.close(index);
    });
  })
})

// 获取用户信息

function getUserInfo() {
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    // headers 请求头配置对象
    // headers:{
    //   Authorization:localStorage.getItem('token') ||''
    // },
    success:function(res){
     if (res.status !==0) {
       return layer.msg('获取用户信息失败！')
     }
     // 渲染用户头像
  renderAvatar(res.data)
    },

    // 无论成功还是失败都会调用complete函数
    // complete: function(res){
    //   console.log(res);

    //   // 从complete回调函数中可以利用 res.responseJSON拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！') {
    //     // 强制清空 token
    //     localStorage.removeItem('token')
    //     // 强制跳转到首页
    //     location.href = '/login.html'
    //   }
    // }
  })
   
}

function renderAvatar(user){
//  1. 获取用户名称
var name =user.username || user.nickname
//  2. 设置欢迎文本
$('#welcome').html('欢迎&nbsp;&nbsp;' + name)
//  3.按需渲染用户的头像 
if (user.user_pic !== null){
  // 3.1 渲染图片头像
  $('.layui-nav-img ').attr('src',user.user_pic).show()
  $('.text-avatar').hide()
}else{
  // 3.2 渲染文本头像
   $('.layui-nav-img').hide()
   var first = name[0].toUpperCase()
   $('.text-avatar').html(first)
}
}