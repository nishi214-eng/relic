var titleControl = L.control({ position: "topleft" });

titleControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "title-control");
  this.ele.id = "title";
  this.ele.className = "title-Logo";
  this.ele.innerHTML = "<img src='../static/logo/220_20220326204201.png' width='20%' height='auto' alt='title_logo'>";
  return this.ele;
};

titleControl.addTo(map);



//検索窓
var searchBarControl = L.control({ position: "topright" });

searchBarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "search-bar-control");
  this.ele.id = "search-bar";
  this.ele.className = "search-bar";
  this.ele.innerHTML = "<form id='search-form' action=''><input id='sbox' type='text' placeholder='検索したいキーワードを入力' /><button id='sbtn' type='submit'><i class='fas fa-search'></i></button></form>";
  this.ele.style.zIndex = 999;
  return this.ele;
};

searchBarControl.addTo(map);

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
    <p>場所名</p>
    <div class="cp_iptxt">
      <i class="fa-solid fa-location-dot"></i><input class="sidebox" type="text" placeholder="場所名を入力してね！" />
    </div>
    <p>コンテンツ</p>
    <div class="cp_iptxt">
      <i class="fa-solid fa-tag"></i><input class="sidebox" type="text" placeholder="コンテンツの名前を入力してね！" />
    </div>
    <p>位置情報付きの写真</p>
    <div id="calculator">
      <div class="element" data-element="file_upload01" data-conditionalelement="undefined"
        data-conditionalelementvalue="undefined"><label style="color:#333333">file_upload01</label><input id="fileinput"
          class="calc-prop" data-identifier="file_upload01" data-isrequired="false" type="file"
          name="properties[file_upload01]">
      </div>
    </div>
    <p>ピンの種類</p>
    <div class="sideimg">
      <img src="../static/ico/oshikey.png" alt="オシキー" />
      <img src="../static/ico/goods.png" alt="グッズ" />
      <img src="../static/ico/place.png" alt="聖地" />
    </div>
    <p>タグ</p>
    <div class="sideimg">
      <img src="../static/ico/anime.png" alt="アニメ" />
      <img src="../static/ico/manga.png" alt="漫画" />
      <img src="../static/ico/test.png" alt="小説" />
      <img src="../static/ico/test.png" alt="映画" />
      <img src="../static/ico/test.png" alt="ドラマ" />
      <img src="../static/ico/test.png" alt="その他" />
    </div>
    <div class="remarks">
      <p>備考</p>
      <textarea type="text" placeholder="例：3月末に撤去予定です"></textarea>
      <img src="../static/ico/test.png" alt="アニメ" />
    </div>`;

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
  var file01 = $('#fileinput[data-identifier="file_upload01"]')[0].files[0];
  var file02 = $('#fileinput[data-identifier="file_upload02"]')[0].files[0];
  $('#fileName01').html(file01.name + ' (' + bytesToSize(file01.size) + ')');
  $('#fileName02').html(file02.name + ' (' + bytesToSize(file02.size) + ')');
});
