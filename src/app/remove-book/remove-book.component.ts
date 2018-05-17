import { Component, OnInit } from '@angular/core';

import {Book} from '../book';
import { BookstoreService } from '../bookstore.service';

@Component({
  selector: 'app-remove-book',
  templateUrl: './remove-book.component.html',
  styleUrls: ['./remove-book.component.css']
})
export class RemoveBookComponent implements OnInit {
	isbnCode: string = '';
	removedBook: Book;

	constructor(private bookstoreSevice: BookstoreService) {}
	ngOnInit() {}

	deleteBook() {
		this.bookstoreSevice.deleteBook(this.isbnCode)
			.subscribe(book => this.removedBook = book);
	}
}
