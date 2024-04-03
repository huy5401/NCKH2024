import { Modal, Typography, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './style.scss'
import { LogsApi } from '../../../../../apis/log';
import HackerPNG from '../../../../../assets/images/png/Hacker_2.png'

type AttackerMap = {
    ip?: string,
    latitude?: string,
    longitude?: string,
    city?: string | null,
    country?: string
    error?: string
}

type Props = {
    isOpenModal: boolean;
    closeModal: () => void;
    remoteAddr: string;
}
export const AttackerMap: FC<Props> = ({ isOpenModal, closeModal, remoteAddr }) => {
    const [attackerMapDetails, setAttackerMapDetails] = useState<AttackerMap>({});
    const isEmpty = (obj: any) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    const fetcher = async () => {
        try {
            const res = await LogsApi.getAttackMapByIP(remoteAddr);
            if (res.status === 200 && res.data.latitude) setAttackerMapDetails(res.data);
            else {
                message.error(res.data.error);
            }
        } catch (error) {
            message.error("Get attack map fail");
            closeModal();
        }
    }

    useEffect(() => {
        fetcher();
    }, [remoteAddr])

    const customIcon = new Icon({
        iconUrl: HackerPNG,
        iconSize: [38, 38]
    })
    console.log(attackerMapDetails);

    return (
        <div>
            {
                isEmpty(attackerMapDetails) ? <></> : <Modal
                    open={isOpenModal}
                    closable={false}
                    footer={null}
                    onCancel={closeModal}
                    style={{ top: 10, display: "flex", justifyContent: 'center' }}
                    className="modalAttackerMap-wrapper"
                >
                    <Typography className="modalAttackerMap-title">Attacker Map</Typography>
                    <div>
                        <MapContainer
                            center={[Number(attackerMapDetails.latitude) || 0, Number(attackerMapDetails.longitude) || 0]}
                            zoom={13}
                            scrollWheelZoom={true}
                        >
                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[Number(attackerMapDetails.latitude) || 0, Number(attackerMapDetails.longitude) || 0]} icon={customIcon}>
                                <Popup>{remoteAddr}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </Modal>
            }

        </div>
    )
}
