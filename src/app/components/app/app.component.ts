import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _ships: any[] | undefined;
  private _ports: string[] = [];
  private _types: string[] = [];

  private _timeout: number = 100;

  private _query_ships = gql`
    {
      ships {
        name
        type
        home_port
        weight_kg
        year_built
        missions {
          name
        }
      }
    }
  `;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private storage: StorageService
  ) {
    storage.get('data-ships')
      ? (this._ships = storage.get('ships'))
      : apollo
          .watchQuery({
            query: this._query_ships,
          })
          .valueChanges.subscribe((result: any) => {
            this._ships = result?.data?.ships;
            storage.set('ships', this._ships);

            this.portsUnique();
            storage.set('ports', this._ports);

            this.typesUnique();
            storage.set('types', this._types);
          });
  }

  ngOnInit() {
    this.timeout(this._timeout);
  }

  private timeout(value: number) {
    this.router.url == '/'
      ? setTimeout(() => {
          this._ships ? this.router.navigate(['/list']) : this.timeout(value);
        }, value)
      : false;
  }
  private portsUnique() {
    this._ships?.map((item) =>
      this._ports.includes(item.home_port)
        ? false
        : this._ports.push(item.home_port)
    );
  }

  private typesUnique() {
    this._ships?.map((item) =>
      this._types.includes(item.type) ? false : this._types.push(item.type)
    );

    this._types = this._types.sort();
  }
}
