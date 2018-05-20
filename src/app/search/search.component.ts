import { Component, OnInit } from '@angular/core';

import {Book} from '../book';
import { BookstoreService } from '../bookstore.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
	isbnCode: string = '';
	selectedBook: Book;

	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {}

	findBook() {
		this.isbnCode = this.isbnCode.trim();
		if(!this.isbnCode) return;
		this.bookstoreService.getBook(this.isbnCode)
			.subscribe(book => this.selectedBook = book);
	}
}
