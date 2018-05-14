import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {LogService} from './log.service';
import {BookstoreService} from './bookstore.service';
import { AppRoutingModule } from './/app-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';


@NgModule({
	declarations: [
		AppComponent,
		BookDetailsComponent,
		BooksComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [
		BookstoreService,
		LogService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
