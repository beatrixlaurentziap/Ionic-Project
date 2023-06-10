import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countrycode: string = "62";
  wanumber: string = "85261818205";
  whatsappUrl: string = "https://wa.me/";
  telegramUrl: string = "https://t.me/";
  email: string = "beatrixlp01@gmail.com";

  nik: string = "";
  nama: string = "";
  message: string = "";
  sendTo: string = "whatsapp"; // Default to WhatsApp
  telegramUsername: string = "beatrixlp01";

  latitude: number = 0;
  longitude: number = 0;

  constructor() {}

  sendMessage() {
    let directUrl = "";

    if (this.sendTo === "whatsapp") {
      const whatsappMessage = `Hi, my name is ${this.nik}. NIM: ${this.nama}. ${this.message}`;
      const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);
      directUrl = `${this.whatsappUrl}${this.countrycode}${this.wanumber}?text=${encodedWhatsappMessage}`;
    } else if (this.sendTo === "telegram") {
      const telegramMessage = `Hi, my name is ${this.nik}. NIM: ${this.nama}. ${this.message}`;
      directUrl = `${this.telegramUrl}${this.telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;
    } else if (this.sendTo === "email") {
      const subject = `Message from ${this.nik}`;
      const emailLink = `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.message)}`;
      window.location.href = emailLink;
    }

    if (directUrl !== "") {
      window.open(directUrl, '_blank');
    }

    // Simpan data ke localStorage
    const formData = {
      name: this.nik,
      nim: this.nama,
      message: this.message,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.saveFormData(formData);
  }

  saveFormData(formData: {
    name: string,
    nim: string,
    message: string,
    latitude: number,
    longitude: number
  }) {
    const storedData = localStorage.getItem('formData');
    let savedData: {
      name: string,
      nim: string,
      message: string,
      latitude: number,
      longitude: number
    }[] = [];

    if (storedData) {
      savedData = JSON.parse(storedData);
    }

    savedData.push(formData);
    localStorage.setItem('formData', JSON.stringify(savedData));
  }

  trackLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, (error) => {
        console.log('Error getting location:', error);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}