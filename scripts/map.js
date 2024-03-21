let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.755864, 37.617698],
   zoom: 14,
   controls: [],
 });
 
 let coords = [
     [55.748990, 37.609955],
     [55.766157, 37.634739],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/marker.svg',
     iconImageSize: [58, 73],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);