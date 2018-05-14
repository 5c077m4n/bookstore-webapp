import { Component, OnInit } from '@angular/core';

import {BookstoreService} from '../bookstore.service';
import { Book } from '../book';

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
	books: Book[] = [];
	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {
		this.getBooks();
	}

	getBooks(): void {
		this.bookstoreService.getBooks()
			.subscribe(books => this.books = books);
	}

	addBook(title: string, description: string, isbn: string, author: string, pubDate: Date, genre: string, price: number, quantity: number): void {
		if(!title || !isbn || !price) return;
		this.bookstoreService
			.addBook({title, description, isbn, author, pubDate, genre, price, quantity} as Book)
			.subscribe(hero => {
				this.books.push(hero);
			});
	}

	delete(book: Book): void {
		this.books = this.books.filter(bk => bk !== book);
		this.bookstoreService.deleteBook(book).subscribe();
	}
}
