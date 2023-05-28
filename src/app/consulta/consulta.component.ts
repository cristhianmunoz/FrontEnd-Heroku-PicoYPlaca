import {Component, ViewChild} from '@angular/core';
import { ConsultaService } from './consulta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from "axios";

interface ConsultaResponse {
  status: string;
  message: string;
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  placa: string = '';
  fecha: string = '';
  resultado: string = '';

  @ViewChild('modalContent') modalContent: any;

  formulario: FormGroup;

  constructor(private consultaService: ConsultaService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)]],
      fecha: ['', Validators.required]
    });
  }

  openModal() {
    this.modalService.open(this.modalContent);
  }
  openModal2(content:any) {
    this.modalService.open(content);
  }

  closeModal(modal: any) {
    modal.dismiss('Cross click');
  }

  limpiarFormulario() {
    // Restablecer los valores del formulario a su estado inicial
    this.placa = '';
    this.fecha = '';
  }

  submitForm() {
    // Validación de la fecha
    const fechaActual = new Date();
    const fechaIngresada = new Date(this.fecha);

    //Notificación si la fecha es de días anteriores
    if (fechaIngresada < fechaActual) {
      alert('La fecha ingresada debe ser igual o posterior a la fecha actual.');
      return;
    }

    //Declaramos la variable en la que va a guardar el mensaje
    var message;

    // Envío de la solicitud al backend utilizando Axios
    axios.post('http://localhost:8080/api/consulta', {
      placa: this.placa,
      fecha: this.fecha
    })
      .then(response => {
        // Imprime la respuesta en la consola
        console.log(response.data);
        message= String(response.data);
        this.resultado=message;

        this.openModal();

      })
      .catch(error => {
        console.error(error); // Imprime el error en la consola
        this.openModal2(error)
      });


  }
}
