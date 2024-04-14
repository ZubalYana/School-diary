//timers functions
function countdownEndOfYear() {
    var currentDate = new Date(); 
    var targetDate = new Date("June 8, 2024 00:00:00"); 

    var difference = targetDate.getTime() - currentDate.getTime();

    if (difference > 0) {
        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("timeToTheEndOfStudyYear").innerHTML = "До кінця навчального року: " + days +  " днів " + hours + " годин " + minutes + " хвилин " + seconds + " секунд ";
    } else {
        document.getElementById("timeToTheEndOfStudyYear").innerHTML = "Насолоджуйтеся літом! ";
    }
}
setInterval(countdownEndOfYear, 1000);
function countdownNextHolidays() {
    var currentDate = new Date(); 
    var targetDate = new Date("May 5, 2024 00:00:00"); 

    var difference = targetDate.getTime() - currentDate.getTime();

    if (difference > 0) {
        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("timeToHolidays").innerHTML = "До найблищих канікул: " + days +  " днів " + hours + " годин " + minutes + " хвилин " + seconds + " секунд ";
    } else {
        document.getElementById("timeToHolidays").innerHTML = "Насолоджуйтеся канікулами! ";
    }
}
setInterval(countdownNextHolidays, 1000);
function countdownWeekends() {
    var currentDate = new Date(); 
    var targetDate = new Date("April 20, 2024 00:00:00"); 

    var difference = targetDate.getTime() - currentDate.getTime();

    if (difference > 0) {
        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("timeToWeekends").innerHTML = "До найблищих вихідних: " + days +  " днів " + hours + " годин " + minutes + " хвилин " + seconds + " секунд ";
    } else {
        document.getElementById("timeToWeekends").innerHTML = "Насолоджуйтеся вихідними! ";
    }
}
setInterval(countdownWeekends, 1000);

//theme changing
let theme = localStorage.getItem('theme') || 'light';
$('#theme').click(function(){

    if(theme == 'light'){
        theme = 'dark';
        localStorage.setItem('theme', theme);
        changeTheme(theme);

    }else{
        theme = 'light';
        localStorage.setItem('theme', theme);
        changeTheme(theme);
    }
})

function changeTheme(theme){
    if(theme == 'light'){
        $('#theme').css('justify-content', 'flex-start');
        $('.wrap').css('background-color', '#fff');
        $('.wrap').css('color', '#333');
        $('.weekDay').css('border', '#393E46 3px solid');
        $('.weekDay_lessonHomework').css('color', '#000');
        $('.theme').css('background-color', '#393E46');
        $('.theme_circle').css('background-color', '#fff');
        $('.theme_circle').css('border', '3px solid #393E46');

    }else{
        $('#theme').css('justify-content', 'flex-end');
        $('.wrap').css('background-color', '#393E46');
        $('.wrap').css('color', '#eee');
        $('.weekDay').css('border', '#eee 3px solid');
        $('.weekDay_lessonHomework').css('color', '#fff');
        $('.theme').css('background-color', '#fff');
        $('.theme_circle').css('background-color', '#393E46');
        $('.theme_circle').css('border', '3px solid #fff');

    }
}
changeTheme(theme);

//week displaying
let today = new Date();
let firstDayOfWeek = new Date(today);
let dayOfWeek = today.getDay();
let diff = today.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1);
firstDayOfWeek.setDate(diff);
let lastDayOfWeek = new Date(firstDayOfWeek);
lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
let formattedFirstDay = formatDate(firstDayOfWeek);
let formattedLastDay = formatDate(lastDayOfWeek);
$('.currentWeek_weekDate').text(formattedFirstDay + ' - ' + formattedLastDay);
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month;
}

//homework getting
// axios.get('http://localhost:3000/getMondayHomework')
// .then(response => {
//     console.log('Monday Homework:', response.data);
//     $('#MondayHomework1').html(response.data.Mondayhomework1);
//     $('#MondayHomework2').html(response.data.Mondayhomework2);
//     $('#MondayHomework3').html(response.data.Mondayhomework3);
//     $('#MondayHomework4').html(response.data.Mondayhomework4);
//     $('#MondayHomework5').html(response.data.Mondayhomework5);
//     $('#MondayHomework6').html(response.data.Mondayhomework6);
//     $('#MondayHomework7').html(response.data.Mondayhomework7);
//     $('#MondayHomework8').html(response.data.Mondayhomework8);
// })
// .catch(error => {
//     console.error('Error:', error);
// });
// axios.get('http://localhost:3000/getTuesdayHomework')
// .then(response => {
//     console.log('Monday Homework:', response.data);
//     $('#TuesdayHomework1').html(response.data.Tuesdayhomework1);
//     $('#TuesdayHomework2').html(response.data.Tuesdayhomework2);
//     $('#TuesdayHomework3').html(response.data.Tuesdayhomework3);
//     $('#TuesdayHomework4').html(response.data.Tuesdayhomework4);
//     $('#TuesdayHomework5').html(response.data.Tuesdayhomework5);
//     $('#TuesdayHomework6').html(response.data.Tuesdayhomework6);
//     $('#TuesdayHomework7').html(response.data.Tuesdayhomework7);
// })
// .catch(error => {
//     console.error('Error:', error);
// });


