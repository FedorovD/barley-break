var mainfield = document.querySelector(".mainfield");
var winOverlay = document.querySelector(".win_overlay");
var modalOverlay = document.querySelector(".modal_overlay");
var continueBtn = document.querySelector(".continue_btn");
var ok = true;
if (localStorage.getItem("field") == null) localStorage.setItem("field", 4);
var rangeOfField = parseInt(localStorage.getItem("field")) + 2;
var verge = Math.round(800 / parseInt(localStorage.getItem("field")));
var steps = 0;
if (localStorage.getItem("lastWinner") == null) document.querySelector(".last_winner").innerHTML = "";
else document.querySelector(".last_winner").innerHTML = "Имя: " + localStorage.getItem("lastWinner") + "<br>" + localStorage.getItem("lastWinnerDate") + " " + localStorage.getItem("steps");


function matrixArray(rows, columns) {
  var arr = new Array();
  for (var i = 0; i < columns; i++) {
    arr[i] = new Array();
    for (var j = 0; j < rows; j++) {
      if (i == 0 || i == columns - 1 || j == 0 || j == rows - 1) arr[i][j] = -1;
      else arr[i][j] = 0;
    }
  }
  return arr;
}


var create = function (n) {
  var repeat = new Array(n * n);
  for (i = 0; i < (n * n - 1); i++) {
    var v = parseInt(getRandom(1, n * n));
    for (j = 0; j < repeat.length; j++) {
      if (repeat[j] == v) ok = false;
    }
    if (ok) {
      repeat[i] = v;

      var addElem = document.createElement("div");
      addElem.className = "block block_" + (v);
      addElem.innerHTML = v;
      addElem.style.width = verge - 3 + "px";
      addElem.style.height = verge - 3 + "px";
      if (parseInt(localStorage.getItem("field")) == 3) addElem.style.lineHeight = "6";
      else if (parseInt(localStorage.getItem("field")) == 4) addElem.style.lineHeight = "4.5";
      else if (parseInt(localStorage.getItem("field")) == 5) addElem.style.lineHeight = "3.7";
      mainfield.appendChild(addElem);
    } else i--;

    ok = true;
  }
}
create(parseInt(localStorage.getItem("field")));



var blocks = document.querySelectorAll(".block");
var reset_btn = document.querySelector(".reset_btn");


var field = matrixArray(rangeOfField, rangeOfField);


var h = 0,
  v = 0;
for (i = 0; i < blocks.length; i++) {
  var block_elem = blocks[i];
  field[v + 1][h + 1] = block_elem.innerHTML;
  block_elem.style.left = (h * verge + "px");
  block_elem.style.top = (v * verge + "px");
  h++;
  if (i == parseInt(localStorage.getItem("field")) - 1 || i == 2 * parseInt(localStorage.getItem("field")) - 1 || i == 3 * parseInt(localStorage.getItem("field")) - 1 || i == 4 * parseInt(localStorage.getItem("field")) - 1 || i == 5 * parseInt(localStorage.getItem("field")) - 1) {
    v++;
    h = 0;
  }


  block_elem.addEventListener("click", function (event) {
    var thisPos;
    for (i = 0; i < field.length; i++) {
      for (j = 0; j < field.length; j++) {
        if (field[i][j] == this.innerHTML) {
          thisPos = [i, j];
        }
      }
    }


    if (field[thisPos[0] + 1][thisPos[1]] == 0) {
      steps++;
      this.style.top = ((thisPos[0]) * verge) + "px";
      field[thisPos[0] + 1][thisPos[1]] = this.innerHTML;
      field[thisPos[0]][thisPos[1]] = 0;

    } else if (field[thisPos[0] - 1][thisPos[1]] == 0) {
      steps++;
      this.style.top = (thisPos[0] - 2) * verge + "px";
      field[thisPos[0] - 1][thisPos[1]] = this.innerHTML;
      field[thisPos[0]][thisPos[1]] = 0;

    } else if (field[thisPos[0]][thisPos[1] + 1] == 0) {
      steps++;
      this.style.left = ((thisPos[1]) * verge) + "px";
      field[thisPos[0]][thisPos[1] + 1] = this.innerHTML;
      field[thisPos[0]][thisPos[1]] = 0;

    } else if (field[thisPos[0]][thisPos[1] - 1] == 0) {
      steps++;
      this.style.left = (thisPos[1] - 2) * verge + "px";
      field[thisPos[0]][thisPos[1] - 1] = this.innerHTML;
      field[thisPos[0]][thisPos[1]] = 0;
    }

    var win = 0;
    for (i = 1; i < field.length - 1; i++) {
      for (j = 1; j < field.length - 1; j++) {
        if (field[i][j] == win + 1) {
          win++;
        }
      }
    }
    if (win == Math.pow(parseInt(localStorage.getItem("field")), 2) - 1) {
      if (localStorage.getItem("countOfWin") == null) {
        localStorage.setItem("countOfWin", 1);
        countWin.innerHTML = localStorage.getItem("countOfWin");
      } else {
        var temp = parseInt(localStorage.getItem("countOfWin"));
        localStorage.setItem("countOfWin", temp + 1);
        countWin.innerHTML = localStorage.getItem("countOfWin");
      }



      modalOverlay.classList.toggle("modal_overlay_show");
      winOverlay.classList.toggle("win_overlay_show");
    }
  })

}

