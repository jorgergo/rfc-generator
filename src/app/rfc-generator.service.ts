import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RfcGeneratorService {
  constructor() {}

  generateRfc(name: string, lastName: string, dateOfBirth: string): string {
    // Implement RFC generation logic here
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
    // Implement exception rules here
    // This is a simplified version and doesn't cover all the rules
    return initials.replace(/Ñ/g, 'X');
  }
}
