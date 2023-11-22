var titleControl = L.control({ position: "topleft" });

titleControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "title-control");
  this.ele.id = "title";
  this.ele.className = "title-Logo";
  this.ele.innerHTML = "<img src='../static/logo/logo2.png' width='20%' height='auto' alt='title_logo'>";
  return this.ele;
};

titleControl.addTo(map);



//検索窓
var option = {
  collapsed: false,
  position: 'topright',
  text: '',
  placeholder: '検索したい地名を入力してください。'
}
var osmGeocoder = new L.Control.OSMGeocoder(option);
map.addControl(osmGeocoder);
// UIの適用
const searchBar = document.getElementsByClassName("leaflet-control-geocoder")[0];
const searchFrom = document.getElementsByClassName("leaflet-control-geocoder-form")[0];
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

/*
var searchBarControl = new L.Control.OSMGeocoder(option);
searchBarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "search-bar-control");
  this.ele.id = "search-bar";
  this.ele.classList.add("search-bar");
  this.ele.innerHTML = "<form id='search-form' action=''><input id='sbox' type='text' placeholder='検索したいキーワードを入力' /><button id='sbtn' type='submit'><i class='fas fa-search'></i></button></form>";
  this.ele.style.zIndex = 999;
  return this.ele;
};

map.addControl(searchBarControl);*/

//サークルメニュー
var circularMenuControl = L.control({ position: "topright" });

circularMenuControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "circular-menu-control");
  this.ele.id = "circularMenu";
  this.ele.className = "circular-menu";
  this.ele.style.zIndex = 1000;

  var floatingBtn = L.DomUtil.create("a", "floating-btn", this.ele);
  floatingBtn.onclick = function () {
    document.getElementById('circularMenu').classList.toggle('active');
  };

  var customIcon = L.DomUtil.create("button", "", floatingBtn);
  customIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';

  var itemsWrapper = L.DomUtil.create("menu", "items-wrapper", this.ele);

  var menuItem1 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem1.onclick = function () {
    opencloseSidebar1();
  };
  menuItem1.innerHTML = '<button><i class="fa-solid fa-plus"></i></button>';

  var menuItem2 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem2.onclick = function () {
    opencloseSidebar2();
  };
  menuItem2.innerHTML = '<button><i class="fa-solid fa-filter"></i></button>';

  var menuItem3 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem3.innerHTML = '<button><i class="fa-solid fa-question"></i></button>';

  return this.ele;
};

circularMenuControl.addTo(map);

// サイドバーコントロール
var sidebarControl = L.control({ position: "topright" });

sidebarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "sidebar-control");
  this.ele.id = "sidebar1";
  this.ele.className = "sidebar";
  this.ele.style.zIndex = 1500;
  this.ele.innerHTML = `
    <a class="closebtn" onclick="opencloseSidebar1()">×</a>
    <form method="POST" enctype="multipart/form-data">
      <p>場所名</p>
      <div class="cp_iptxt">
        <i class="fa-solid fa-location-dot"></i><input class="sidebox" type="text" name="location" placeholder="場所名を入力してね！" />
      </div>
      <p>コンテンツ</p>
      <div class="cp_iptxt">
        <i class="fa-solid fa-tag"></i><input class="sidebox" type="text" name="content" placeholder="コンテンツの名前を入力してね！" />
      </div>
      <p>位置情報付きの写真</p>
      <div id="calculator">
        <div class="element" data-element="file_upload01" data-conditionalelement="undefined"
          data-conditionalelementvalue="undefined"><label style="color:#333333">file_upload01</label><input id="fileinput" class="calc-prop" data-identifier="file_upload01" data-isrequired="false" type="file" name="file">
        </div>
      </div>
      <p>ピンの種類</p>
      <div class="sideimg">
        <input id="pinType1" type="radio" value="oshikey.png" name="pinType">
        <label for="pinType1"><img src="../static/ico/oshikey.png"></label>
        <input id="pinType2" type="radio" value="goods.png" name="pinType">
        <label for="pinType2"><img src="../static/ico/goods.png"></label>
        <input id="pinType3" type="radio" value="place.png" name="pinType">
        <label for="pinType3"><img src="../static/ico/place.png"></label>
      </div>
      <p>タグ</p>
      <div class="sideimg">
        <input id="tagType1" type="radio" value="anime.png" name="tagType">
        <label for="tagType1"><img src="../static/ico/anime.png" alt="アニメ"></label>

        <input id="tagType2" type="radio" value="manga.png" name="tagType">
        <label for="tagType2"><img src="../static/ico/manga.png" alt="漫画"></label>

        <input id="tagType3" type="radio" value="novel.png" name="tagType">
        <label for="tagType3"><img src="../static/ico/novel.png" alt="小説"></label>

        <input id="tagType4" type="radio" value="film.png" name="tagType">
        <label for="tagType4"><img src="../static/ico/film.png" alt="映画"></label>

        <input id="tagType5" type="radio" value="drama.png" name="tagType">
        <label for="tagType5"><img src="../static/ico/drama.png" alt="ドラマ"></label>

        <input id="tagType6" type="radio" value="other.png" name="tagType">
        <label for="tagType6"><img src="../static/ico/other.png" alt="その他"></label>

      </div>
      <div class="remarks">
        <p>備考</p>
        <textarea type="text" name="remarks" placeholder="例：3月末に撤去予定です"></textarea>
        <input type="submit" value="送信">
      </div>
    </form>`;

  return this.ele;
};

sidebarControl.addTo(map);

// 絞り込みサイドバーコントロール
var filterSidebarControl = L.control({ position: "topright" });

filterSidebarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "filter-sidebar-control");
  this.ele.id = "sidebar2";
  this.ele.className = "sidebar";
  this.ele.innerHTML = `
    <a class="closebtn" onclick="opencloseSidebar2()">×</a>
    <p>ピンの種類</p>
    <div class="sideimg">
      <img src="../static/ico/test.png" alt="オシキー" />
      <img src="../static/ico/test.png" alt="グッズ" />
      <img src="../static/ico/test.png" alt="聖地" />
    </div>
    <p>タグ（複数選択可）</p>
    <div class="sideimg">
      <img src="../static/ico/test.png" alt="アニメ" />
      <img src="../static/ico/test.png" alt="漫画" />
      <img src="../static/ico/test.png" alt="小説" />
      <img src="../static/ico/test.png" alt="映画" />
      <img src="../static/ico/test.png" alt="ドラマ" />
      <img src="../static/ico/test.png" alt="その他" />
    </div>
    <div class="remarks">
      <img src="../static/ico/test.png" alt="絞り込み" />
    </div>`;

  this.ele.style.zIndex = 1501;

  return this.ele;
};

filterSidebarControl.addTo(map);



//以下関数
function opencloseSidebar1() {
  $("#sidebar1").slideToggle("");
}

function opencloseSidebar2() {
  $("#sidebar2").slideToggle("");
}

$(function () {
  $('#calculator .element input[type=number]').change(function () {
    if ($('#calculator .element input[type=number]').val() == 0) {
      $('.section-product-detail__btn-cart').addClass('active');
    } else {
      $('.section-product-detail__btn-cart').removeClass('active');
    }
  });
});

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

$('input').change(function () {
  if ($(this).attr('id') != "sbox") {
    var file01 = $('#fileinput[data-identifier="file_upload01"]')[0].files[0];
    var file02 = $('#fileinput[data-identifier="file_upload02"]')[0].files[0];
    $('#fileName01').html(file01.name + ' (' + bytesToSize(file01.size) + ')');
    $('#fileName02').html(file02.name + ' (' + bytesToSize(file02.size) + ')');
  }
});
