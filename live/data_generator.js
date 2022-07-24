// console.log("here i am");
function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function () {
      return Math.round(Math.random() * max * 100) / 100;
    });
  }
  
  function getRandomFloat(min = -1, max = 1, decimals = 3) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }
  
  class BasicDatapoint {
    constructor(time_index, length_emotions) {
      this.time_index = time_index;
      this.user_emotions = {};
    }
  }
  
  class EmotionVector extends BasicDatapoint {
    constructor(time_index, length_emotions, length_users = 5) {
      super(time_index, length_emotions);
      for (let i = 0; i < length_users; i++) {
        this.user_emotions[i] = randomArray(length_emotions, 1);
      }
    }
  }
  
  class EmotionAV extends BasicDatapoint {
    constructor(time_index, length_emotions, length_users = 5) {
      super(time_index, length_emotions);
      for (let i = 0; i < length_users; i++) {
        this.user_emotions[i] = [getRandomFloat(), getRandomFloat()];
      }
    }
  }
  
  function create_array_emotion_vectors(
    length_emotions = 8,
    length_users = 5,
    amount_of_datapoints = 100
  ) {
    let data = [];
    for (let i = 0; i < amount_of_datapoints; i++) {
      let v = new EmotionVector(i, length_emotions, length_users);
      data.push(v);
    }
    return data;
  }
  
  function create_array_emotion_arousal_valence(
    length_emotions = 8,
    length_users = 5,
    amount_of_datapoints = 100
  ) {
    let data = [];
    for (let i = 0; i < amount_of_datapoints; i++) {
      let v = new EmotionAV(i, length_emotions, length_users);
      data.push(v);
    }
    return data;
  }
  
  // HIER SIND DIE DATEN
  length_emotions = 8;
  length_users = 1;
  amount_of_datapoints = 1000;
  
  // Vordefinierte Daten, welche visualisiert werden können!
  // Arrays mit Emotionen in Stärke von 0-1
  let data_emotion_vectors = create_array_emotion_vectors(
    length_emotions,
    length_users,
    amount_of_datapoints
  );
  //Tupel von Arousal und Valence (zb im Koordinatensystem)
  let data_emotion_arousal_valence = create_array_emotion_arousal_valence(
    length_emotions,
    length_users,
    amount_of_datapoints
  );
  
  // console.log(data_emotion_vectors);
  // console.log(data_emotion_arousal_valence);
  
  
  