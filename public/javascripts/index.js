($('document').ready(function () {
    const microm = new Microm();
    let mp3 = null;
    let record = $('#record');
    let play = $('#play');
    let stoprecord = $('#stoprecord');

    record.click(() => {
        microm.record().then(function () {
            record.hide();
            stoprecord.show();
            console.log('recording...')
        }).catch(function () {
            console.log('error recording');
        });
    })

    stoprecord.click(() => {
        microm.stop().then(function (result) {
            stoprecord.hide();
            record.show();
            mp3 = result;
            console.log(mp3.url, mp3.blob, mp3.buffer);
        })
    })

    play.click(() => {
        microm.play();
    })
}));