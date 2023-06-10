import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})
export class HistoryPage {
  formData: { name: string, nim: string, class: string, message: string }[] = [];

  constructor() {}

  ionViewDidEnter() {
    this.loadFormData();
  }

  loadFormData() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      this.formData = JSON.parse(storedData);
    }
  }
}
