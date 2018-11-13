/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mapInfo = document.getElementById("map-details"),
    details = document.querySelector("#map-details"),
    estate = "./DATA/OSIEDLA.geojson",
    groups = "DATA/GRUPY.geojson",
    maps = document.getElementById('map'),
    sourceTmp = document.getElementById("template-details").innerHTML,
    temp = Handlebars.compile(sourceTmp);

window.addEventListener("load", function () {
    var mapO = initObjMap('map', 11, 51.1267432, 17.063248);
    initMap(mapO, estate, groups);
}, false);

var getCentroids = function getCentroids(obj) {
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
};
var initObjMap = function initObjMap(idMap, zoom, lat, lng) {
    return {
        idMap: document.getElementById(idMap),
        zoom: zoom,
        lat: lat,
        lng: lng
    };
};
var createMaker = function createMaker() {};
var createLabel = function createLabel() {};
var loadJson = function loadJson() {
    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
    }

    data.forEach(function (element, index) {
        return map.data.loadGeoJson(element);
    });
};

var initMap = function initMap(objMap) {
    for (var _len2 = arguments.length, geo = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        geo[_key2 - 1] = arguments[_key2];
    }

    var position = { lat: objMap.lat, lng: objMap.lng };
    var map = new google.maps.Map(objMap.idMap, {
        zoom: objMap.zoom,
        center: position
    });

    /*LOAD DATA GEOJSON*/
    geo.forEach(function (element) {
        return map.data.loadGeoJson(element);
    });

    map.data.setStyle(function (elem) {
        // console.log(elem.getProperty('NAZWAOSIED'));

        if (elem.f.NAZWAOSIED !== undefined) {

            map.data.addListener('mouseover', function (event) {
                map.data.revertStyle();
                map.data.overrideStyle(event.feature, {
                    strokeWeight: 8,
                    fillColor: "transparent"
                });

                var showObj = {
                    obreb: event.feature.f.NAZWAOSIED,
                    rejon: event.feature.f.GRUPA,
                    area: (event.feature.f.SHAPE_AREA / 1000000).toFixed(2) + " ha",
                    lenth: (event.feature.f.SHAPE_LEN / 100).toFixed(2) + " km"

                };
                var html = temp(showObj);
                mapInfo.innerHTML = html;
            });

            return {
                fillColor: getRandomColor(),
                clickable: true,
                zIndex: 2

            };
        } else {

            return {
                fillColor: 'transparent',
                clickable: false,
                strokeWeight: 1

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


            };
        }
    });

    map.data.addListener('click', function (event) {});

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

};

/*FUNCTIONS*/

var getRandomColor = function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/***/ })

/******/ });
//# sourceMappingURL=google.js.map