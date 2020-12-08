$(document).ready(function(){
    $('#team1Driver1value').text($("#team1Driver1").children("option:selected").val());
    $('#team1Driver2value').text($("#team1Driver2").children("option:selected").val());
    $('#team2Driver1value').text($("#team2Driver1").children("option:selected").val());
    $('#team2Driver2value').text($("#team2Driver2").children("option:selected").val());
    $('#hiddenTeam1Driver1').val($("#team1Driver1").children("option:selected").text());
    $('#hiddenTeam1Driver2').val($("#team1Driver2").children("option:selected").text());
    $('#hiddenTeam2Driver1').val($("#team2Driver1").children("option:selected").text());
    $('#hiddenTeam2Driver2').val($("#team2Driver2").children("option:selected").text());
    $('#team1Chassivalue').text($("#team1Chassi").children("option:selected").val());
    $('#hiddenTeam1Chassi').val($("#team1Chassi").children("option:selected").text());
    $('#team1Enginevalue').text($("#team1Engine").children("option:selected").val());
    $('#hiddenTeam1Engine').val($("#team1Engine").children("option:selected").text());
    $('#team2Chassivalue').text($("#team2Chassi").children("option:selected").val());
    $('#hiddenTeam2Chassi').val($("#team2Chassi").children("option:selected").text());
    $('#team2Enginevalue').text($("#team2Engine").children("option:selected").val());
    $('#hiddenTeam2Engine').val($("#team2Engine").children("option:selected").text());
    $.fn.setTotalTeam1();
    $.fn.setTotalTeam2();
});
$.fn.setTotalTeam1 = function(){
    let creditsTeam1 = Number($("#creditsTeam1").val());
    let team1Driver1 = Number($("#team1Driver1").children("option:selected").val());
    let team1Driver2 = Number($("#team1Driver2").children("option:selected").val());
    let team1Chassi = Number($("#team1Chassi").children("option:selected").val());
    let team1Engine = Number($("#team1Engine").children("option:selected").val());
    let totalTeam1 = creditsTeam1 - (team1Driver1 + team1Driver2 + team1Chassi + team1Engine);
    if (totalTeam1 < 0 ) {
        $('#tdCreditsTeam1').removeClass("bg-success");
        $('#tdCreditsTeam1').addClass("bg-danger");
    } else {
        $('#tdCreditsTeam1').removeClass("bg-danger");
        $('#tdCreditsTeam1').addClass("bg-success");
    }
    $('#team1TotalSum').text(totalTeam1);
}
$.fn.setTotalTeam2 = function(){
    let creditsTeam2 = Number($("#creditsTeam2").val());
    let team2Driver1 = Number($("#team2Driver1").children("option:selected").val());
    let team2Driver2 = Number($("#team2Driver2").children("option:selected").val());
    let team2Chassi = Number($("#team2Chassi").children("option:selected").val());
    let team2Engine = Number($("#team2Engine").children("option:selected").val());
    let totalTeam2 = creditsTeam2 - (team2Driver1 + team2Driver2 + team2Chassi + team2Engine);
    if (totalTeam2 < 0 ) {
        $('#tdCreditsTeam2').addClass("bg-danger");
        $('#tdCreditsTeam2').removeClass("bg-success");
    } else {
        $('#tdCreditsTeam2').addClass("bg-success");
        $('#tdCreditsTeam2').removeClass("bg-danger");
    }
    $('#team2TotalSum').text(totalTeam2);
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
$("#team1Chassi").change(function(){
    $('#team1Chassivalue').text($("#team1Chassi").children("option:selected").val());
    $('#hiddenTeam1Chassi').val($("#team1Chassi").children("option:selected").text());
    $.fn.setTotalTeam1();
});
$("#team1Engine").change(function(){
    $('#team1Enginevalue').text($("#team1Engine").children("option:selected").val());
    $('#hiddenTeam1Engine').val($("#team1Engine").children("option:selected").text());
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
$("#team2Chassi").change(function(){
    $('#team2Chassivalue').text($("#team2Chassi").children("option:selected").val());
    $('#hiddenTeam2Chassi').val($("#team2Chassi").children("option:selected").text());
    $.fn.setTotalTeam2();
});
$("#team2Engine").change(function(){
    $('#team2Enginevalue').text($("#team2Engine").children("option:selected").val());
    $('#hiddenTeam2Engine').val($("#team2Engine").children("option:selected").text());
    $.fn.setTotalTeam2();
});