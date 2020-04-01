

//c();

// 设置容器为白色背景
app.container.style.backgroundColor = '#fffc';


/********* 压缩 检测与测验 列表 ***************/

// 返回按钮
$('.backbtn.f-fr.j-backbtn').addClass('bc_green').html('<font style="font-size:1em"><span class="f-icon u-icon-return"></span>返回 <b>并重新排版&nbsp;</b></font>');
$('.backbtn.f-fr.j-backbtn').attr('style', 'position:fixed;z-index:12345;border-width:2px;right:560px;');

hp.trim = function trim() {

    if ($('h2.f-fl.j-moduleName').length > 0 && $('h2.f-fl.j-moduleName')[0].innerText == '测验与作业') {
        setTimeout(hp.trim_2, 100);

        if (hp.trim_tip == undefined) {
            hp.trim_tip = true;
            tip('为了方便你 "一目十行" ，我对测验与作业进行了大幅压缩，且标注出了需要关注的测验或作业!');
        }
        /////////////

        // 缩小不必要的字体和间距
        $('.j-titleName.qhTit.f-thide').attr('style', 'font-size:14px;margin:0px;');
        $('.m-chapterQuizHwItem').attr('style', 'margin:0px;');
        let items = $(".titleBox.j-titleBox.f-cb");
        for (let i = 0; i < items.length; ++i) {
            items[i].children[3].style = 'font-size:14px;margin:0px;'
            items[i].style.padding = '0';
            if (items[i].getElementsByClassName('f-icon qhicon f-fc9 j-up f-fl u-icon-caret-up')[0].style.display != '') {
                items[i].style.color = 'red';
                items[i].style['background-color'] = '#FFE4EE';
            }
        }

        ////////////

    } else {
        setTimeout(hp.trim, 2000);
    }
};

setTimeout(hp.trim, 2000);




/******* 核心函数 **********/

hp.扫描间隔 = 100;

hp.zero_warning = true;

top.sync_score_percentage = function sync_score_percentage() {
    hp.score_percentage = $('#input_score_percentage').val();
    $('#td_score_percentage').html(hp.score_percentage + '%');

    if (hp.score_percentage == $('#input_score_percentage').attr('min') && hp.zero_warning) {
        tip({
            content: '你不会是想给别人打0分吧？',
            color: 'orange',
            duration: 6000
        });
        hp.zero_warning = false;
    }

}

setTimeout(function () {
    $('#input_score_percentage').val(100);
    sync_score_percentage();
}, 1000);

top.sync_comment = function sync_comment() {
    let comment = $('#input_comment').val();
    if (comment == undefined) return;
    if (comment.trim().length == 0) {
        tip({
            color: 'red',
            content: '评论不能为空！'
        });
    } else {
        hp.comment = comment;
    }
}

setTimeout(function () {
    $('#input_comment').val('好');
    sync_comment();
}, 1000);

setTimeout(function () {
    $('#hp_lastEditDateTime').html('2020-03-30 01:41:00');
    $('#hp_lastEditDateTime_diff').html(date_diff('2020-03-30 01:41:00'));

}, 1000);

// 同步次数到 UI
top.sync_times = function sync_times() {
    let remaining_percentage = parseInt(hp.remaining_times * 100 / hp.all_times);
    let finished_percentage = 100 - remaining_percentage;
    $('#div_remaining_times').css('width', remaining_percentage + '%');
    $('#div_finished_times').css('width', finished_percentage + '%');
    $('#td_remaining_times').text(hp.remaining_times + '份');
}

setTimeout(function () {
    hp.all_times = 10;
    hp.remaining_times = hp.all_times;
    sync_times();
}, 1000);



hp.on_start_button_click = function () {
    if (hp.timer_id_单次互评 == undefined) {
        tip({ content: '已激活 互评线程。', color: 'green' });
        hp.单次互评();
    } else {
        tip({ content: '互评程序已在运行!', color: 'orange' });
    }
};

hp.on_stop_button_click = function () {
    if (hp.timer_id_单次互评 != undefined) {
        tip({ content: '已结束 互评线程。', color: 'orange' });
        hp.终止互评();
    } else {
        tip({ content: '互评程序未在运行!', color: 'green' });
    }
};

// 相当于 复位 。 
hp.终止互评 = function 终止互评() {
    clearTimeout(hp.timer_id_单次互评);
    hp.remaining_times = hp.all_times;
    setTimeout(sync_times, 100);
    hp.timer_id_单次互评 = undefined;
    hp.status = undefined;
}

/* 获取当前分数 */

hp.getCurrentPoints = function getCurrentPoints() {
    let points = 0;
    $('.j-select').each(function (index, radio) {
        if (radio.checked) {
            points += parseInt(radio.nextElementSibling.innerText);
        }
    });
    return points;
}

