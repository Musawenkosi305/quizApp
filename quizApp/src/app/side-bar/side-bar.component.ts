import { Component, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @ViewChild('name') nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {

  }

  Play(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }

}


