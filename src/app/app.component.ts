import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Formio, FormioModule, FormioRefreshValue } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { PrismService } from './Prism.service';

// Make sure we use fontawesome everywhere in Form.io renderers.
(Formio as any).icons = 'fontawesome';

@Component({
  selector: 'app-root',
  imports: [FormioModule,
    FormioGrid,],
  providers: [PrismService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('json', { static: true }) jsonElement?: ElementRef;
  @ViewChild('code', { static: true }) codeElement?: ElementRef;
  public form: Object;
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();
  constructor(public prism: PrismService) {
    this.form = { components: [] };
  }

  onChange(event: any) {
    if (this.jsonElement && this.jsonElement.nativeElement) {
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    }

    this.refreshForm.emit({
      property: 'form',
      value: event.form
    });
    this.test(event.form)
  }


  ngAfterViewInit() {
    this.prism.init();
  }


  test(form:any) {
    console.log("WORK kar gya bhai", form)
  }
}
