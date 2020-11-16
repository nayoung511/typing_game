//사용 변수
const GAME_TIME = 5;

let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
    getWords();
    //wordInput.addEventListener('이벤트', '기능')
    wordInput.addEventListener('input', checkMatch);
}

//게임 실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임 중');
}

function checkStatus(){
    if(!isPlaying && time === 0){
        //타입까지 일치
        buttonChange("게임시작");
        clearInterval(checkInterval);
    }
}

//단어 불러오기 
function getWords(){
        // Make a request for a user with a given ID
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
    // handle success
    words = response.data;
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    words = ['Hello', 'Banana', 'Apple', 'Cherry'];
    buttonChange('게임시작');
}

//단어 일치 체크 
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
      wordInput.value = "";
      if(!isPlaying){
          return;
      }
      score++;  
      scoreDisplay.innerText = score;
      time = GAME_TIME;
      const randomIndex = Math.floor(Math.random()*words.length);
      wordDisplay.innerText = words[randomIndex];
    }
}

function countDown(){
    //(조건) ? 참: 거짓
    time > 0 ? time--: isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading'):button.classList.add('loading');

}