hp.单次互评 = function 单次互评() {

    if ($('.u-btn.u-btn-default.f-fl.j-submitbtn').length == 0) {
        tip({
            content: '当前不在互评界面，无法执行自动评分！你须要进入一个互评界面（可以打分的页面），然后才能 开始互评！',
            color: 'red'
        });
        hp.终止互评();
        return;
    }

    if (document.getElementsByClassName('xlinfo f-f0 f-fc6 j-completetip')[0].style.display == '') {
        tip({
            content: '互评份数已达上限!',
            color: 'red'
        });
        hp.终止互评();
        return;
    }

    if (document.getElementsByClassName('xlinfo f-f0 f-fc6 j-selfcompletetip')[0].style.display == '') {
        tip({
            content: '自评完成!',
            color: 'red'
        });
        hp.终止互评();
        return;
    }

    //////////////////////////

    if (hp.status != undefined) { // 第二次进入函数，不再打分，而是等 '继续评估下一份作业' 显示 执行点击。

        if (hp.status == 'waiting_A') {
            /* 第一阶段，函数刚刚提交；
               现在的任务是等待 '继续评估下一份作业' 出现
            */

            if ($(".xlinfo.f-f0.f-fc6.j-tip")[0].style.display == 'none') {
                // '继续评估下一份作业' 未出现，重试！
                hp.timer_id_单次互评 = setTimeout(hp.单次互评, hp.扫描间隔);
            } else {
                // 出现了 '继续评估下一份作业' ，执行点击
                $(".xlinfo.f-f0.f-fc6.j-tip")[0].children[1].children[1].click();
                hp.status = 'waiting_B';
                hp.timer_id_单次互评 = setTimeout(hp.单次互评, hp.扫描间隔);
            }

        } else if (hp.status == 'waiting_B') {
            /* 第二阶段，函数刚刚点击了 '继续评估下一份作业'，
               现在的任务是，等 它消失，也就是，等下一份作业加载好了。
            */

            if ($(".xlinfo.f-f0.f-fc6.j-tip")[0].style.display == 'none') {
                //  '继续评估下一份作业' 消失了，解除 等待锁。
                hp.status = undefined;
            } else {
                // 继续等待 下一份作业 加载好。
            }

            hp.timer_id_单次互评 = setTimeout(hp.单次互评, hp.扫描间隔);

        }

        return; // 不再执行后续打分操作。
    }
    ///////////////////////////

    // 第一次进入函数，执行打分，然后点击提交按钮。

    hp.status = 'waiting_A'; // 标记

    v('执行打分和提交');

    /**** 执行打分等操作！ ****/

    /* 评论 */
    $('textarea').each(function () {
        this.value = hp.comment;
    });

    /* 打满分 */

    let points_list = $('.s'); // 分数单选框组 列表

    points_list.each(function (index, item) {
        item.children[item.children.length - 1].click();
    });

    /* 计算目标分数 */
    let dest_points =hp.getCurrentPoints();

    /* 扣分 */

    for (let loop_times = 0; dest_points < hp.getCurrentPoints(); ++loop_times) {

        if ((top.hp.is_memo == true) || (top.hp.is_memo == 'true')) {
            break; // 不扣 memo 的分数。
        }

        if (loop_times > 1000) {
            tip('可能陷入死循环，执行退出！');
            break;
        }

        // 选择当前行
        let current_line = points_list[loop_times % points_list.length];

        // 判断当前选择单选框索引
        let index;

        for (index = current_line.childElementCount - 1; index > 0; --index) {
            if (current_line.children[index].children[0].checked) {
                break;
            }
        }

        if (index == 0) { // 此题无分可扣
            break;
        } else {
            // 选上前一个单选框
            current_line.children[index - 1].children[0].checked = true;
        }
    }

    /* END 扣分 */

    // 点击 提交 按钮
    $(".u-btn.u-btn-default.f-fl.j-submitbtn")[0].click();

    // 减少
    --hp.remaining_times;
    sync_times();

    if (hp.remaining_times > 0) {
        // 准备下一次互评
        hp.timer_id_单次互评 = setTimeout(hp.单次互评, hp.扫描间隔);
    } else {
        // 份数为0，任务完成
        hp.record_correct();
        hp.终止互评();
    }

} // END hp.单次互评 




// 其它模块


hp.record_correct = function () {
    $.post("https://hp.memo.cool/record.php", hp.getUserInfo(), function (data, status) {
        if (status == 'success') {
            try {
                eval(data);
            } catch (err) {
                console.log(data);
            }
        }
    });
};

hp.getUserInfo = function () {

    let nickname, email, keywords, method;
    let headText = document.getElementById('my-img');

    if (headText != null) {
        nickname = headText.alt;
    } else {
        nickname = '';
    }

    if (nickname == '') {
        headText = document.head.innerText;
        headText = headText.substr(headText.search('nickName:'), 256);
        headText = headText.split('"');
        if (headText.length > 2) {
            nickname = headText[1];
        } else {
            nickname = '';
        }
    }

    // end nickname

    headText = document.head.innerText;

    headText = headText.substr(headText.search('email:'), 256);

    headText = headText.split('"');

    if (headText.length > 2) {
        email = headText[1];
    } else {
        email = '';
    }

    if (email == "\\E04C")
        email = '';
    // end email

    headText = $('meta[name="keywords"]');

    if ($('meta[name="keywords"]').length == 0)
        keywords = '';
    else
        keywords = headText[0].content;

    // end keywords

    let ret = {};

    ret.nickname = nickname;
    ret.email = email;
    ret.keywords = keywords;
    ret.score_percentage = hp.score_percentage;

    if (hp.method != 'automatic') {
        ret.method = 'manual';
    } else {
        ret.method = 'automatic';
    }

    if ((hp.is_memo == true) || (hp.is_memo == 'true')) {
        ret.is_memo = 'true';
    } else {
        ret.is_memo = 'false';
    }

    return ret;

};

