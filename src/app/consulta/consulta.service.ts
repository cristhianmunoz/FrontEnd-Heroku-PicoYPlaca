import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/api/consulta';

  constructor(private http: HttpClient) { }

  async realizarConsulta(placa: string, fecha: string) {
    let message =""

    axios.post('http://localhost:8080/api/consulta', {
      placa: placa,
      fecha: fecha
    })
      .then(response => {
        // Imprime la respuesta en la consola
        console.log(response.data);
        message= String(response.data);
        alert(message)

      })
      .catch(error => {
        console.error(error); // Imprime el error en la consola
      });

    return message;
  }
}
