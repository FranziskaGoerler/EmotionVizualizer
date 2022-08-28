
// Emotion            AV X          AV Y
// 'Neutral'          0             0
// 'Surprise'         0.1           +
// 'Happy'            +             0.1
// 'Sad'              -             -0.2
// 'Disgust'          -             0.2
// 'Contempt'         -             0.4
// 'Angry'            -             0.65
// 'Fear'             -0.1          +


function get_x(y) {
    var alpha = Math.asin(y);
    var x = Math.cos(alpha);
    return x
}

function get_y(x) {
    var alpha = Math.asin(x);
    var y = Math.cos(alpha);
    return y
}

var av_coords = [[0, 0]];                    // neutral
av_coords.push([0.1, get_y(0.1)]);           // surprise
av_coords.push([get_x(0.1), 0.1]);           // happy
av_coords.push([-get_x(-0.35), -0.35]);        // sad
av_coords.push([-get_x(0.2), 0.2]);          // disgust
av_coords.push([-get_x(0.4), 0.4]);          // contempt
av_coords.push([-get_x(0.65), 0.65]);        // angry
av_coords.push([-0.1, get_y(-0.1)]);         // fear



function vector_to_av(one_vector) {
    var n_emos = one_vector.length;
    var x = 0, y = 0;
    for (var i=0; i < n_emos; i++) {
        var e = one_vector[i];
        x += e * av_coords[i][0];
        y += e * av_coords[i][1];
    }

    return [x, y];
}

function vectors_to_avs(emo_vector_data) {
    var emo_av_data = [];
    for (vec of emo_vector_data) {
        var single_av = vector_to_av(vec);
        emo_av_data.push(single_av);
    }
    return emo_av_data;
}

function generate_timestamp(n_timestamps, fps) {
    var ts = [];
    for (var i = 0; i < n_timestamps; i++) {
        var seconds = Math.round((i/fps) * 100) / 100;
        var minutes = Math.floor(seconds/60)
        seconds = seconds % 60;
        ts.push(minutes.toString() + ":" + seconds.toString())
    }
    return ts;
}