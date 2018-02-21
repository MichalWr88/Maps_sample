const mapInfo = document.getElementById("map-details"),
    details = document.querySelector("#map-details"),
    estate = "./DATA/OSIEDLA.geojson",
    groups = "DATA/GRUPY.geojson",
    maps = document.getElementById('map'),
sourceTmp = document.getElementById("template-details").innerHTML,
temp = Handlebars.compile(sourceTmp);





window.addEventListener("load", () => {
    const mapO = initObjMap('map', 11, 51.1267432, 17.063248);
    initMap(mapO,estate,groups);



}, false);

const getCentroids = (obj) => {
    // let polyBnds = new google.maps.LatLngBounds(),
    //     bounds = [];
    // elem.getGeometry().forEachLatLng(function(path) {
    //     bounds.push(path);
    //     polyBnds.extend(path);
    // });
    // let area = google.maps.geometry.spherical.computeArea(bounds);
    //  iW = new google.maps.InfoWindow({
    //   content: `GRUPA: ${elem.getProperty('GRUPA')}`,
    //   position: polyBnds.getCenter()
    // });
    // let iW = new google.maps.Marker({
    //     map: map,
    //     title: `OBREB: ${elem.getProperty('NAZWAOSIED')}`,
    //     position: polyBnds.getCenter(),

    // });

    // iW.open(map);
    // let bounds = elem.getGeometry();
}
const initObjMap = (idMap, zoom, lat, lng) => {
    return {
        idMap: document.getElementById(idMap),
        zoom,
        lat,
        lng,
    }

}
const createMaker = () => {}
const createLabel = () => {}
const loadJson = (...data) => {
data.forEach( (element, index)=> {
    return map.data.loadGeoJson(element)
});

}

const initMap = (objMap,...geo) => {

    var position = { lat: objMap.lat, lng: objMap.lng };
    var map = new google.maps.Map(objMap.idMap, {
        zoom: objMap.zoom,
        center: position
    });

    /*LOAD DATA GEOJSON*/
 geo.forEach( element=> map.data.loadGeoJson(element));
    

    map.data.setStyle((elem) => {
        // console.log(elem.getProperty('NAZWAOSIED'));

        if (elem.f.NAZWAOSIED !== undefined) {

            map.data.addListener('mouseover', function(event) {
                map.data.revertStyle();
                map.data.overrideStyle(event.feature, { 
                    strokeWeight: 8,
                    fillColor: "transparent"
                 });

                const showObj ={
                    obreb: event.feature.f.NAZWAOSIED,
                    rejon: event.feature.f.GRUPA,
                    area:(event.feature.f.SHAPE_AREA/1000000).toFixed(2) + " ha",
                    lenth:(event.feature.f.SHAPE_LEN/100).toFixed(2) + " km"

                }
                const html = temp(showObj);
                mapInfo.innerHTML = html;

            });


            return {
                fillColor: getRandomColor(),
                clickable: true,
                zIndex: 2,


            }
        } else {

            return {
                fillColor: 'transparent',
                clickable: false,
                strokeWeight: 1,

            }

            // elem.addListener('mouseover', function(event) {
            //     elem.revertStyle();
            //     // elem.overrideStyle(event.feature, { strokeWeight: 8 });
            //     // mapInfo.innerHTML = event.feature.f.NAZWAOSIED;

            // });
            // elem.addListener('mouseout', function(event) {
            //     // elem.revertStyle();
            //     elem.overrideStyle(event.feature, { strokeWeight: 1 });
            //     // mapInfo.innerHTML = event.feature.f.NAZWAOSIED;

            // });


        }


    });

    map.data.addListener('click', function(event) {
        
    });


    //     map.data.addListener('click', function(event) {
    //         if(event.feature.f.GRUPA !== 1){
    // console.log(event.feature.f);
    //         }
    //     });

    // });
    // 
    // 
    /*GRUPY*/
    // let grupy = map.data.loadGeoJson('grupa1.geojson');
    //     grupy.setStyle((elem) => {      
    //        return {
    //            fillColor: 'red',
    //            clickable: true,
    //        }
    //    });



}




/*FUNCTIONS*/

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}