const L = required('../../node_modules/leaflet/dist/leaflet.js');

//init map
var mymap = L.map("mapid").setView([51.116256, 17.038173], 12);
let circle = null;
var info = L.control();
info.update = function (props) {
  this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
      '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
      : 'Hover over a state');
};
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};
info.addTo(mymap);
const onMapClick = e => {

  if (circle != null) {
    mymap.removeLayer(circle);
  }

  circle = L.circle([e.latlng.lat, e.latlng.lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 200,
  }).addTo(mymap);
};

// mymap.on("click", onMapClick);



fetch("./bicycle.json")
  .then(e => e.json())
  .then(e => {
    const icon = L.icon({
      iconUrl: "cycling.png",
      iconSize: [32, 32], // size of the icon
    });
    e.forEach(e => {
      const marker = L.marker([e.szer, e.dl], { icon }).addTo(mymap);
      marker.bindPopup(`<b>Lokalizacja</b><br><p>${e.lok}</p>`);
      marker.on("click", onMapClick);
    });
  });
fetch("./OSIEDLA.geojson")
  .then(r => r.json())
  .then(r => {
      
      bounds = [];
    const list = document.createElement("div"),
      wrapper = document.querySelector(".wrapper__district")
    list.className = "list__district";
    console.log(r.features);

    const highlightFeature = e => {
      const layer = e.target;
      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });
    };
    const resetHighlight = (e) => {
        districts.resetStyle(e.target);
    };
    const zoomToFeature = (e)=> {
        console.log(e)
        mymap.fitBounds(e.target.getBounds());
    }

    const onEachFeature = (feature, layer) => {
        feature.properties.bounds_calculated = layer.getBounds();
        
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    };

    wrapper.appendChild(list);
   var districts = L.geoJSON(r, {
      style: function(feature) {
        const config ={
          weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
        }
        switch (feature.properties.GRUPA) {
          case 1:
            return  Object.assign(config,{ color: "red" });
          case 2:
            return Object.assign(config,{ color: "#6F1D1B" });
          case 3:
            return Object.assign(config,{ color: "#BB9457" });
          case 4:
            return Object.assign(config,{ color: "#432818" });
          case 5:
            return Object.assign(config,{ color: "#99582A" });
          case 6:
            return Object.assign(config,{ color: "#FFE6A7" });
          case 7:
            return Object.assign(config,{ color: "#290B0A" });
          case 8:
            return Object.assign(config,{ color: "#74694C" });
          case 9:
            return Object.assign(config,{ color: "#ECE1D1" });
          case 10:
            return Object.assign(config,{ color: "#8C5027" });
          case 11:
            return Object.assign(config,{ color: "#894644" });
          case 12:
            return Object.assign(config,{ color: "#BE9477" });
          case 13:
            return Object.assign(config,{ color: "#894644" });
          case 14:
            return Object.assign(config,{ color: "#BE9477" });
        }
      },
      onEachFeature: onEachFeature,
    }).addTo(mymap);
    r.features.sort((a,b)=>a.properties.NAZWAOSIED > b.properties.NAZWAOSIED?1:-1).forEach((e,index) => {
      const bounds = e
      list.appendChild(createBtnLayer(e,r, index, districts));  
  });
  
  });

  const createBtnLayer = (e, r,index,districts)=>{
    const lik = document.createElement("button");
    lik.setAttribute('data-id',r.features[index].properties.OBJECTID);

    lik.addEventListener('click',(e)=>{
        if(document.querySelector('.active')){
            document.querySelector('.active').classList.remove('active');
        }
        districts.eachLayer(layer=>{
          console.dir(e.target.dataset.id);
          if(e.target.dataset.id == layer.feature.properties.OBJECTID){
          
               
          }
      })
        
        e.target.classList.add('active');
      mymap.fitBounds(r.features[index].properties.bounds_calculated)          
  },false)
    lik.innerHTML = e.properties.NAZWAOSIED;
    return lik;
  }


  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox.streets",
  }).addTo(mymap);