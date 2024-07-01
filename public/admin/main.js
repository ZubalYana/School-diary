//homework adding
// $('.addBtn').click(()=>{
//     // let Mondayhomework1 = $('#homework1').val();
//     // console.log(Mondayhomework1);
//     let MondayData = {
//         Mondayhomework1: $('#homework1').val(),
//         Mondayhomework2: $('#homework2').val(),
//         Mondayhomework3: $('#homework3').val(),
//         Mondayhomework4: $('#homework4').val(),
//         Mondayhomework5: $('#homework5').val(),
//         Mondayhomework6: $('#homework6').val(),
//         Mondayhomework7: $('#homework7').val(),
//         Mondayhomework8: $('#homework8').val(),
//     }
//     console.log(MondayData)
//     axios.post('/addNewMondayHomework', MondayData)

//     let TuesdayData = {
//         Tuesdayhomework1: $('#Tuesdayhomework1').val(),
//         Tuesdayhomework2: $('#Tuesdayhomework2').val(),
//         Tuesdayhomework3: $('#Tuesdayhomework3').val(),
//         Tuesdayhomework4: $('#Tuesdayhomework4').val(),
//         Tuesdayhomework5: $('#Tuesdayhomework5').val(),
//         Tuesdayhomework6: $('#Tuesdayhomework6').val(),
//         Tuesdayhomework7: $('#Tuesdayhomework7').val(),
//     }
//     console.log(TuesdayData)
//     axios.post('/addNewTuesdayHomework', TuesdayData)

// })

//theme
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
        $('input').css('background-color', '#fff')
        $('.weekDay_lessonName').css('color', '#333');
        $('.weekDay_heading').css('color', '#333');
        $('h1').css('color', '#333');
        $('.addBtn').css('border', '#333 3px solid');
        $('.addBtn').css('color', '#333');


    }else{
        $('#theme').css('justify-content', 'flex-end');
        $('.wrap').css('background-color', '#393E46');
        $('.wrap').css('color', '#fff');
        $('.weekDay').css('border', '#eee 3px solid');
        $('.weekDay_lessonHomework').css('color', '#fff');
        $('.theme').css('background-color', '#fff');
        $('.theme_circle').css('background-color', '#393E46');
        $('.theme_circle').css('border', '3px solid #fff');
        $('input').css('background-color', '#393E46')
        $('.weekDay_lessonName').css('color', '#fff');
        $('.weekDay_heading').css('color', '#fff');
        $('h1').css('color', '#fff');
        $('.addBtn').css('border', '#fff 3px solid');
        $('.addBtn').css('color', '#fff');

    }
}
changeTheme(theme);

//bot message sending

$('#send').click(() => {
    let data = {
        message: $('.bot_message').val()
    };
    axios.post('http://localhost:3000/send', data)
        .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                $('.bot_message').val(' ');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

