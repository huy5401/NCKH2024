import { Modal, Typography, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './style.scss'
import HackerPNG from '../../../assets/images/png/Hacker_2.png'
import { LogsApi } from '../../../apis/log';

type AttackerMap = {
    ip?: string,
    latitude?: string,
    longitude?: string,
    city?: string | null,
    country?: string
}

export const AttackedAllMap = () => {
    const [attackersMap, setAttackersMap] = useState<AttackerMap[]>([])
    const customIcon = new Icon({
        iconUrl: HackerPNG,
        iconSize: [38, 38]
    })
    const fetchAttackersMap = async () => {
        try {
            const res = await LogsApi.getAllAttackersMap();
            if (res.status === 200) setAttackersMap(res.data);
            else message.error("Get attackers map failed");

        } catch (error) {
            message.error("Get attackers map failed");
        }
    }
    useEffect(() => {
        fetchAttackersMap();
    }, [])

    return (
        <div className='attackedMap-wrapper'>
            {
                attackersMap?.length === 0 ? <>There were no attacks</> : <MapContainer
                center={[Number(attackersMap[0].latitude), Number(attackersMap[0].longitude)]}
                zoom={10}
                scrollWheelZoom={true}
            >
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    attackersMap.map((item, index) => (
                        <Marker position={[Number(item.latitude) || 0, Number(item.longitude) || 0]} icon={customIcon} key={index}>
                            <Popup>
                                <div>
                                    <strong>IP:</strong> {item.ip}<br />
                                    <strong>City:</strong> {item.city}<br />
                                    <strong>Country:</strong> {item.country}
                                </div>
                            </Popup>
                        </Marker>
                    ))
                }

            </MapContainer>
            }

        </div>

    )
}
