import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cesam-pdf-viewer',
  templateUrl: './cesam-pdf-viewer.component.html',
  styleUrls: ['./cesam-pdf-viewer.component.scss']
})
export class CesamPdfViewerComponent implements OnInit, OnChanges {

  @Input() bulletin;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.bulletin = changes.bulletin && changes.bulletin.currentValue  ? changes.bulletin.currentValue : this.bulletin;
  }

}
