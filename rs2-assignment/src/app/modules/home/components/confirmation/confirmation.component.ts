import {Component, Output, EventEmitter, Input} from '@angular/core'
declare let $:any;
@Component({
    selector: 'confirm-delete',
    templateUrl:'./confirmation.component.html',
    styleUrls:['./confirmation.component.scss']
})

export class DeleteConfirmation {

    @Output() confirm = new EventEmitter<boolean>();
    @Input('item') set item(value){
        if(value){
            this.selectedItem = value;
            $('#confirmationModal').modal('show')
        }
    }
    
    constructor(){}
    selectedItem:any;
    
    confirmRemove(){
        $('#confirmationModal').modal('hide')
        this.confirm.emit(true)
    }

    cancelRemove(){
        this.confirm.emit(false)
    }

}