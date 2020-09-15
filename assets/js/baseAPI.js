// 注意 每次调用 $.post() $.get() 或$.ajax()时
// 都先调用这个函数.ajaxPrefilter()
// 在这个函数中我们可以拿到Ajax提供的配置对象options
$.ajaxPrefilter(function(options){
  // console.log(options.url);
  // 调用ajax的时候调用统一配置拼接路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
})