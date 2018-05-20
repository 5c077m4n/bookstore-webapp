import { Component, OnInit } from '@angular/core';

import {BookstoreService} from '../bookstore.service';
import {Book} from '../book';

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
	books: Book[] = [];
	selectedBook: Book;

	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {
		this.getBooks();
	}

	getBooks(): void {
		this.bookstoreService.getBooks()
			.subscribe(books => this.books = books);
	}
}
