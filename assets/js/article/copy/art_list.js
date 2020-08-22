$(function () {
    // 定义一个查询的参数对象，将来请求数据时候 将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 10, //  每页显示多少数据
        cate_id: '', //文章分类的id
        state: '' // 文章的发布状态
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function (date) {
        var dt = new Date(date)

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 2. 初始化文章列表
    initTable();

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章列表失败')
                layer.msg('获取文章列表成功')
                var str = template("tpl-table", res);
                $('tbody').html(str)
            }
        })
    }

})