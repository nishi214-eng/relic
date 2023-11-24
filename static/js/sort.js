$(function () {
  var box = $(".leaflet-marker-icon"); //検索対象のDOMを格納する
  var conditions = $(".img-wrapper"); //現在の条件の選択状況を保持するオブジェクト
  var findConditions; //各data-typeの子要素(input)を格納する
  var findConditionsAll; //全てのinputを格納する
  var currentType; //現在のdata-typeを示す
  var count = 0; //検索ヒット数
  var checkcount = 0; //各data-typeのチェックボックス選択数
  var checktotal = 0; //全体のチェックボックス選択合計数
  var data_check = 0; //対象項目のデータがどれだけチェック状態と一致しているか

  var condition = {}; //チェックボックスの入力状態を保持するオブジェクト

  for (var i = 0; i < conditions.length; i++) {
    var classes = conditions[i].getAttribute("class").split(" ");
    currentType = classes[classes.length - 1];
    condition[currentType] = [];
  }

  function setConditions() {
    //条件設定
    count = 0;
    box.removeClass("js_selected");

    //チェックボックス全体の選択合計数を記憶
    findConditionsAll = document.querySelectorAll(".sort-select input");
    for (var i = 0; i < findConditionsAll.length; i++) {
      if (findConditionsAll[i].checked) {
        checktotal++;
      }
    }

    for (var i = 0; i < conditions.length; i++) {
      var classes = conditions[i].getAttribute("class").split(" ");
      currentType = classes[classes.length - 1];

      findConditions = conditions[i].querySelectorAll("input");

      for (var n = 0; n < findConditions.length; n++) {
        //inputごとの処理
        //inputの選択合計数が０でなかったら処理を続行
        if (checktotal !== 0) {
          if (findConditions[n].checked) {
            //現在選択中のインプットが選択されている場合
            condition[currentType][findConditions[n].value] = true;
            checkcount++;
          } else {
            condition[currentType][findConditions[n].value] = false;
          }
          if (findConditions.length === n + 1) {
            checkcount = 0;
          }
        } else {
          condition[currentType][findConditions[n].value] = false;
        }
      }
    }

    for (var m = 0, len = box.length; m < len; ++m) {
      //最初に取得したターゲットの情報と、現在のinputの選択状態を比較して処理を行う

      for (var i = 0; i < conditions.length; i++) {
        //ターゲットのdata-typeを参照し、メソッドとしてconditionに個別に代入する
        classes = conditions[i].getAttribute("class").split(" ");
        currentType = classes[classes.length - 1];

        var currentBoxPin = $(box[m]).attr("src");
        classes = $(box[m]).attr("class").split(" ");
        var currentBoxTag =
          "../static/ico/" +
          classes.find(function (className) {
            return className.includes("png");
          });
        var pinKey = condition["sort-pin"];
        var tagKey = condition["sort-tag"];
        if (pinKey[currentBoxPin] || tagKey[currentBoxTag]) {
          data_check++;
          break;
        }
      }

      if (data_check >= 1) {
        $(box[m]).addClass("js_selected");
      } else if (checktotal === 0) {
        $(box[m]).addClass("js_selected");
      } else {
        $(box[m]).removeClass("js_selected");
      }
      data_check = 0;
    }
    checktotal = 0;
  }

  setConditions();

  $(document).on("click", "input", function () {
    setConditions();
  });

  $(document).on("click", ".sort-release", function () {
    $(".img-wrapper input").each(function () {
      $(this).prop("checked", false);
    });
    setConditions();
  });
});
