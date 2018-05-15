import { Component, OnInit } from '@angular/core';

import { BookstoreService } from '../bookstore.service';
import { LogService } from '../log.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	section: string = '';

	constructor(private bookstoreService: BookstoreService) {}
	ngOnInit() {
		this.bookstoreService.testConnection()
	}
}
