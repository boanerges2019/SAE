import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'header-tab',
    templateUrl: './header-tab.component.html',
    styleUrls: ['./header-tab.component.scss']
})
export class HeaderTabComponent implements OnInit {
    
    @Input() title: string;
    
    constructor() { }    
    
    ngOnInit() {
        
    }
    
}
