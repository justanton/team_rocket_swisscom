($('document').ready(function () {
    // request mic permission
    navigator.mediaDevices.getUserMedia({audio: true});
    const microm = new Microm();
    let mp3 = null;
    let askButton = $('#ask');
    let voicePermission = $('#voicepermission');
    let gameContainer = $('#gamecontainer');
    let questionContainer = $('#questioncontainer');
    let startGameButton = $('#startgame');
    let nextButton = $('#nextbutton');
    let micIcon = $('#micicon');

    const getQuestion = () => {
        const questions = [
            'sprayed a grafitti',
            'cheated in school',
            'forgot homework',
            'eaten mushrooms',
            'celebrated my birthday',
            'been at a hackathon'
        ];

        return questions[Math.floor(Math.random() * questions.length)];
    };

    const showNextButton = () => {
        nextButton.show();
    };

    const startNewGame = () => {
            voicePermission.show();
            nextButton.hide();
            startGameButton.hide();
            navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
                doTransition(() => {
                    askButton.show();
                    voicePermission.hide();
                    questionContainer.text(getQuestion());
                    gameContainer.show();
                });
            }).catch(function(err) {
                /* handle the error */
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
                success: showNextButton
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
            showNextButton();
            micIcon.hide();
            uploadVoice(result);
        });
    };

    askButton.click(() => {
        askButton.hide();
        micIcon.show();
        microm.record().then(function () {
            setTimeout(stopRecording, 5000);
        });
    });

    startGameButton.click( () => {
        startNewGame();
    });

    nextButton.click( () => {
        startNewGame();
    });
}));

