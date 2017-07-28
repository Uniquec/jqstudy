$(function () {
    let current = 0;
    let answers = new Array();

    function setText(res, current) {
        $('#number').text('单选练习题 (' + res[current].number + '/' + res.length + ')');
        $('#questions').text(res[current].question);
        $('#answerA').text(res[current].answerA);
        $('#answerB').text(res[current].answerB);
        $('#answerC').text(res[current].answerC);
        $('#answerD').text(res[current].answerD);
    }

    $.get('../data/content.json', res=> {
        setText(res, current);

        $("#prev-question").addClass('lightgray');
        $("#next-question").removeClass('lightgray');


        $('#next-question').click(()=> {
            if (current == res.length - 1) {
                return;
            }
            current++;
            $("#prev-question").removeClass('lightgray');
            if (current == res.length - 1) {
                $("#next-question").addClass('lightgray');
            }
            setText(res, current);

            $('.tip').addClass('hide');
            $('.answers-option').removeClass('chose');
            $('#option-' + answers[current + 1]).addClass('chose');
            $('#option-' + answers[current + 1]).children('.tip').removeClass('hide');

        });

        $('#prev-question').click(()=> {
            if (current == 0) {
                return;
            }
            current--;
            $("#next-question").removeClass('lightgray');
            if (current == 0) {
                $("#prev-question").addClass('lightgray');
            }
            setText(res, current);

            $('.tip').addClass('hide');
            $('.answers-option').removeClass('chose');
            $('#option-' + answers[current + 1]).addClass('chose');
            $('#option-' + answers[current + 1]).children('.tip').removeClass('hide');

        });

        $('#submit').click(()=>{
            if(answers.length - 1 == res.length){
                swal({
                        title: "Submit",
                        text: "Are you sure?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes!",
                        cancelButtonText: "No!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal("OK!", "", "success");
                        } else {
                            swal("Cancelled", "", "error");
                        }
                    });
            }
            else{
                swal("Error", "You didn't finished!", "error")
            }
        })

    });

    $('.answers-option').click((e)=> {
        $('.tip').addClass('hide');
        $('.answers-option').removeClass('chose');
        $(e.currentTarget).addClass('chose');
        $(e.currentTarget).children('.tip').removeClass('hide');
        let id = e.currentTarget.id;
        answers[current + 1] = id.substr(id.length - 1, 1);
        console.log(answers);
    })


})

var intDiff = parseInt(600);//倒计时总秒数量
function changeTime(intDiff) {
    intDiff = sessionStorage.getItem("time") || intDiff;
    var hour = 0,
        minute = 0,
        second = 0;//时间默认值
    if (intDiff > 0) {
        hour = Math.floor(intDiff / (60 * 60));
        minute = Math.floor(intDiff / 60) - (hour * 60);
        second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('#hour_show').text(hour + '时');
    $('#minute_show').text(minute + '分');
    $('#second_show').text(second + '秒');
    intDiff--;
    sessionStorage.setItem("time", intDiff);
}
function timer(intDiff) {
    iii = setInterval(function () {
        changeTime(intDiff);
    }, 1000);
    changeTime(intDiff);
}
$(function () {
    timer(intDiff);
});