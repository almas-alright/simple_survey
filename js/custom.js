$(document).ready(function () {
    var red_total = 0;
    var red_yes = 0;
    var red_no = 0;
    var red_score = 0;

    var green_total = 0;
    var green_yes = 0;
    var green_no = 0;
    var green_score = 0;
    var g2 = 0;
    var g4 = 0;
    var green_flag = parseInt(g2 + g4);

    var total_question = 0;
    var total_answered = 0;
    var total_notanswered = 0;


    $('input:radio[name="g2"]').change(
            function () {
                if ($(this).is(':checked')) {
                    g2 = 2;
                    green_flag = parseInt(green_flag + 2);
                } else
                {
                    g2 = 0;
                }
            });

    $('input:radio[name="g4"]').change(
            function () {
                if ($(this).is(':checked')) {
                    g4 = 2;
                    green_flag = parseInt(green_flag + 2);
                } else
                {
                    g4 = 0;
                }
            });

    $(".list-group-item :input[type='radio']").change(function () {
        if ($(this).parents('.list-group-item').hasClass('nans'))
        {
            $(this).parents('.list-group-item').removeClass('nans');
        }
        if ($(this).parents('.list-group-item').hasClass('ans'))
        {
            $(this).parents('.list-group-item').removeClass('ans');
        }
        if ($(this).parents('.list-group-item').hasClass('error_txt'))
        {
            $(this).parents('.list-group-item').removeClass('error_txt');
        }
        $(this).parents('.list-group-item').addClass('ans');
    });

    $("#btn").on('click', function () {
        
        green_total = parseInt($('.green-q').length);
        red_total = parseInt($('.red-q').length);
        total_question = parseInt(green_total + red_total);
        total_answered = parseInt($('.ans').length);
        total_notanswered = parseInt($('.nans').length);
        red_yes = parseInt($(".red-q :input[type='radio'][value='1']:checked").length);
        red_no = parseInt($(".red-q :input[type='radio'][value='0']:checked").length);

        green_yes = parseInt($(".green-q :input[type='radio'][value='1']:checked").length);
        green_no = parseInt($(".green-q :input[type='radio'][value='0']:checked").length);

        green_score = green_flag + (green_no * 1) + (green_yes * 2);
        red_score = (red_no * 1) + (red_yes * 2);



        if (total_notanswered == 0 && total_answered == 50) {
//                   green 26-35  red 24-31 || Low-range Thought Leader and Low-range Inspired Leader 
            if ((green_score > 25 && green_score < 36) && (red_score > 23 && red_score < 32)) {
                $('#result').load("http://devel4/insoired/assets/text/tl26_35_il24_31.txt");
            }
//                   green 36-46  red 32-40 || Mid-range Thought Leader and Mid-range Inspired Leader
            if ((green_score > 35 && green_score < 47) && (red_score > 31 && red_score < 41)) {
                $('#result').load("http://devel4/insoired/assets/text/tl36_46_il32_40.txt");
            }
//                   green 47-56  red 24-31 || High-Range Thought Leader and Low-Range Inspired Leader
            if ((green_score > 46 && green_score < 57) && (red_score > 23 && red_score < 32)) {
                $('#result').load("http://devel4/insoired/assets/text/tl47_56_il24_31.txt");
            }
//                   green 47-56  red 32-40 || High-Range Thought Leader and Mid-Range Inspired Leader
            if ((green_score > 46 && green_score < 57) && (red_score > 31 && red_score < 41)) {
                $('#result').load("http://devel4/insoired/assets/text/tl47_56_il32_40.txt");
            }
//                   green 26-35  red 41-48 || High Inspired Leader and Low Range Thought Leader:
            if ((green_score > 25 && green_score < 36) && (red_score > 40 && red_score < 49)) {
                $('#result').load("http://devel4/insoired/assets/text/tl26_35_il41_48.txt");
            }
//                   green 36-46  red 41-48 || High Inspired Leader and Mid-Range Thought Leader:
            if ((green_score > 35 && green_score < 47) && (red_score > 40 && red_score < 49)) {
                $('#result').load("http://devel4/insoired/assets/text/tl36_46_il41_48.txt");
            }
//                   green 47-56  red 41-48 || High Inspired Leader and High Thought Leader:
            if ((green_score > 46 && green_score < 57) && (red_score > 40 && red_score < 49)) {
                $('#result').load("http://devel4/insoired/assets/text/tl47_56_il41_48.txt");
            }
            $('#slider').addClass('animated fadeOutDown').hide();
            $('#incomplete-alert:visible, #pager').hide();
            $('panel').hide();
            $('#result_container').show();
            $(this).hide();
            $('#complete-alert').html("<strong>Success !</strong> You Scored : <strong>" + green_score + "</strong> out of 56 as a THOUGHT LEADER and <strong>" + red_score + "</strong> out of 48 as a INSPIRED LEADER.").show();
        } else
        {
            $('#incomplete-alert').html("<strong>Incomplete Statement!</strong> Please hit all of above to get result.You attempt <strong>" + total_answered + "</strong> out of <strong>" + total_question + "</strong> and left <strong>" + total_notanswered + "</strong> blank (marked red)").show();
            $('.nans').addClass('error_txt');
        }

    });

    $("#btn-color").click(function () {
        $('.green-q').css('background', 'green');
        $('.red-q').css('background', 'red');
    });

    $('.qa').hide().addClass('animated fadeInDown');
    $('.qa:first-child').show().addClass('current');
    $('.pagination li:nth-child(2)').addClass('active');

    makePager('#pager');

    $('.pagination').on('click', 'li', function () {
        var current = $('.qa.current').attr('id');
        var index = $('.qa#' + current).index() + 1;
        var last_index = $('.qa:last-child').index() + 1;
        $('.pagination li').removeClass('active');
        var active = $(this).children('a').attr("href");

        if (active != "#pre" && active != "#nxt") {
            index = $('.qa#' + current).index() + 1;
            $('.qa').hide().removeClass('current');
            $(active).show().addClass('current');
            $(this).addClass('active');
        } else
        {

            if (index != 1 && active === "#pre")
            {
                $('.qa').hide().removeClass('current');
                $('.qa#' + current).prev().show().addClass('current');
                $(this).addClass('active');
            }

            if (index != last_index && active === "#nxt")
            {
                $('.qa').hide().removeClass('current');
                $('.qa#' + current).next().show().addClass('current');
                $(this).addClass('active');
            }

        }
//        alert("current index : "+index+" last index : "+last_index);
        if ($('.qa:visible').index() == $('.qa:last-child').index())
        {
            $(".align-btn").show();
        } else
        {
            $('.align-btn:visible').hide();
        }

    });

    function makePager(selector)
    {
        var prev = '<li><a href="#pre"><i class="fa fa-angle-left"></i></a></li>';
        var page = '';
        var next = '<li><a href="#nxt"><i class="fa fa-angle-right"></i></a></li>';
        var key = 0;
        $('.qa').each(function (index) {
            key = parseInt(index + 1);

            page += '<li><a href="#ul' + key + '">' + key + '</a></li>';

        });
        $(selector).html(prev + page + next);
    }


});