function isFreeSpace(Object) {
  var pos = getPosition(Object);

  if (field[pos[1]][pos[0] - 1] == 0) return [true, "toUp"];
  else if (field[pos[1] + 1][pos[0]] == 0) {
    console.log("dadad");
    return [true, "toRight"];
  } else if (field[pos[1]][pos[0] + 1] == 0) return [true, "toDown"];
  else if (field[pos[1] - 1][pos[0]] == 0) return [true, "toLeft"];
  else return [false, 0];
}

function getPosition(o) {
  for (i = 0; i < field.length; i++) {
    for (j = 0; j < field.length; j++) {
      if (field[i][j] == o.innerHTML) return [i, j];
    }
  }
}



reset_btn.addEventListener("click", function (event) {

  if (localStorage.getItem("countOfLose") == null) {
    localStorage.setItem("countOfLose", 1)
  } else {
    var temp = parseInt(localStorage.getItem("countOfLose"));
    localStorage.setItem("countOfLose", temp + 1);
    countLose.innerHTML = localStorage.getItem("countOfLose");
  }

  location.reload();

})

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var img = document.querySelector(".img");
var prevBtn = document.querySelector(".prev_btn");
var nextBtn = document.querySelector(".next_btn");
var imagesPath = ["images/peter.jpg", "images/tete-envers.jpg", "images/temple.jpg ", "images/raccoon.jpg ", "images/parrot.jpg ", "images/nums.jpg "];
var cutedImagesPath = ["images/peter_" + localStorage.getItem("field") + "/", "images/tete-envers_" + localStorage.getItem("field") + "/", "images/temple_" + localStorage.getItem("field") + "/", "images/raccoon_" + localStorage.getItem("field") + "/", "images/parrot_" + localStorage.getItem("field") + "/"];
var imageCount = 0;
prevBtn.addEventListener("click", function () {
  if (imageCount == 0) {
    img.style.background = "url(" + imagesPath[imagesPath.length - 1] + ")";
    img.style.backgroundSize = "contain";
    imageCount = imagesPath.length - 1;
  } else {
    imageCount--;
    img.style.background = "url(" + imagesPath[imageCount] + ")";
    img.style.backgroundSize = "contain";
  }
})

nextBtn.addEventListener("click", function () {
  if (imageCount == imagesPath.length - 1) {
    img.style.background = "url(" + imagesPath[0] + ")";
    img.style.backgroundSize = "contain";
    imageCount = 0;
  } else {
    imageCount++;
    img.style.background = "url(" + imagesPath[imageCount] + ")";
    img.style.backgroundSize = "contain";
  }
})

img.addEventListener("click", function () {
  if (imageCount == imagesPath.length - 1) {
    for (i = 0; i < blocks.length; i++) {
      blocks[i].style.background = "";
      blocks[i].style.fontSize = "42px";

    }



    return;
  }
  for (i = 0; i < blocks.length; i++) {
    blocks[i].style.background = "url(" + cutedImagesPath[imageCount] + blocks[i].innerHTML + ".jpg"
    ")";
    blocks[i].style.backgroundSize = "contain";
    blocks[i].style.fontSize = "0px";
  }
})

