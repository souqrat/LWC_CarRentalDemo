import { LightningElement, track, api, wire } from 'lwc';
import getAvailableCars from '@salesforce/apex/RentalManagement.getAvailableCars';
import getAllCars from '@salesforce/apex/RentalManagement.getAllCars';

import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class CarsList extends LightningElement {

    @track carsList;
    @track error;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        getAllCars()
        .then(result => {
            this.carsList = result;
        })
        .catch(error => {
            this.error = error;
        });
    }

    handleCarSelected(event) {
        fireEvent(this.pageRef, 'carSelected', event.detail);
    }

    @api loadCars(carType, minPrice, maxPrice) {
        getAvailableCars({carType: carType, minPrice: minPrice , maxPrice: maxPrice})
        .then(result => {
            this.carsList = result;
        })
        .catch(error => {
            this.error = error; 
        });
    }

}