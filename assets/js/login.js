$(function(){
  $("#links_reg").on("click",function(){
    $(".login_box").hide()
    $(".reg_box").show()
  })
  $("#links_login").on("click",function(){
    $(".login_box").show()
    $(".reg_box").hide()
  })

  //  从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify()函数 自定义校验规则
  form.verify ({
    // 自定义了一个叫做 pwd 的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
    repwd: function(value){
      // 通过形参获取再次确认密码框的值
      // 获取密码框的值
      // 判断两次密码值是否一致
      // 如果不一致return 提示信息
      var pwd = $('.reg_box [name=password]').val()
      if (pwd !== value) {
        return  "两次密码不一致"
      }
    }
  })
//  添加注册表单监听事件
  $('#form_reg').on('submit',function(e){
  // 阻止表单默认提交事件
   e.preventDefault()
   var data = {
     username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val()
    }
   $.post('/api/reguser',data,function(res){
     if (res.status !== 0){
       return layer.msg(res.message);
     }
    layer.msg("注册成功,请登录");
    $("#links_login").click()
   })
  })
  // 监听登录表单事件
  $('#form_login').submit(function(e){
    // 阻止表单默认提交事件
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'post',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0){
        return  layer.msg("登录失败！")
        }
        localStorage.setItem('token',res.token)
       layer.msg("登录成功！")
       location.href = '/index.html'
      }
    })
  })
})