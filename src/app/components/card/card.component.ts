import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private _subscription: Subscription;

  private _ships: any[] = [];

  ship: any = null;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private storage: StorageService
  ) {
    this._ships = storage.get('ships');

    this._subscription = activateRoute.queryParams.subscribe((params) => {
      this.ship = this._ships
        .filter((item) => item.name == params['name'].replaceAll('_', ' '))
        .shift();
    });
  }

  ngOnInit(): void {}
}
