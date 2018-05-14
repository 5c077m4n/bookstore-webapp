import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Book} from '../book';
import {BookstoreService} from '../bookstore.service';
import {LogService} from '../log.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
	@Input() book: Book;

    constructor(
		private route: ActivatedRoute,
		private bookstoreService: BookstoreService,
		private location: Location
	) {}
	ngOnInit() {}

	getBook(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.bookstoreService.getBook(id)
			.subscribe(book => this.book = book);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.bookstoreService.updateBook(this.book)
			.subscribe(() => this.goBack());
	}
}
