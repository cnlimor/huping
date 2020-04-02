

<div class="hp_title_outer">
<div class='hp_title_text' style='text-align:center;'>
  互评助手 -  <font style='cursor:pointer;'>memo.cool</font> 
</div>
</div>

<table class='table' style='white-space:nowrap;'>

<tr><td style="font-weight:bold;border:none;text-align:center;">
  分数默认满分哦
</td>

</tr>


<tr><td style="font-weight:bold;border:none;text-align:center;">
  份数
</td><td style="border:none;">

  <div class="progress" style='cursor:not-allowed;background-color:#cfbd;height:24px;border-radius:0;'>
    <div id='div_remaining_times' class="bg-success progress-bar progress-bar-striped progress-bar-animated" style=""></div>
    <div id='div_finished_times' class="bg-warning progress-bar progress-bar-striped progress-bar-animated" style=""></div>
  </div>

</td><td style="border:none;text-align:center;width:64px;" id="td_remaining_times"></td></tr>

<tr><td style="font-weight:bold;border:none;text-align:center;">
  评论
</td><td style="border:none;">
  <input type='text' class='bc_blue' 
         id='input_comment' onchange='sync_comment();' 
         onkeyup='sync_comment();' style='width:100%;'
         onmouseover='app.disableDragContainer();' onmouseleave='app.enableDragContainer();'
  />
</td><td style="border:none;">&nbsp;</td></tr>

<tr><td style="font-weight:bold;border:none;text-align:center;">
  版本
</td><td style="border:none;text-align:left;font-weight:bold">
  &nbsp; <font id='hp_lastEditDateTime'></font> [ <font id='hp_lastEditDateTime_diff'></font> 最后更新]
</td><td style="border:none;">&nbsp;</td></tr>

<tr><td style="border:none;" colspan="3">
  <div style='width:100%;display:flex;flex-flow:row nowrap;justify-content:space-around;'>
    <div style='cursor:default;' onmouseover='app.disableDragContainer();' onmouseleave='app.enableDragContainer();' id='按钮_开始互评' onclick='hp.on_start_button_click();' class='bc_green'>开始互评</div>
    <div style='cursor:default;' onmouseover='app.disableDragContainer();' onmouseleave='app.enableDragContainer();' id='按钮_终止互评' onclick='hp.on_stop_button_click();' class='bc_red'>终止互评</div>
    <div style='cursor:default;' onmouseover='app.disableDragContainer();' onmouseleave='app.enableDragContainer();' class='bc_orange'   onclick="window.open('https://pay.memo.cool');">赞助链接</div>

  </div>
</td></tr>

</table>







