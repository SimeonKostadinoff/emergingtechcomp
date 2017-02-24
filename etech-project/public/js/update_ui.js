// Functions which will update the UI based on the response

var UpdateUI = (function(){
    var open_lessons = 'open_lessons';
    var open_profile = 'open_profile';
    var open_commands = 'open_commands';
    var open_achievements = 'open_achievements';
    return{
        result: result
    }

    function result(response){  

        switch(response){
            case open_lessons:
                return openLessons;
            case open_profile:
                return openProfile;
            case open_commands:
                return openCommands;
            case open_achievements:
                return openAchievements;
            default:
                return 'No match';
        }
    }

    function openLessons(){
        $('#lessonModal').modal('show'); 
        var request = 'These are your lessons.';
        //Api.speak(request);
        responsiveVoice.speak(request);
    }
    function openProfile(){
        $('#profModal').modal('show'); 
        var request = 'Welcome to your Igins profile. ';
        //Api.speak(request);
        responsiveVoice.speak(request);
    }
    function openCommands(){
        $('#commandModal').modal('show'); 
        var request = 'Below are some commands you can use to experiment with Ignis\'s speech recognition and conversational capabilities.';
        //Api.speak(request);
        responsiveVoice.speak(request);
    }
    function openAchievements(){
        $('#achieveModal').modal('show'); 
        var request = 'Here are your achievements, it seems like you are doing quite well!';
        //Api.speak(request);
        responsiveVoice.speak(request);
    }
}());