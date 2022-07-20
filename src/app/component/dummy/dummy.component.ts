import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
;

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  @Input()
  label = '';

  @Output()
  done = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick():void {
    this.done.emit(`it was ${this.label} that was passed`)
  }

}
