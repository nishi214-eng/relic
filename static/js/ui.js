// ロゴの表示
var titleControl = L.control({ position: "topleft" });
titleControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "title-control");
  this.ele.id = "title";
  this.ele.className = "title-Logo";
  this.ele.innerHTML = "<img src='../static/logo/logo.png' alt='title_logo'>";
  this.ele.style.zIndex = 999;
  return this.ele;
};
titleControl.addTo(map);

//検索窓
var option = {
  collapsed: false,
  position: "topright",
  text: "",
  placeholder: "検索したい地名を入力してください。",
};
var osmGeocoder = new L.Control.OSMGeocoder(option);
map.addControl(osmGeocoder);
// UIの適用
const searchBar = document.getElementsByClassName(
  "leaflet-control-geocoder"
)[0];
const searchFrom = document.getElementsByClassName(
  "leaflet-control-geocoder-form"
)[0];
const searchInput = searchFrom.firstElementChild;
const searchButton = searchFrom.lastElementChild;
searchBar.id = "search-bar";
searchBar.style.zIndex = 999;
searchBar.classList.add("search-bar", "search-bar-control");
searchFrom.id = "search-form";
searchInput.id = "sbox";
searchButton.id = "sbtn";
let searchIco = document.createElement("i");
searchIco.classList.add("fas", "fa-search");
searchButton.appendChild(searchIco);

//サークルメニュー
var circularMenuControl = L.control({ position: "topright" });

circularMenuControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "circular-menu-control");
  this.ele.id = "circularMenu";
  this.ele.className = "circular-menu";
  this.ele.style.zIndex = 1000;

  var floatingBtn = L.DomUtil.create("a", "floating-btn", this.ele);
  floatingBtn.onclick = function () {
    document.getElementById("circularMenu").classList.toggle("active");
  };

  var customIcon = L.DomUtil.create("button", "", floatingBtn);
  customIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';

  var itemsWrapper = L.DomUtil.create("menu", "items-wrapper", this.ele);

  var menuItem1 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem1.innerHTML = '<button><i class="fa-solid fa-plus"></i></button>';
  menuItem1.id = "addpinbtn";

  var menuItem2 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem2.innerHTML = '<button><i class="fa-solid fa-filter"></i></button>';
  menuItem2.id = "sortbtn";

  var menuItem3 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem3.innerHTML = '<button><i class="fa-solid fa-question"></i></button>';
  menuItem3.id = "helpbtn";

  return this.ele;
};
circularMenuControl.addTo(map);

/* ピン追加バー */
var addpincontents = '<div class="wrapper">';
addpincontents +=
  '<form method="POST" enctype="multipart/form-data" onsubmit="return requiredRadio()">';
addpincontents += '<p><span class="required">*</span>は必須項目です</p>';
addpincontents += '<p>場所名 <span class="required">*</span></p>';
addpincontents += '<div class="cp_iptxt">';
addpincontents +=
  '<i class="fa-solid fa-location-dot"></i><input class="sidebox" type="text" name="location" placeholder="場所名を入力してね！" />';
addpincontents += "</div>";
addpincontents += '<p>コンテンツ <span class="required">*</span></p>';
addpincontents += '<div class="cp_iptxt">';
addpincontents +=
  '<i class="fa-solid fa-tag"></i><input class="sidebox" type="text" name="content" placeholder="コンテンツの名前を入力してね！" />';
addpincontents += "</div>";
addpincontents += '<p>位置情報付きの写真 <span class="required">*</span></p>';
addpincontents += '<div id="calculator">';
addpincontents +=
  '<div class="element" data-element="file_upload01" data-conditionalelement="undefined" data-conditionalelementvalue="undefined">';
addpincontents += '<label style="color:#333333">file_upload01</label>';
addpincontents +=
  '<input id="fileinput" class="calc-prop" data-identifier="file_upload01" data-isrequired="false" type="file" name="file" accept=".jpg">';
addpincontents += "</div>";
addpincontents += '<div id="uploadedFileName"></div>';
addpincontents += "</div>";
addpincontents += '<p>ピンの種類 <span class="required">*</span></p>';
addpincontents += '<div class="sideimg">';
addpincontents +=
  '<input id="pinType1" type="radio" value="oshikey.png" name="pinType">';
addpincontents +=
  '<label for="pinType1"><img src="../static/ico/oshikey.png"></label>';

addpincontents +=
  '<input id="pinType2" type="radio" value="goods.png" name="pinType">';
addpincontents +=
  '<label for="pinType2"><img src="../static/ico/goods.png"></label>';

