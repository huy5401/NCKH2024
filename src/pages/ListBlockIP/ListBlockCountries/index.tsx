import { Card, Transfer } from 'antd';
import React, { useState } from 'react';
import CardTitleCustom from '../../../components/CardTitleCustom';
import countryData from 'country-data';
import './style.scss'
type Country = {
    key:string,
    title:string
}
const ListBlockCountries = () => {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const countries: Country[] = countryData.countries.all.map((country) => ({
        key: country.alpha2,
        title: country.name,
    }));

    const handleChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
        console.log("next: ", nextTargetKeys);

    };

    const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
        console.log("selected key: ", selectedKeys);

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
                    targetKeys={targetKeys}
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