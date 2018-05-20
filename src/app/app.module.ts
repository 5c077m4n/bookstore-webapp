import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import {LogService} from './log.service';
import {BookstoreService} from './bookstore.service';
import { AddBookComponent } from './add-book/add-book.component';
import { RemoveBookComponent } from './remove-book/remove-book.component';
import { SearchComponent } from './search/search.component';
import { BookDetailsComponent } from './book-details/book-details.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		BookstoreService,
		LogService
	],
	declarations: [
		AppComponent,
		BooksComponent,
		AddBookComponent,
		RemoveBookComponent,
		SearchComponent,
		BookDetailsComponent
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
