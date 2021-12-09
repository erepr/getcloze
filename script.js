var count = 0;
    var resp = [];

    function replace() {
      axios.get("http://127.0.0.1:8000/items/" + count + "?lang=korean")
        .then(function (response) {
          resp.push(response.data.cloze + " <br><span class='text-gradient'>" + response.data.og_text + "</span>")
          resp.push("<a href='#'> " + response.data.options[0][0] + " </a>")
          resp.push(response.data.options[0][0]);
          resp.push("<a href='#'> " + response.data.options[0][1] + " </a>")
          resp.push(response.data.options[0][1]);
          resp.push("<a href='#'> " + response.data.options[0][2] + " </a>")
          resp.push(response.data.options[0][2]);
          resp.push("<a href='#'> " + response.data.correct + " </a>")
          resp.push(response.data.correct);
        })
    }

    function scrambler() {
      count = count + 1;
      var num = document.getElementById("num").innerHTML;
      var new_score = parseInt(num) + 1;
      document.getElementById("num").innerHTML = new_score;
    }
    console.log(count)

    var supernew = []

    function seq() {
      resp.length = 0;
      replace();
      var seq = ['one', 'two', 'three', 'four'].sort((a, b) => 0.5 - Math.random());
      setTimeout(function(){ 
        document.getElementById("text").innerHTML = resp[0];
        document.getElementById(seq[0]).innerHTML = resp[1];
        document.getElementById(seq[1]).innerHTML = resp[3];
        document.getElementById(seq[2]).innerHTML = resp[5];
        document.getElementById(seq[3]).innerHTML = resp[7];
        supernew.length = 0;
        supernew.push(seq[3]);
        supernew.push(resp[8]);
        console.log(supernew)
      }, 2000);     
    }
    

    function check(clicked) {
      var who = document.getElementById(clicked)
      var correct = document.getElementById(supernew[0])
      correct.classList.add('animate__animated', 'animate__shakeX');
      setTimeout(function(){ correct.setAttribute("class", "overlay__btn overlay__btn--transparent"); }, 2000);
      var selected = document.getElementById(clicked).children[0].text;
      if (selected.trim() == resp[8]) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(function(){ scrambler(); seq(); }, 2000);
      }
    }
    replace();

    function start(clicked) {
      document.getElementById("text").innerHTML = resp[0]; 
      document.getElementById("one").innerHTML = resp[1];
      document.getElementById("two").innerHTML = resp[3];
      document.getElementById("three").innerHTML = resp[5];
      document.getElementById("four").innerHTML = resp[7];
      supernew.push("four");
      supernew.push(resp[8]);
      document.getElementById("inst").remove();
      document.getElementById(clicked).remove();
    }