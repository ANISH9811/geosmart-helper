import L from "leaflet";

export const defaultIcon = new L.Icon({
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconSize: [25,41],
    iconAnchor:[12,41]
});

export const selectedIcon = new L.Icon({
    iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:"/leaflet/marker-shadow.png",
    iconSize:[25,41],
    iconAnchor:[12,41]
});

export const nearbyIcon = new L.Icon({
    iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:"/leaflet/marker-shadow.png",
    iconSize:[25,41],
    iconAnchor:[12,41]
});