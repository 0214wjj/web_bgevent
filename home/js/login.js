$(function () {
    // 点击去注册链接
    $("#link_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show()
    })
    // 点击去登录链接
    $("#link_login").on('click', function () {
        $(".login-box").show();
        $(".reg-box").hide()
    })
    // 从layui中获取from对象
    const form = layui.form
    // 从layui中获取from对象
    const layer = layui.layer
    // 通过 form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        repwd: function (value) {
            const pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册成功事件
    $("#form_reg").on('submit', function (e) {
        // console.log($("#form_reg [name:username]").val());
        e.preventDefault()
        $.post('/api/reguser', {
            username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val()
        }, (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message);
            } else {
                layer.msg("注册成功!");
                $("#link_login").click()
            }
        })
    })

    //    监听登录成功界面
    $("#form_login").on('submit', function (e) {
        e.preventDefault()
        // url: "http://www.liulongbin.top:3007/api/login",
        $.ajax({
            type: "POST",
            url: "/api/login",
            // 快速获取表单内容
            data: $(this).serialize(),
            success: function (response) {
                if (response.status != 0) {
                    return layer.msg(response.message)
                } else {
                    layer.msg("登录成功");
                    localStorage.setItem('token', response.token);
                    location.href='./index.html'
                    console.log(location.href='./index.html');
                }

            }
        });




    })
})
