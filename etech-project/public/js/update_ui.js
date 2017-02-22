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
        var request = 'Here are your lessons. You haven\'t completed the last lesson. ';
        Api.speak(request);
    }
    function openProfile(){
        $('#profModal').modal('show'); 
        var request = 'Welcome to your Ignis profile. This will evolve with you throughout your lifelong studentship. Track your progress, look back at how far you\'ve come, and plot a path of where to go - and what to know - next.';
        Api.speak(request);
    }
}());