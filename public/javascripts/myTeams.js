$(document).ready(function(){
    $('#team1Driver1value').text($("#team1Driver1").children("option:selected").val());
    $('#team1Driver2value').text($("#team1Driver2").children("option:selected").val());
    $('#team2Driver1value').text($("#team2Driver1").children("option:selected").val());
    $('#team2Driver2value').text($("#team2Driver2").children("option:selected").val());
    $('#hiddenTeam1Driver1').val($("#team1Driver1").children("option:selected").text());
    $('#hiddenTeam1Driver2').val($("#team1Driver2").children("option:selected").text());
    $('#hiddenTeam2Driver1').val($("#team2Driver1").children("option:selected").text());
    $('#hiddenTeam2Driver2').val($("#team2Driver2").children("option:selected").text());
    $.fn.setTotalTeam1();
    $.fn.setTotalTeam2();
});
$.fn.setTotalTeam1 = function(){
    var total = Number($("#creditsTeam1").val()) - ( Number($("#team1Driver1").children("option:selected").val()) + Number($("#team1Driver2").children("option:selected").val()));
    if (total < 0 ) {
        $('#tdCreditsTeam1').addClass("bg-danger");
    } else {
        $('#tdCreditsTeam1').addClass("bg-success");
    }
    $('#team1TotalSum').text(total);
}
$.fn.setTotalTeam2 = function(){
    var total = Number($("#creditsTeam2").val()) - ( Number($("#team2Driver1").children("option:selected").val()) + Number($("#team2Driver2").children("option:selected").val()));
    if (total < 0 ) {
        $('#tdCreditsTeam2').addClass("bg-danger");
    } else {
        $('#tdCreditsTeam2').addClass("bg-success");
    }
    $('#team2TotalSum').text(total);
}
$("#team1Driver1").change(function(){
    $('#team1Driver1value').text($("#team1Driver1").children("option:selected").val());
    $('#hiddenTeam1Driver1').val($("#team1Driver1").children("option:selected").text());
    $.fn.setTotalTeam1();
});
$("#team1Driver2").change(function(){
    $('#team1Driver2value').text($("#team1Driver2").children("option:selected").val());
    $('#hiddenTeam1Driver2').val($("#team1Driver2").children("option:selected").text());
    $.fn.setTotalTeam1();
});
$("#team2Driver1").change(function(){
    $('#team2Driver1value').text($("#team2Driver1").children("option:selected").val());
    $('#hiddenTeam2Driver1').val($("#team2Driver1").children("option:selected").text());
    $.fn.setTotalTeam2();
});
$("#team2Driver2").change(function(){
    $('#team2Driver2value').text($("#team2Driver2").children("option:selected").val());
    $('#hiddenTeam2Driver2').val($("#team2Driver2").children("option:selected").text());
    $.fn.setTotalTeam2();
});