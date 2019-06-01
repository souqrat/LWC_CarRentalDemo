import { LightningElement } from 'lwc';

export default class CarSearch extends LightningElement {
    selectedType = '';
    minPrice = 0;
    maxPrice = 0;
    
    handleSearchClick() {
        this.dispatchEvent(new CustomEvent('searchclick', { detail: {carType: this.selectedType, minPrice: this.minPrice, maxPrice: this.maxPrice} }));
    }

    handleTypeChange(event) {
        this.selectedType = event.target.value;    
    }

    handleMinChange(event) {
        this.minPrice = event.target.value;    
    }

    handleMaxChange(event) {
        this.maxPrice = event.target.value;    
    }

    get carTypes() {
        return [
            {
                label: 'Select a Car Type',
                value: '',
            },
            {
                label: 'Convertible',
                value: 'Convertible',
            },
            {
                label: 'Coupe',
                value: 'Coupe',
            },
            {
                label: 'SUV',
                value: 'SUV',
            },
        ];
    }

}