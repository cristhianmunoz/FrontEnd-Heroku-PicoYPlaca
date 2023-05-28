import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultaComponent } from './consulta.component';

@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ConsultaComponent
  ]
})
export class ConsultaModule { }
