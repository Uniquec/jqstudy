/**
 * Created by chy on 2017/7/19 0019.
 */
$(function () {
    function setText(res, current) {
        $('#number').text('单选练习题 (' + res[current].number + '/' + res.length + ')');
        $('#questions').text(res[current].question);
        $('#answerA').text(res[current].answerA);
        $('#answerB').text(res[current].answerB);
        $('#answerC').text(res[current].answerC);
        $('#answerD').text(res[current].answerD);
    }

    $.get('./content.json', res=> {
        let current = 0;
        setText(res, current);

        if (res[0].number) {
            $('#last-question').css("background-color", "grey");
        }

        $('#next-question').click(function (e) {
            current++;
            setText(res, current);
        });

        $('#prev-question').click(function (e) {
            current--;
            setText(res, current);
        });

    });

    $('.answers-option').click(function (e) {
        $('.tip').addClass('hide');
        $('.answers-option').removeClass('chose');
        $(e.currentTarget).addClass('chose');
        $(e.currentTarget).children('.tip').removeClass('hide');
    })
})