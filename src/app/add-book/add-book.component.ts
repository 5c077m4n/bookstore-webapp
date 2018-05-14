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

	addBook() {
		this.bookstoreService.addBook(this.newBook as Book);
	}
}
