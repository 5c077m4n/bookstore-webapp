import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import {LogService} from './log.service';
import {BookstoreService} from './bookstore.service';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './add-book/add-book.component';
import { RemoveBookComponent } from './remove-book/remove-book.component';
import { SearchComponent } from './search/search.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		BookstoreService,
		LogService
	],
	declarations: [
		AppComponent,
		BooksComponent,
		HomeComponent,
		AddBookComponent,
		RemoveBookComponent,
		SearchComponent
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
