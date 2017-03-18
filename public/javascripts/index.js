($('document').ready(function () {
    const microm = new Microm();
    let mp3 = null;
    let record = $('#record');
    let play = $('#play');
    let stoprecord = $('#stoprecord');

    let onSuccess = function() {
        alert('upload successful');
    }

    let uploadVoice = function () {
        microm.getMp3().then(function (data) {
            var fd = new FormData();
            fd.append('data', data.blob);
            $.ajax({
                type: 'POST',
                processData: false,
                contentType: false,
                url: '/upload_voice',
                data: fd,
                success: onSuccess
            });
        });
    };

    record.click(() => {
        microm.record().then(function () {
            record.hide();
            stoprecord.show();
            console.log('recording...')
        }).catch(function () {
            console.log('error recording');
        });
    });

    stoprecord.click(() => {
        microm.stop().then(function (result) {
            stoprecord.hide();
            record.show();
            mp3 = result;
            console.log(mp3.url, mp3.blob, mp3.buffer);
            uploadVoice(result);
        })
    })

    play.click(() => {
        microm.play();
    })
}));