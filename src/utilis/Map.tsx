import { MapContainer, TileLayer, useMapEvent, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import  coordinateDTO  from "./coordinateDTO.model";
import { useState } from "react";

let defaultIcon=L.icon({
    iconUrl:icon,
    shadowUrl:iconShadow,
    iconAnchor:[16,37]

});
L.Marker.prototype.options.icon=defaultIcon;

export default function Map(props:mapProps){
    const[coordinates,setCoordinates]=useState<coordinateDTO[]>(props.coordinates);
    return(
        <MapContainer
        center={[42.657224,21.162354]} zoom={14}
        style={{height:props.height}}>

            <TileLayer attribution="Bmm"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.readonly ? null : <MapClick setCoordinates={coordinates=>{
                setCoordinates([coordinates]);
                props.handleMapClick(coordinates);
            }}/>}
            
            {coordinates.map((coordinate,index) => <Marker key={index} 
            position={[
                coordinate.lat,coordinate.lng]}>
                    {coordinate.name ? <Popup>
                        {coordinate.name}
                    </Popup> : null}
                </Marker>)}
        </MapContainer>
    )
}

interface mapProps{
    height:string;
    coordinates: coordinateDTO[];
    handleMapClick(coordinates : coordinateDTO):void,
    readonly: boolean
}

Map.defaultProps={
    height:'500px',
    handleMapClick: () => {},
    readonly: false
}

function MapClick(props:mapClickProps){
    useMapEvent('click',eventArgs=>{
        props.setCoordinates({lat:eventArgs.latlng.lat,lng:eventArgs.latlng.lng})
    })
    return null;
}

interface mapClickProps{
    setCoordinates(coordinates:coordinateDTO):void;
}