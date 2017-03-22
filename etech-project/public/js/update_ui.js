// Functions which will update the UI based on the response

let UpdateUI = (function ($)
{
	//populate UI with user data
	let userData = $.getJSON('/api/user', function (data)
	{
		let fields = document.getElementsByClassName('first-last-name-level');
		for (let i = 0; i < fields.length; i++)
			fields[i].innerHTML = data.firstName + ' ' + data.lastName + ' - Level ' + data.level;

		fields = document.getElementsByClassName('progress-bar');
		for (let i = 0; i < fields.length; i++)
			fields[i].style.width = (data.experience / ((data.level + 1) * 1000) * 100) + '%';

		fields = document.getElementsByClassName('progress-bar-label');
		for (let i = 0; i < fields.length; i++)
			fields[i].innerHTML = 'Level ' + data.level + ' &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Level ' + (data.level + 1);

		fields = document.getElementsByClassName('progress-bar-label-xp');
		for (let i = 0; i < fields.length; i++)
			fields[i].innerHTML = '| ' + (data.level * 1000) + ' XP &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;' + ((data.level + 1) * 1000) + ' XP |';
	});

	const open_lessons = 'open_lessons';
	const open_profile = 'open_profile';
	const open_commands = 'open_commands';
	const open_achievements = 'open_achievements';
	const begin_lesson = 'begin_lesson';
	const next_section = 'next_section';
	const end_lesson = 'end_lesson';
	const say_goodbye = 'goodbye';

	return {
		resultUpdateUI: resultUpdateUI
	};

	function resultUpdateUI(response)
	{

		switch (response)
		{
			case open_lessons:
				return openLessons;
			case open_profile:
				return openProfile;
			case open_commands:
				return openCommands;
			case open_achievements:
				return openAchievements;
			case begin_lesson:
				return openCurrentLesson;
			case next_section:
				return nextSection;
			case end_lesson:
				return endLesson;
			case say_goodbye:
				return goodbye;
			default:
				return 'No match';
		}
	}

	function openLessons()
	{
		$('#lessonModal').modal('show');
		let request = 'These are your lessons.';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}

	function openProfile()
	{
		$('#profModal').modal('show');
		let request = 'Welcome to your Igins profile. ';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}

	function openCommands()
	{
		$('#commandModal').modal('show');
		let request = 'Below are some commands you can use to experiment with Ignis\'s speech recognition and conversational capabilities.';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}

	function openAchievements()
	{
		$('#achieveModal').modal('show');
		let request = 'Here are your achievements, it seems like you are doing quite well!';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}
	function openCurrentLesson()
	{
		$('#lessonSession').modal('show');
		let request = 'Lesson 1: Whole numbers! Writing whole numbers as words! Each digit in a number has a place value. It shows the position of a digit in a number. The first few place values are shown in the table. Check the example below to help you further!';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}

	function nextSection()
	{
		$('#btnEndLesson').click();
		let request = 'Here is the next section of this lesson.';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}

	function endLesson()
	{
		$('#lessonModal').modal('hide');
		$('#btnEndLesson').click();
		let request = 'You finished this lesson! Congratulations. You earned an achievement! See it in your profile or the achievements screen.';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}
	function goodbye()
	{
		stopListening = false;
		let request = 'Goodbye, John! See you soon!';
		Api.speak(request);
		//responsiveVoice.speak(request);
	}
})(jQuery);

let lesson = 0;
function progressLesson()
{
	let lessonSession = $('#lessonSession');
	let button = lessonSession.find('.modal-dialog .modal-content .modal-footer button');
	if(lesson > 2)
		lesson = 0;
	switch (lesson)
	{
		case 0:
			lessonSession.find('.modal-dialog .modal-content .modal-body').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/9Jg5S7F2SMQ" frameborder="0" allowfullscreen></iframe>');
			break;
		case 1:
			button.html('End Lesson');
			lessonSession.find('.modal-dialog .modal-content .modal-body').html($('#lessonTest'));
			$('#lessonTest').show();
			break;
		case 2:
			button.attr('data-dismiss', 'modal');
			break;
	}
	lesson++;
}