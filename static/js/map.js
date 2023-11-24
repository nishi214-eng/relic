var map = L.map("mapid", {
  center: [34.226111, 135.1675],
  zoom: 15,
  minZoom: 3,
  maxZoom: 17,
  scrollWheelZoom: false,
  smoothWheelZoom: true,
  smoothSensitivity: 1,
});

var tileLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  }
);

tileLayer.addTo(map);

// 縮尺表示
L.control.scale().addTo(map);

var features = [];
var place = [];

for (var i = 0; i < POSES.length; i++) {
  place.push({ lat: String(POSES[i]["lat"]), long: String(POSES[i]["long"]) });
}
//アイコン追加
var PincIco = L.icon({
  iconUrl: "../static/ico/${selectedPinType}.png",
  iconRetinaUrl: "../static/ico/${selectedPinType}.png",
  iconSize: [40, 60],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

// GeoJSON形式で複数個のマーカーを設定する
for (var i = 0; i < place.length; i++) {
  features.push({
    type: "Feature",
    properties: {
      icon: getPinIcon(POSES[i]["pinType"], POSES[i]["tagType"]),
    },
    geometry: {
      type: "Point",
      coordinates: [place[i].long, place[i].lat],
    },
  });
}

function getPinIcon(pinType, tagType) {
  // ピンタイプに基づいてアイコンのURLを返す
  if (pinType === "oshikey.png") {
    return L.icon({
      iconUrl: "../static/ico/oshikey.png",
      iconRetinaUrl: "../static/ico/oshikey.png",
      iconSize: [73.7, 135],
      iconAnchor: [36.85, 120],
      popupAnchor: [0, -70],
      className: tagType,
    });
  } else if (pinType === "goods.png") {
    return L.icon({
      iconUrl: "../static/ico/goods.png",
      iconRetinaUrl: "../static/ico/goods.png",
      iconSize: [73.7, 135],
      iconAnchor: [36.85, 120],
      popupAnchor: [0, -70],
      className: tagType,
    });
  } else if (pinType === "place.png") {
    return L.icon({
      iconUrl: "../static/ico/place.png",
      iconRetinaUrl: "../static/ico/place.png",
      iconSize: [73.7, 135],
      iconAnchor: [36.85, 120],
      popupAnchor: [0, -70],
      className: tagType,
    });
  }
}
L.geoJson(features, {
  onEachFeature: function (features, layer) {
    layer.bindPopup(function () {
      var poseInfo = POSES.find(
        (p) =>
          p.lat === parseFloat(features.geometry.coordinates[1]) &&
          p.long === parseFloat(features.geometry.coordinates[0])
      );

      // 画像を表示するHTML要素を作成
      var uploadedimage =
        '<img src="../static/img/' +
        poseInfo.filename +
        '" alt="アップロード画像" style="width: 50%; height: auto;">';
      var tagimage =
        '<img class="tagimg" src="../static/ico/' +
        poseInfo.tagType +
        '" alt="タグ" style="width: 50%; height: auto;">';

      // 備考が空または空白文字だけの場合は「無し」を表示
      var remarks = poseInfo.remarks.trim() || "無し";

      return (
        uploadedimage +
        tagimage +
        "<br>" +
        '<p class="br">住所:' +
        poseInfo.address +
        "<br>" +
        '<p class="br">場所名:' +
        poseInfo.location +
        "<br>" +
        "コンテンツ:" +
        poseInfo.content +
        "<br>" +
        "備考:" +
        remarks +
        "</p>"
      );
    });
  },
  pointToLayer: function (feature, latlng) {
    if (feature.properties.icon) {
      return L.marker(latlng, { icon: feature.properties.icon });
    } else {
      return L.marker(latlng);
    }
  },
}).addTo(map);
