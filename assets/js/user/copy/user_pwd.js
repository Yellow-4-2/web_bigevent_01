$(function () {
    // 1.自定义验证规则
    var form = layui.form;
    form.verify({
        // 1.1 密码
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，请重新输入'],
        // 1.2 新旧不重复
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不相同'
            }
        },
        // 1.3 两次新密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功!')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // window.parent.getUserInfo();

                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})