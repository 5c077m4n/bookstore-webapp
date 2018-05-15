import { Component, OnInit } from '@angular/core';

import { BookstoreService } from '../bookstore.service';
import {Book} from '../book';

@Component({
	selector: 'app-add-book',
	templateUrl: './add-book.component.html',
	styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
	newBook = {};

	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {}

	addBook(title: string, description: string, isbn: string, author: string, pubDate: Date, genre: string, price: number, quantity: number): void {
		if(!title || !isbn || !price) return;
		this.bookstoreService
			.addBook({title, description, isbn, author, pubDate, genre, price, quantity} as Book)
			.subscribe();
	}
}
