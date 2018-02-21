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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var mapInfo = document.getElementById("map-details"),
    details = document.querySelector("#map-details"),
    estate = "./DATA/OSIEDLA.geojson",
    maps = document.getElementById('map'),
    groups = "DATA/GRUPY.geojson";
sourceTmp = document.getElementById("template-details"); // temp = Handlebars.compile(sourceTmp);

window.addEventListener("load", function () {
  initMap();
}, false);

var getCentroids = function getCentroids(obj) {// let polyBnds = new google.maps.LatLngBounds(),
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

var initObjMap = function initObjMap(idMap, zoom, center, lat, lng) {
  return {
    idMap: document.getElementById(idMap),
    zoom: zoom,
    center: center,
    lat: lat,
    lng: lng
  };
};

var createMaker = function createMaker() {};

var createLabel = function createLabel() {};

var initMap = function initMap() {
  var objMap = initObjMap('map', 11, position, 51.1267432, 17.063248);
  console.log(initObjMap('map', 11, "position", 51.1267432, 17.063248));
  var position = {
    lat: objMap.lat,
    lng: objMap.lng
  };
  var map = new google.maps.Map(objMap.idMap, {
    zoom: objMap.zoom,
    center: objMap.center
  });
  /*LOAD DATA GEOJSON*/

  map.data.loadGeoJson(groups);
  map.data.loadGeoJson(estate);
  map.data.setStyle(function (elem) {
    // console.log(elem.getProperty('NAZWAOSIED'));
    if (elem.f.GRUPA == undefined) {
      map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {
          strokeWeight: 8
        });
        mapInfo.innerHTML = "Obreb ".concat(event.feature.f.NAZWAOSIED);
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
        strokeWeight: 1 // elem.addListener('mouseover', function(event) {
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
  map.data.addListener('click', function (event) {
    getWiki(event.feature.f.NAZWAOSIED);
  }); //     map.data.addListener('click', function(event) {
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map