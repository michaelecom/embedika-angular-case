import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';

import { StorageService } from './services/storage/storage.service';

import { SidebarFilterPipe } from './pipes/sidebarFilter/sidebar-filter.pipe';

@NgModule({
  declarations: [AppComponent, CardComponent, SidebarFilterPipe, ListComponent],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
  providers: [StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
