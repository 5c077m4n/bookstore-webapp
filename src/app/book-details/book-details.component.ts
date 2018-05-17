import { Component, OnInit, Input } from '@angular/core';

import {Book} from '../book';

@Component({
	selector: 'app-book-details',
	templateUrl: './book-details.component.html',
	styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
	@Input() selectedBook: Book = {} as Book;

	constructor() {}
	ngOnInit() {}

	isSelectedBookEmpty(): boolean {
		return (Object.values(this.selectedBook).length > 0);
	}
	resetSelectedBook() {
		this.selectedBook = {} as Book;
	}
}
