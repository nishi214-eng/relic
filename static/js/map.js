var map = L.map('mapid', {
  center: [35.66572, 139.73100],
  zoom: 17,
  scrollWheelZoom: false,
  smoothWheelZoom: true,
  smoothSensitivity: 1,
});

var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});

tileLayer.addTo(map);

// 縮尺表示
L.control.scale().addTo(map);

var features = [];

var place = [];

//alert(POSES[0]["lat"])
for (var i = 0; i < POSES.length; i++) {
  place.push({ "lat": String(POSES[i]["lat"]), "long": String(POSES[i]["long"]) })
}
//アイコンを
var PincIco = L.icon({
  iconUrl: '../static/ico/${selectedPinType}.png',
  iconRetinaUrl: '../static/ico/${selectedPinType}.png',
  iconSize: [40, 60],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

// GeoJSON形式で複数個のマーカーを設定する
for (var i = 0; i < place.length; i++) {
  features.push({
    "type": "Feature",
    "properties": {
      "icon": getPinIcon(POSES[i]["pinType"]),
      //"name": place[i].name
    },
    "geometry": {
      "type": "Point",
      "coordinates": [place[i].long, place[i].lat]
    }
  });
}

function getPinIcon(pinType) {
  // ピンタイプに基づいてアイコンのURLを返す
  if (pinType === 'oshikey.png') {
    return L.icon({
      iconUrl: '../static/ico/oshikey.png',
      iconRetinaUrl: '../static/ico/oshikey.png',
      iconSize: [73.7, 135],
      iconAnchor: [36.85, 135],
      popupAnchor: [0, -150],
    });
  } else if (pinType === 'goods.png') {
    return L.icon({
      iconUrl: '../static/ico/goods.png',
      iconRetinaUrl: '../static/ico/goods.png',
      iconSize: [73.7, 135],
      iconAnchor: [36.85, 135],
      popupAnchor: [0, -150],
    });
  } else if (pinType === 'place.png') {
    return L.icon({
      iconUrl: '../static/ico/place.png',
      iconRetinaUrl: '../static/ico/place.png',
      iconSize: [73.7, 135],
      iconAnchor: [36.85, 135],
      popupAnchor: [0, -150],
    });
  }
}

L.geoJson(features, {
  onEachFeature: function (features, layer) {
    if (features.properties && features.properties.name) {
      layer.bindPopup(features.properties.name);
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
      layer.on('click', function (e) {
        alert('ここにゴミ捨てるの?');
      });
    }
  },
  // アイコンの指定があれば指定したアイコンを設置する

  pointToLayer: function (feature, latlng) {
    // アイコンの指定があれば指定したアイコンを設置する
    if (feature.properties.icon) {
      //alert(1) 1があるためアイコンが指定はされている。
      return L.marker(latlng, { icon: feature.properties.icon });
    } else {
      //alert(2)
      return L.marker(latlng);
    }
  }
}).addTo(map);
