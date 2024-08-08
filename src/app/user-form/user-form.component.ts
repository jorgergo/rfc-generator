import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RfcGeneratorService } from '../rfc-generator.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;
  generatedRfc: string = '';

  constructor(
    private fb: FormBuilder,
    private rfcGenerator: RfcGeneratorService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.generatedRfc = this.rfcGenerator.generateRfc(
        formData.name,
        formData.lastName,
        formData.dateOfBirth
      );
      console.log('Generated RFC:', this.generatedRfc);
    }
  }

  generatePdf() {
    const doc = new jsPDF();
    const formData = this.userForm.value;

    doc.text('User Information', 10, 10);
    doc.text(`Name: ${formData.name} ${formData.lastName}`, 10, 20);
    doc.text(`Date of Birth: ${formData.dateOfBirth}`, 10, 30);
    doc.text(`Email: ${formData.email}`, 10, 40);
    doc.text(`Phone Number: ${formData.phoneNumber}`, 10, 50);
    doc.text(`Generated RFC: ${this.generatedRfc}`, 10, 60);

    doc.save('user_info.pdf');
  }
}
