import { LightningElement, api, track } from 'lwc';

export default class CarTile extends LightningElement {
    
    @api car;
    @track selected = '';

    handleSelect(event) {
        event.preventDefault();
        this.selected = 'selected';
        const selectEvent = new CustomEvent('carselect', {
            detail: this.car.Id
        });
        this.dispatchEvent(selectEvent);
    }

}