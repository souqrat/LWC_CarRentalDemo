import { LightningElement, wire, api, track } from 'lwc';

import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

import BOOKING_OBJECT from '@salesforce/schema/Booking__c';
import CAR_FIELD from '@salesforce/schema/Booking__c.Car__c';
import CONTACT_FIELD from '@salesforce/schema/Booking__c.Contact__c';
import START_FIELD from '@salesforce/schema/Booking__c.StartDate__c';
import END_FIELD from '@salesforce/schema/Booking__c.EndDate__c';

export default class BookingForm extends LightningElement {
    @api recordId;
    @track carId;
    bookingId;
    @track startDateTime;
    @track endDateTime;
    
    @wire(CurrentPageReference) pageRef;

    handleBookingCreated(event) {
        const evt = new ShowToastEvent({
            title: "Car booked successfully",
            message: "Record ID: "+ event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    connectedCallback() {
        registerListener('carSelected', this.handleSelect, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSelect(carId) {
        this.carId = carId;
    }

    handleStartChange(event) {
        this.startDateTime = event.target.value;
    }

    handleEndChange(event) {
        this.endDateTime = event.target.value;
    }

    createBooking() {
        const fields = {};
        fields[CONTACT_FIELD.fieldApiName] = this.recordId;
        fields[CAR_FIELD.fieldApiName] = this.carId;
        fields[START_FIELD.fieldApiName] = this.startDateTime;
        fields[END_FIELD.fieldApiName] = this.endDateTime;
        
        const recordInput = { apiName: BOOKING_OBJECT.objectApiName, fields };
        
        createRecord(recordInput)
            .then(booking => {
                this.bookingId = booking.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Car booked successfully',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}