var map = L.map('mapid', {
  center: [35.66572, 139.73100],
  zoom: 17,
});

var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});

tileLayer.addTo(map);


// Control OSM Geocoder
var option = {
  position: 'topright',
  text: '検索',
  placeholder: '検索条件を入力してください。'
}
var osmGeocoder = new L.Control.OSMGeocoder(option);
map.addControl(osmGeocoder);


var features = [];

var place = [];

//alert(POSES[0]["lat"])
for (var i = 0; i < POSES.length; i++) {
  place.push({ "lat": String(POSES[i]["lat"]), "long": String(POSES[i]["long"]) })
}

var PincIco = L.icon({
  iconUrl: '../static/ico/pinkpin.png',
  iconRetinaUrl: '../static/ico/pinkpin.png',
  iconSize: [40, 60],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

// GeoJSON形式で複数個のマーカーを設定する
for (var i = 0; i < place.length; i++) {
  features.push({
    "type": "Feature",
    "properties": {
      "icon": PincIco
      //"name": place[i].name
    },
    "geometry": {
      "type": "Point",
      "coordinates": [place[i].long, place[i].lat]
    }
  });
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
