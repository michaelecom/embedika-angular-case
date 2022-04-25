import { Pipe, PipeTransform } from '@angular/core';

import { StorageService } from '../../services/storage/storage.service';

@Pipe({
  name: 'sidebarFilter',
})
export class SidebarFilterPipe implements PipeTransform {
  transform(items: any[], name: string, ports: string[], type: string): any[] {
    let tmp: any[] = items;

    const storage: StorageService = new StorageService();

    name != ''
      ? (tmp = tmp.filter(
          (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
        ))
      : false;

    ports.length != 0
      ? (tmp = tmp.filter((item) => ports.includes(item.home_port)))
      : false;

    type != ''
      ? (tmp = tmp.filter((item) => item.type.indexOf(type) !== -1))
      : false;

    storage.set('ships-lenght', tmp.length);

    return tmp;
  }
}
