
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


let questions = [
  {
    question: "Để trở thành mặt đối lập của mâu thuẫn, các mặt đối lập phải: ?",
    imgSrc: "Stuffs/img/dog.gif",
    choiceA: "Liên tục đấu tranh với nhau.",
    choiceB: "Thống nhất biện chứng với nhau.",
    choiceC: "Vừa thống nhất với nhau, vừa đấu tranh với nhau.",
    choiceD: "Vừa liên hệ với nhau, vừa đấu tranh với nhau.",
    correct: "C",
  },
  {
    question: "Mặt đối lập của mâu thuẫn là những khuynh hướng, tính chất, đặc điểm mà trong quá trình vận động, phát triển của sự vật và hiện tượng, chúng phát triển theo những chiều hướng nào?",
    imgSrc: "Stuffs/img/master.gif",
    choiceA: "Khác nhau.",
    choiceB: "Trái ngược nhau.",
    choiceC: "Giống nhau.",
    choiceD: "Tách biệt nhau.",
    correct: "B",
  },
  {
    question: "V.I.Lênin nói: Sự phát triển là một cuộc đấu tranh giữa các mặt đối lập, câu nói đó bàn về:",
    imgSrc: "Stuffs/img/trick.gif",
    choiceA: "Hình thức của sự phát triển.",
    choiceB: "Nội dung của sự phát triển.",
    choiceC: "Điều kiện của sự phát triển.",
    choiceD: "Nguyên nhân của sự phát triển.",
    correct: "D",
  },
  {
    question: "Hai mặt đối lập vận động và phát triển theo những chiều hướng trái ngược nhau, nên chúng luôn tác động, bài trừ, gạt bỏ nhau, Triết học gọi đó là ?",
    imgSrc: "Stuffs/img/bean.gif",
    choiceA: "Sự đấu tranh giữa các mặt đối lập.",
    choiceB: "Sự tồn tại giữa các mặt đối lập.",
    choiceC: "Sự phủ định giữa các mặt đối lập.",
    choiceD: "Sự phát triển giữa các mặt đối lập.",
    correct: "A",
  },
  {
    question: "Mâu thuẫn nào trong số các mâu thuẫn sau đây là mâu thuẫn cơ bản:",
    imgSrc: "Stuffs/img/ricardo.gif",
    choiceA: "Mâu thuẫn quy định bản chất của sự vật , tồn tại từ đầu đến cuối trong suốt quá trình tồn tại, phát triển của sự vật. Khi mâu thuẫn này được giải quyết thì làm thay đổi bản chất",
    choiceB: "Mâu thuẫn chỉ đặc trưng cho một phương diện nào đó của sự vật",
    choiceC: "Mâu thuẫn nổi lên hàng đầu và chi phối các mâu thuẫn khác trong giai đoạn phát triển nhất",
    choiceD: "Mẫu thuẫn giữa các bạn và môn giải tích",
    correct: "A",
  },
  {
    question: "Tại sao nói quy luật thống nhất và đấu tranh giữa các mặt đối lập nêu nguồn gốc, động lực vận động, phát triển của sự vật, hiện tượng?",
    imgSrc: "Stuffs/img/emoji.gif",
    choiceA: "Đây là",
    choiceB: "Câu hỏi",
    choiceC: "Tự luận",
    choiceD: "Cố lên!!",
    correct: "E",
  },
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 30;
const questionTime = 0; 

let TIMER;
let score = 0;

function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
  var music = new Audio();
  music.src = "Stuffs/music/Easy song.mp3";
  music.play();
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}


function renderCounter() {
  if (count >= questionTime) {
    counter.innerHTML = count;

    count-=1;
  } else {
    count = 30;
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      scoreRender();
    }
  }
}


function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 30;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
  var music = new Audio();
  music.src = "Stuffs/music/yeah.mp3";
  music.play();
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
  var music = new Audio();
  music.src = "Stuffs/music/Huh.mp3";
  music.play();
}

function scoreRender() {
  scoreDiv.style.display = "block";
  var music = new Audio();
  music.src = "Stuffs/music/GameOver.mp3";
  music.play();

  const scorePerCent = Math.round((100 * score) / questions.length);


  let img =
    scorePerCent >= 80
      ? "Stuffs/img/5.png"
      : scorePerCent >= 60
      ? "Stuffs/img/4.png"
      : scorePerCent >= 40
      ? "Stuffs/img/3.png"
      : scorePerCent >= 20
      ? "Stuffs/img/2.png"
      : "Stuffs/img/1.png";
  let wish =
      scorePerCent >= 80
        ? "Ngạo nghễ"
        : scorePerCent >= 60
        ? "Game của trẻ con thôi"
        : scorePerCent >= 40
        ? "Vẫn qua môn tốt"
        : scorePerCent >= 20
        ? "8đ trên tay, 2đ trên giấy"
        : "Làm chủ trong một đêm";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "% "+wish+"</p>";
}

var myVar;

function myLoader() {
  myVar = setTimeout(showPage, 15000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
}
