# RfcGenerator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# Comprehensive Guide: Building an Angular 18 App with Form Validation, RFC Generation, and PDF Download

This guide will walk you through creating an Angular 18 application that includes a form for user data input, validation, RFC generation, and PDF creation.

## Table of Contents
1. [Setting up the Angular project](#1-setting-up-the-angular-project)
2. [Creating the user data form](#2-creating-the-user-data-form)
3. [Implementing form validation](#3-implementing-form-validation)
4. [Processing form data and generating RFC](#4-processing-form-data-and-generating-rfc)
5. [Generating and downloading a PDF](#5-generating-and-downloading-a-pdf)
6. [Styling the Application](#6-styling-the-application)

## 1. Setting up the Angular project

First, let's set up a new Angular project:

1. Install the Angular CLI globally (if you haven't already):
   ```
   npm install -g @angular/cli
   ```

2. Create a new Angular project:
   ```
   ng new rfc-generator
   ```
   
   Choose the following options:
   - Would you like to add Angular routing? Yes
   - Which stylesheet format would you like to use? CSS

3. Navigate to the project directory:
   ```
   cd rfc-generator
   ```

4. Start the development server:
   ```
   ng serve
   ```

   Your app should now be running at `http://localhost:4200/`.

## 2. Creating the user data form

Let's create a component for our user data form:

1. Generate a new component:
   ```
   ng generate component user-form
   ```

2. Open `src/app/user-form/user-form.component.ts` and replace its contents with:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      console.log(this.userForm.value);
    }
  }
}
```

3. Open `src/app/user-form/user-form.component.html` and replace its contents with:

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input id="name" type="text" formControlName="name">
  </div>

  <div>
    <label for="lastName">Last Name:</label>
    <input id="lastName" type="text" formControlName="lastName">
  </div>

  <div>
    <label for="dateOfBirth">Date of Birth:</label>
    <input id="dateOfBirth" type="date" formControlName="dateOfBirth">
  </div>

  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" formControlName="email">
  </div>

  <div>
    <label for="phoneNumber">Phone Number:</label>
    <input id="phoneNumber" type="tel" formControlName="phoneNumber">
  </div>

  <button type="submit" [disabled]="!userForm.valid">Submit</button>
</form>
```

4. Update `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserFormComponent],
  template: `
    <div class="container">
      <h1>RFC Generator</h1>
      <app-user-form></app-user-form>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rfc-generator';
}
```

## 3. Implementing form validation

Let's enhance our form by displaying error messages. Update `src/app/user-form/user-form.component.html`:

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input id="name" type="text" formControlName="name">
    <div *ngIf="userForm.get('name')?.invalid && (userForm.get('name')?.dirty || userForm.get('name')?.touched)" class="error-message">
      Name is required.
    </div>
  </div>

  <div>
    <label for="lastName">Last Name:</label>
    <input id="lastName" type="text" formControlName="lastName">
    <div *ngIf="userForm.get('lastName')?.invalid && (userForm.get('lastName')?.dirty || userForm.get('lastName')?.touched)" class="error-message">
      Last name is required.
    </div>
  </div>

  <div>
    <label for="dateOfBirth">Date of Birth:</label>
    <input id="dateOfBirth" type="date" formControlName="dateOfBirth">
    <div *ngIf="userForm.get('dateOfBirth')?.invalid && (userForm.get('dateOfBirth')?.dirty || userForm.get('dateOfBirth')?.touched)" class="error-message">
      Date of birth is required.
    </div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" formControlName="email">
    <div *ngIf="userForm.get('email')?.invalid && (userForm.get('email')?.dirty || userForm.get('email')?.touched)" class="error-message">
      <div *ngIf="userForm.get('email')?.errors?.['required']">Email is required.</div>
      <div *ngIf="userForm.get('email')?.errors?.['email']">Invalid email format.</div>
    </div>
  </div>

  <div>
    <label for="phoneNumber">Phone Number:</label>
    <input id="phoneNumber" type="tel" formControlName="phoneNumber">
    <div *ngIf="userForm.get('phoneNumber')?.invalid && (userForm.get('phoneNumber')?.dirty || userForm.get('phoneNumber')?.touched)" class="error-message">
      <div *ngIf="userForm.get('phoneNumber')?.errors?.['required']">Phone number is required.</div>
      <div *ngIf="userForm.get('phoneNumber')?.errors?.['pattern']">Phone number must be 10 digits.</div>
    </div>
  </div>

  <button type="submit" [disabled]="!userForm.valid">Submit</button>
</form>
```

## 4. Processing form data and generating RFC

Now let's implement the RFC generation logic:

1. Generate a new service:
   ```
   ng generate service rfc-generator
   ```

2. Open `src/app/rfc-generator.service.ts` and replace its contents with:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RfcGeneratorService {
  constructor() { }

  generateRfc(name: string, lastName: string, dateOfBirth: string): string {
    const nameInitials = this.getNameInitials(name, lastName);
    const birthDate = this.formatBirthDate(dateOfBirth);
    return (nameInitials + birthDate).toUpperCase();
  }

  private getNameInitials(name: string, lastName: string): string {
    const lastNameParts = lastName.split(' ');
    const firstLastName = lastNameParts[0];
    const secondLastName = lastNameParts.length > 1 ? lastNameParts[1] : '';

    let initials = '';
    initials += firstLastName.charAt(0);
    initials += this.getFirstVowel(firstLastName.substring(1));
    initials += secondLastName.charAt(0) || 'X';
    initials += name.charAt(0);

    return this.applyExceptionRules(initials);
  }

  private getFirstVowel(str: string): string {
    const match = str.match(/[aeiou]/i);
    return match ? match[0] : 'X';
  }

  private formatBirthDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
  }

  private applyExceptionRules(initials: string): string {
    return initials.replace(/Ñ/g, 'X');
  }
}
```

3. Update `src/app/user-form/user-form.component.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfcGeneratorService } from '../rfc-generator.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
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
}
```

4. Update `src/app/user-form/user-form.component.html` to display the generated RFC:

```html
<!-- Add this after the form -->
<div *ngIf="generatedRfc" class="rfc-display">
  <h2>Generated RFC:</h2>
  <p>{{ generatedRfc }}</p>
</div>
```

## 5. Generating and downloading a PDF

Let's add PDF generation functionality:

1. Install jsPDF:
   ```
   npm install jspdf
   ```

2. Update `src/app/user-form/user-form.component.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfcGeneratorService } from '../rfc-generator.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
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
```

3. Update `src/app/user-form/user-form.component.html` to add a button for PDF generation:

```html
<div *ngIf="generatedRfc" class="rfc-display">
  <h2>Generated RFC:</h2>
  <p>{{ generatedRfc }}</p>
  <button (click)="generatePdf()">Download PDF</button>
</div>
```

## 6. Styling the Application

Finally, let's style our application for a clean, modern look:

1. Replace the contents of `src/styles.css` with:

```css
/* Global Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
  padding: 20px;
  margin: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

/* Form Styles */
form {
  display: grid;
  gap: 20px;
}

label {
  font-weight: bold;
  color: #34495e;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

/* Error message styles */
.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

/* Generated RFC display */
.rfc-display {
  margin-top: 30px;
  padding: 20px;
  background-color: #ecf0f1;
  border-radius: 4px;
}

.rfc-display h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.rfc-display p {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
}
```
