import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title_content: string = 'SpaceX Ships';
  title_sidebar: string = 'Фильтры';

  private slice_offset: number = 5;
  slice_begin: number = 0;
  slice_end: number = 5;
  page: number = 1;

  ships: any[] = [];
  ports: string[] = [];
  types: string[] = [];

  nameFilterValue: string = '';
  portFilterValue: string[] = [];
  typeFilterValue: string = '';

  private ships_lenght: number = 0;
  ports_label: string = '';
  ports_box: boolean = false;

  constructor(private storage: StorageService) {
    this.ships = storage.get('ships');
    this.ports = storage.get('ports');
    this.types = storage.get('types');

    storage.get('nameFilterValue')
      ? (this.nameFilterValue = storage.get('nameFilterValue'))
      : storage.set('nameFilterValue', '');

    storage.get('portFilterValue')
      ? (this.portFilterValue = storage.get('portFilterValue'))
      : storage.set('portFilterValue', []);

    storage.get('typeFilterValue')
      ? (this.typeFilterValue = storage.get('typeFilterValue'))
      : storage.set('typeFilterValue', '');

    storage.get('ports-label')
      ? (this.ports_label = storage.get('ports-label'))
      : (this.ports_label = '');

    if (storage.get('page')) {
      this.page = storage.get('page');

      this.slice_begin = (this.page - 1) * this.slice_offset;
      this.slice_end = this.page * this.slice_offset;
    }
  }

  ngOnInit() {}

  sliceNext() {
    this.ships_lenght = this.storage.get('ships-lenght')
      ? this.storage.get('ships-lenght')
      : this.ships.length;

    if (
      this.slice_begin + this.slice_offset <= this.ships_lenght ||
      this.slice_end + this.slice_offset <= this.ships_lenght
    ) {
      this.slice_begin += this.slice_offset;
      this.slice_end += this.slice_offset;

      this.page += 1;
      this.storage.set('page', this.page);
    }
    // else console.log('END');
  }

  slicePrev() {
    if (
      this.slice_begin - this.slice_offset >= 0 &&
      this.slice_end - this.slice_offset >= 0
    ) {
      this.slice_begin -= this.slice_offset;
      this.slice_end -= this.slice_offset;

      this.page -= 1;
      this.storage.set('page', this.page);
    }
    // else console.log('START');
  }

  sliceReset() {
    this.slice_begin = 0;
    this.slice_end = this.slice_offset;

    this.page = 1;
    this.storage.set('page', this.page);
  }

  setNameFilter(event: any) {
    event.target.value.replaceAll(' ', '') != ''
      ? (this.nameFilterValue = event.target.value)
      : (this.nameFilterValue = '');

    this.storage.set('nameFilterValue', this.nameFilterValue);

    this.sliceReset();
  }

  setPortFilter(event: any) {
    event.target.checked
      ? (this.portFilterValue = [...this.portFilterValue, event.target.id])
      : (this.portFilterValue = this.portFilterValue.filter(
          (item) => item != event.target.id
        ));

    switch (this.portFilterValue.length) {
      case 0:
        this.ports_label = '';

        this.storage.set('ports-label', this.ports_label);
        break;

      case 1:
        this.ports_label = [...this.portFilterValue].shift() || 'error';

        this.storage.set('ports-label', this.ports_label);
        break;

      default:
        this.ports_label = 'Выбраны ' + this.portFilterValue.length;

        this.storage.set('ports-label', this.ports_label);
        break;
    }

    this.storage.set('portFilterValue', this.portFilterValue);

    this.sliceReset();
  }

  setTypeFilter(event: any) {
    this.typeFilterValue = event.target.id;

    this.storage.set('typeFilterValue', this.typeFilterValue);

    this.sliceReset();
  }
}
