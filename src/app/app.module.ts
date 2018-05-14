import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';
import {LogService} from './log.service';
import {BookstoreService} from './bookstore.service';


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
		BookDetailsComponent,
		BooksComponent
	],
	bootstrap: [AppComponent]
})

export class AppModule {}