addpincontents +=
  '<input id="pinType3" type="radio" value="place.png" name="pinType">';
addpincontents +=
  '<label for="pinType3"><img src="../static/ico/place.png"></label>';
addpincontents += "</div>";

addpincontents += '<p>タグ <span class="required">*</span></p>';
addpincontents += '<div class="sideimg">';
addpincontents +=
  '<input id="tagType1" type="radio" value="anime.png" name="tagType">';
addpincontents +=
  '<label for="tagType1"><img src="../static/ico/anime.png" alt="アニメ"></label>';

addpincontents +=
  '<input id="tagType2" type="radio" value="manga.png" name="tagType">';
addpincontents +=
  '<label for="tagType2"><img src="../static/ico/manga.png" alt="漫画"></label>';

addpincontents +=
  '<input id="tagType3" type="radio" value="novel.png" name="tagType">';
addpincontents +=
  '<label for="tagType3"><img src="../static/ico/novel.png" alt="小説"></label>';

addpincontents +=
  '<input id="tagType4" type="radio" value="film.png" name="tagType">';
addpincontents +=
  '<label for="tagType4"><img src="../static/ico/film.png" alt="映画"></label>';

addpincontents +=
  '<input id="tagType5" type="radio" value="drama.png" name="tagType">';
addpincontents +=
  '<label for="tagType5"><img src="../static/ico/drama.png" alt="ドラマ"></label>';

addpincontents +=
  '<input id="tagType6" type="radio" value="other.png" name="tagType">';
addpincontents +=
  '<label for="tagType6"><img src="../static/ico/other.png" alt="その他"></label>';
addpincontents += "</div>";

addpincontents += '<div class="remarks">';
addpincontents += "<p>備考</p>";
addpincontents +=
  '<textarea type="text" name="remarks" placeholder="例：3月末に撤去予定です"></textarea>';
addpincontents += '<input type="submit" value="送信">';
addpincontents += "</div>";
addpincontents += "</form>";
addpincontents += "</div>";

var options = {
  height: "100%",
  position: "topright",
  menuposition: "topright",
  changeperc: "10",
  delay: 20,
};
L.control.slideMenu(addpincontents, "addpinbtn", options).addTo(map);

// ファイル
$(function () {
  $("#calculator .element input[type=number]").change(function () {
    if ($("#calculator .element input[type=number]").val() == 0) {
      $(".section-product-detail__btn-cart").addClass("active");
    } else {
      $(".section-product-detail__btn-cart").removeClass("active");
    }
  });
});

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

$("input").change(function () {
  var file01 = $('#fileinput[data-identifier="file_upload01"]')[0].files[0];
  var file02 = $('#fileinput[data-identifier="file_upload02"]')[0].files[0];
  $("#fileName01").html(file01.name + " (" + bytesToSize(file01.size) + ")");
  $("#fileName02").html(file02.name + " (" + bytesToSize(file02.size) + ")");
});

