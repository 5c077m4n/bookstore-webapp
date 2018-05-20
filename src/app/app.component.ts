import { Component } from '@angular/core';

import {BookstoreService} from './bookstore.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'Bookstore';
	section: string = '';

	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {
		this.bookstoreService.testConnection()
	}
}
