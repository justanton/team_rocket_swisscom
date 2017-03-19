($('document').ready(function () {
    // request mic permission
    navigator.mediaDevices.getUserMedia({audio: true});
    const microm = new Microm();
    let mp3 = null;
    let voicePermission = $('#voicepermission');
    let gameContainer = $('#gamecontainer');
    let questionContainer = $('#questioncontainer');
    let startGameButton = $('#startgame');
    let previousButton = $('#previousbutton');
    let nextButton = $('#nextbutton');
    let micButton = $('#micbutton');
    let micIcon = $('#micicon');
    let intro = $('#intro');
    const questions = [
        'sprayed a grafitti',
        'cheated in school',
        'forgot homework',
        'eaten mushrooms',
        'celebrated my birthday',
        'been at a hackathon'
        ];
    var questionsAsked = [];

    const getQuestion = () => {
        const questions = [
            'sprayed a grafitti',
            'cheated in school',
            'forgot homework',
            'eaten mushrooms',
            'been at a hackathon',
            'licked someones ear',
            'been to NY',
            'smoked weed',
            'skipped classes',
            'ate cat food',
            'ate dog food',
            'exceeded speed limit'
        ];
        index = Math.floor(Math.random() * questions.length);
        questionsAsked.push(index);
        return questions[index];
    };


    const getPreviousQuestion = () => {
        var index = 0;
        if (questionsAsked.length != 2) {
            var newLatestIndex = questionsAsked[questionsAsked.length-2];
            questionsAsked.pop();
            index = newLatestIndex;
        };
        return questions[index];
    };

    const showButtons = () => {
        nextButton.show();
        previousButton.show();
        micButton.show();
    };

    const startNewGame = () => {
        //voicePermission.show();
        startGameButton.hide();
        intro.hide();
        navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
            doTransition(() => {
                //voicePermission.hide();
                questionContainer.text(getQuestion());
                gameContainer.show();
            });
        }).catch(function(err) {
            /* handle the error */
        });
    };

    const previousQuestion = () => {
        doTransition(() => {
            //voicePermission.hide();
            questionContainer.text(getPreviousQuestion());
            gameContainer.show();
        });
    };

    const uploadVoice = () => {
        microm.getMp3().then(function (data) {
            var fd = new FormData();
            fd.append('data', data.blob);
            $.ajax({
                type: 'POST',
                processData: false,
                contentType: false,
                url: '/upload_voice',
                data: fd,
                success: showButtons
            });
        });
    };

    const doTransition = (callback) => {
        $('body').toggleClass('magictime rotateUp');
        setTimeout(() => {
            $('body').toggleClass('magictime rotateUp');
            if (callback)
                callback();
        }, 400)
    };

    const stopRecording = () => {
        microm.stop().then(function (result) {
            mp3 = result;
            console.log(mp3.url, mp3.blob, mp3.buffer);
            showButtons();
            micIcon.hide();
            uploadVoice(result);
        });
    };

    micButton.click(() => {
        micButton.hide();
        micIcon.show();
        microm.record().then(function () {
            setTimeout(stopRecording, 5000);
        });
    });

    startGameButton.click( () => {
        startNewGame();
    });

    previousButton.click( () => {
        if (questionsAsked.length > 2) {
            previousQuestion();
        };
    });

    nextButton.click( () => {
        startNewGame();
    });

}));
