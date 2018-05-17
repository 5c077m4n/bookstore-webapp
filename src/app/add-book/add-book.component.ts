import { Component, OnInit } from '@angular/core';

import {Book} from '../book';
import { BookstoreService } from '../bookstore.service';

@Component({
	selector: 'app-add-book',
	templateUrl: './add-book.component.html',
	styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
	newBook: Book = {} as Book;
	addedBook: Book;

	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {}

	addBook(): void {
		if(!this.newBook.title || !this.newBook.isbn || !this.newBook.price) {
			console.warn('Not all required fields have been filled.');
			return;
		}
		this.bookstoreService.addBook(this.newBook)
			.subscribe(book => this.addedBook = book);
	}
}
