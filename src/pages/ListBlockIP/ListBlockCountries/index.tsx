import { Card, message, Transfer } from 'antd';
import React, { useState } from 'react';
import CardTitleCustom from '../../../components/CardTitleCustom';
import countryData from 'country-data';
import './style.scss'
import { useGetAllBlockedCoutries } from '../../../utils/request/useGetAllBlockedCountries';
import { RuleApi } from '../../../apis/rule';
type Country = {
    key:string,
    title:string
}
const ListBlockCountries = () => {
    // const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const {data, isLoading, error, mutate} = useGetAllBlockedCoutries();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const countries: Country[] = countryData.countries.all.map((country) => ({
        key: country.alpha2,
        title: country.name,
    }));

    const handleChange = async (nextTargetKeys: string[]) => {
        const dataChange = selectedKeys;
        if(nextTargetKeys.length > data.data.length){
            const resAdd = await RuleApi.addGeoBlockedIP(dataChange);
            if(resAdd.status === 200){
                mutate();
                message.success("Added countries successfully");
            }else message.error("Added countries failed");
        }else{
            const resRemove = await RuleApi.removeGeoBlockedIP(dataChange);
            if(resRemove.status === 200){
                mutate();
                message.success("Removed countries successfully");
            }else message.error("Removed countries failed");
        }
    };

    const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const handleSearch = (direction: 'left' | 'right', value: string) => {
        setSearchValue(value);
    };

    const filterOption = (inputValue: string, option: Country) =>
        option.title.indexOf(inputValue) > -1;
    
    return (
        <div style={{marginTop: "10px"}}>
            <Card className="card-container" size="small">
                <CardTitleCustom title="List Blocked Countries" />
                <Transfer
                    dataSource={countries}
                    titles={['Countries', 'Blocked countries']}
                    targetKeys={data ? data.data : []}
                    selectedKeys={selectedKeys}
                    filterOption={filterOption}
                    onChange={handleChange}
                    onSelectChange={handleSelectChange}
                    onSearch={handleSearch}
                    showSearch={true}
                    render={item => item.title}
                    className='countryBlock-transfer'
                />
            </Card>
        </div>
    )
}

export default ListBlockCountries