var countWin = document.querySelector(".count_win");
var countLose = document.querySelector(".count_lose");
countLose.innerHTML = localStorage.getItem("countOfLose");
countWin.innerHTML = localStorage.getItem("countOfWin");


var statRestartBtn = document.querySelector(".statRestart_btn");
statRestartBtn.addEventListener("click", function () {
  localStorage.removeItem("countOfWin");
  localStorage.removeItem("countOfLose");
  localStorage.removeItem("lastWinner");
  localStorage.removeItem("lastWinnerDate");
  countLose.innerHTML = "";
  countWin.innerHTML = "";
  document.querySelector(".lastWinner").innerHTML = "";

})

continueBtn.addEventListener("click", function () {
  localStorage.setItem("lastWinner", document.querySelector(".win_overlay input").value);
  localStorage.setItem("lastWinnerDate", new Date());
  localStorage.setItem("steps", steps);
  modalOverlay.classList.toggle("modal_overlay_show");
  winOverlay.classList.toggle("win_overlay_show");
  location.reload();
})



document.onkeydown = function (e) {
  if (modalOverlay.classList.contains("modal_overlay_show")) return 0;

  var free;
  for (i = 1; i < field.length - 1; i++) {
    for (j = 1; j < field.length - 1; j++) {
      if (field[i][j] == 0) free = [i, j];
    }
  }

  if ((e["key"] == "w" || e["code"] == "Numpad8" || e["code"] == "ArrowUp") && field[free[0] + 1][free[1]] != -1) {
    steps++;
    var block;
    for (i = 0; i < blocks.length; i++) {
      if (blocks[i].innerHTML == field[free[0] + 1][free[1]]) block = blocks[i];
    }
    block.style.top = ((free[0] - 1) * verge) + "px";
    field[free[0]][free[1]] = block.innerHTML;
    field[free[0] + 1][free[1]] = 0;
  } else if ((e["key"] == "s" || e["code"] == "Numpad2" || e["code"] == "ArrowDown") && field[free[0] - 1][free[1]] != -1) {
    steps++;
    var block;
    for (i = 0; i < blocks.length; i++) {
      if (blocks[i].innerHTML == field[free[0] - 1][free[1]]) block = blocks[i];
    }
    block.style.top = ((free[0] - 1) * verge) + "px";
    field[free[0]][free[1]] = block.innerHTML;
    field[free[0] - 1][free[1]] = 0;
  } else if ((e["key"] == "a" || e["code"] == "Numpad4" || e["code"] == "ArrowLeft") && field[free[0]][free[1] + 1] != -1) {
    steps++;
    var block;
    for (i = 0; i < blocks.length; i++) {
      if (blocks[i].innerHTML == field[free[0]][free[1] + 1]) block = blocks[i];
    }
    block.style.left = ((free[1] - 1) * verge) + "px";
    field[free[0]][free[1]] = block.innerHTML;
    field[free[0]][free[1] + 1] = 0;

  } else if ((e["key"] == "d" || e["code"] == "Numpad6" || e["code"] == "ArrowRight") && field[free[0]][free[1] - 1] != -1) {
    steps++;
    var block;
    for (i = 0; i < blocks.length; i++) {
      if (blocks[i].innerHTML == field[free[0]][free[1] - 1]) block = blocks[i];
    }
    block.style.left = ((free[1] - 1) * verge) + "px";
    field[free[0]][free[1]] = block.innerHTML;
    field[free[0]][free[1] - 1] = 0;
  }
}



var plusBtn = document.querySelector(".plus");
var minusBtn = document.querySelector(".minus");
var rangeFieldValue = document.querySelector(".value");
rangeFieldValue.innerHTML = localStorage.getItem("field");
plusBtn.addEventListener("click", function () {
  if (rangeFieldValue.innerHTML != 5) rangeFieldValue.innerHTML = parseInt(rangeFieldValue.innerHTML) + 1;
})
minusBtn.addEventListener("click", function () {
  if (rangeFieldValue.innerHTML != 3) rangeFieldValue.innerHTML -= 1;
})

var fieldRangeApply = document.querySelector(".fieldrange_apply");

fieldRangeApply.addEventListener("click", function () {
  localStorage.setItem("field", rangeFieldValue.innerHTML);
  location.reload();
})