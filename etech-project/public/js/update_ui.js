// Functions which will update the UI based on the response

var UpdateUI = (function(){
    var open_lessons = 'open_lessons';
    var open_profile = 'open_profile';

    return{
        result: result
    }

    function result(response){  

        switch(response){
            case open_lessons:
                return openLessons;
            case open_profile:
                return openProfile;
            default:
                return 'No match';
        }
    }

    function openLessons(){
        $('#lessonModal').modal('show'); 
    }
    function openProfile(){
        $('#profModal').modal('show'); 
    }
}());