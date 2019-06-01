import { LightningElement } from 'lwc';

export default class CarContainer extends LightningElement {

    filterCars(event) {
        this.template.querySelector('c-cars-list').loadCars(event.detail.carType, event.detail.minPrice, event.detail.maxPrice);
    }

}