//サイドバーの各要素を選択必須にする
function requiredRadio() {
  var locationInput = document.getElementsByName("location")[0];
  var contentInput = document.getElementsByName("content")[0];
  var fileInput = document.getElementById("fileinput");
  var pinTypes = document.getElementsByName("pinType");
  var tagTypes = document.getElementsByName("tagType");

  var pinSelected = false;
  var tagSelected = false;

  if (locationInput.value.trim() === "") {
    //無入力・空白の場合
    swal({
      title: "場所名を入力してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  if (contentInput.value.trim() === "") {
    //無入力・空白の場合
    swal({
      title: "コンテンツの名前を入力してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    swal({
      title: "位置情報付きの画像を選択してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }
  //ラジオボタンの選択確認
  for (var i = 0; i < pinTypes.length; i++) {
    if (pinTypes[i].checked) {
      pinSelected = true;
      break;
    }
  }

  for (var i = 0; i < tagTypes.length; i++) {
    if (tagTypes[i].checked) {
      tagSelected = true;
      break;
    }
  }

  if (!pinSelected) {
    swal({
      title: "ピンの種類を選択してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  if (!tagSelected) {
    swal({
      title: "タグを選択してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  return true;
}
//ファイル名を保存
document.getElementById("fileinput").addEventListener("change", function () {
  var uploadedFileNameElement = document.getElementById("uploadedFileName");
  var fileName = this.files[0].name;
  uploadedFileNameElement.textContent = "ファイル名: " + fileName;
});

/* ヘルプバー */
// 開閉アニメーション
const ANIMATION_TIME = 300;
const OFFSET_TIME = 20;

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".details");
  accordions.forEach((accordion) => {
    let isAnimating = false; // アニメーション中かどうかを示すフラグ

    const title = accordion.querySelector(".summary");
    const content = accordion.querySelector(".details-content");

    // タイトルのクリックイベント
    title.addEventListener("click", (e) => {
      e.preventDefault();

      // アニメーション中はクリックイベントを受け付けない（連打防止）
      if (isAnimating) return;

      // オープン処理
      if (!accordion.open) {
        isAnimating = true;
        accordion.open = true;
        const contentHeight = content.offsetHeight;
        content.style.maxHeight = 0;

        setTimeout(() => {
          content.style.maxHeight = `${contentHeight}px`;
          accordion.classList.add("is-open");

          // アニメーション完了後にリセット
          setTimeout(() => {
            content.removeAttribute("style");
            isAnimating = false;
          }, ANIMATION_TIME);
        }, OFFSET_TIME);

        // クローズ処理
      } else if (accordion.open) {
        const contentHeight = content.offsetHeight;
        content.style.maxHeight = `${contentHeight}px`;
        setTimeout(() => {
          content.style.maxHeight = 0;
          accordion.classList.remove("is-open");

          // アニメーション完了後にリセット
          setTimeout(() => {
            content.removeAttribute("style");
            accordion.open = false;
          }, ANIMATION_TIME);
        }, OFFSET_TIME);
      }
    });

    // open属性とis-openクラスを同期
    function syncOpenState() {
      const hasOpenClass = accordion.classList.contains("is-open");
      if (accordion.open && !hasOpenClass) {
        accordion.classList.add("is-open");
      } else if (!accordion.open && hasOpenClass) {
        accordion.classList.remove("is-open");
      }
    }

    // 初期状態でオープン状態を同期
    syncOpenState();
    // ページ内検索で自動開閉した際に同期
    accordion.addEventListener("toggle", () => {
      setTimeout(() => {
        syncOpenState();
      }, OFFSET_TIME);
    });
  });
});

var helpheader = '<h1 class="help-header">ヘルプ</h1>';
var helpcontents = '<div class="wrapper">';
helpcontents += '<details class="details">';
helpcontents += '<summary class="summary">地図の操作方法</summary>';
helpcontents += '<div class="details-content">';
helpcontents += '<p class="bold"><移動></p>';
helpcontents += "<p>PC：ドラッグ / 矢印キー<br>スマホ：スワイプ</p>";

helpcontents += '<p class="bold"><ズーム></p>';
helpcontents +=
  "<p>PC：スクロール / ＋－ボタン<br>スマホ：2本指スワイプ / ＋－ボタン</p>";
helpcontents += '<p class="bold"><検索></p>';
helpcontents +=
  "<p>1) 検索タブに調べたい地名を入力<br>2) Enterまたは虫眼鏡ボタンを押す</p>";
helpcontents += '<p class="bold"><ピンの情報表示></p>';
helpcontents += "<p>説明を見たいピンを押す</p>";
helpcontents += '<p class="bold"><ピンの追加></p>';
helpcontents +=
  "<p>1) ハンバーガーメニューを押す<br>2) ＋ボタンを押す<br>3) 内容を入力して送信<br>詳細は「ピン追加方法」にあります</p>";
helpcontents += '<p class="bold"><絞り込み></p>';
helpcontents += "<p>※リリース版限定機能です！</p>";
helpcontents += "</div>";
helpcontents += "</details>";

helpcontents += '<details class="details">';
helpcontents += '<summary class="summary">ピン追加方法</summary>';
helpcontents += '<div class="details-content">';
helpcontents +=
  "<p>1) 場所名、コンテンツ(作品名)を入力<br>2) 位置情報の含まれた画像をアップロード<br>    ※ファイル形式：jpgのみ<br>3) ピンとタグを1つずつ選ぶ<br>4) 任意で説明など備考を入力<br>5) 送信ボタンを押して追加する</p>";
helpcontents += "</div>";
helpcontents += "</details>";

helpcontents += '<details class="details">';
helpcontents += '<summary class="summary">ピンの種類</summary>';
helpcontents += '<div class="details-content">';
helpcontents += '<p class="bold"><オシキー></p>';
helpcontents +=
  "<p>推しグッズを飾っているなど推し活を促進している場所<br>(実質その他)</p>";
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/oshikey.png" alt="オシキー" /></div>';
helpcontents += '<p class="bold"><グッズ></p>';
helpcontents += "<p>アニ〇イトなどグッズを買える場所</p>";
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/goods.png" alt="グッズ" /></div>';
helpcontents += '<p class="bold"><聖地></p>';
helpcontents += "<p>巡礼場所</p>";
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/place.png" alt="聖地" /></div>';
helpcontents += "</div>";
helpcontents += "</details>";

helpcontents += '<details class="details">';
helpcontents += '<summary class="summary">タグの種類</summary>';
helpcontents += '<div class="details-content">';
helpcontents += '<p class="bold"><アニメ></p>';
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/anime.png" alt="アニメ" /></div>';
helpcontents += '<p class="bold"><マンガ></p>';
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/manga.png" alt="漫画" /></div>';
helpcontents += '<p class="bold"><小説></p>';
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/novel.png" alt="小説" /></div>';
helpcontents += '<p class="bold"><映画></p>';
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/film.png" alt="映画" /></div>';
helpcontents += '<p class="bold"><ドラマ></p>';
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/drama.png" alt="ドラマ" /></div>';
helpcontents += '<p class="bold"><その他></p>';
helpcontents += "<p>音楽、有名人などはこのタグに含まれます</p>";
helpcontents +=
  '<div class="help-img-wrap"><img class="help-pin" src="../static/ico/other.png" alt="その他" /></div>';
helpcontents += "</div>";
helpcontents += "</details>";
helpcontents += "</div>";

// SlideMenu
var options = {
  width: "40%",
  height: "100%",
  position: "topright",
  menuposition: "topright",
  changeperc: "10",
  delay: 20,
};
L.control.slideMenu(helpheader + helpcontents, "helpbtn", options).addTo(map);

/* 絞り込みバー */
var sortheader = '<h1 class="sort-header">ピンの絞り込み</h1>';
var sortcontents =
  '<p class="large">表示したいものを選択してください<br>未選択の場合は全てのピンが表示されます</p>';
sortcontents += '<div class="sort-select">';
sortcontents += '<p class="bold sort-p">ピン選択</p>';
sortcontents += '<div class="img-wrapper sort-pin">';
sortcontents +=
  '<input id="sort-oshikey" type="checkbox" value="../static/ico/oshikey.png" name="sortPin">';
sortcontents +=
  '<label for="sort-oshikey"><img src="../static/ico/oshikey.png" alt="オシキー"></label>';
sortcontents +=
  '<input id="sort-goods" type="checkbox" value="../static/ico/goods.png" name="sortPin">';
sortcontents +=
  '<label for="sort-goods"><img src="../static/ico/goods.png" alt="グッズ"></label>';
sortcontents +=
  '<input id="sort-place" type="checkbox" value="../static/ico/place.png" name="sortPin">';
sortcontents +=
  '<label for="sort-place"><img src="../static/ico/place.png" alt="聖地"></label>';
sortcontents += "</div>";

sortcontents += '<p class="bold sort-p"><br>タグ選択</p>';
sortcontents += '<div class="img-wrapper sort-tag">';
sortcontents +=
  '<input id="sort-anime" type="checkbox" value="../static/ico/anime.png" name="sortTag">';
sortcontents +=
  '<label for="sort-anime"><img src="../static/ico/anime.png" alt="アニメ"></label>';
sortcontents +=
  '<input id="sort-manga" type="checkbox" value="../static/ico/manga.png" name="sortTag">';
sortcontents +=
  '<label for="sort-manga"><img src="../static/ico/manga.png" alt="漫画"></label>';
sortcontents +=
  '<input id="sort-novel" type="checkbox" value="../static/ico/novel.png" name="sortTag">';
sortcontents +=
  '<label for="sort-novel"><img src="../static/ico/novel.png" alt="小説"></label>';
sortcontents +=
  '<input id="sort-film" type="checkbox" value="../static/ico/film.png" name="sortTag">';
sortcontents +=
  '<label for="sort-film"><img src="../static/ico/film.png" alt="映画"></label>';
sortcontents +=
  '<input id="sort-drama" type="checkbox" value="../static/ico/drama.png" name="sortTag">';
sortcontents +=
  '<label for="sort-drama"><img src="../static/ico/drama.png" alt="ドラマ"></label>';
sortcontents +=
  '<input id="sort-other" type="checkbox" value="../static/ico/other.png" name="sortTag">';
sortcontents +=
  '<label for="sort-other"><img src="../static/ico/other.png" alt="その他"></label>';
sortcontents += "</div>";
sortcontents += "</div>";
sortcontents += '<div class="sort-release">すべての選択を解除</div>';
L.control.slideMenu(sortheader + sortcontents, "sortbtn", options).addTo(map);
