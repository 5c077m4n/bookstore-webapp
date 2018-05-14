import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from './book';
import {LogService} from './log.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookstoreService {
	private API_URL = 'http://0.0.0.0:3000';
	constructor(private http: HttpClient, private logService: LogService) {}

	/** GET heroes from the server */
	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(this.API_URL)
			.pipe(
				tap(books => this.log(`Fetched books.`)),
				catchError(this.handleError('getBooks', []))
			);
	}

	/** GET hero by id. Return `undefined` when id not found */
	getBookNo404<Data>(isbn: number): Observable<Book> {
		const url = `${this.API_URL}/?isbn=${isbn}`;
		return this.http.get<Book[]>(url)
			.pipe(
				map(books => books[0]),
				tap(bks => this.log(`${bks? `Fetched` : `Did not find`} book ISBN #${isbn}`)),
				catchError(this.handleError<Book>(`getBook ISBN number #${isbn}`))
			);
	}

	/**
	 * Handle HTTP operations that failed and let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.logService.add('BookstoreService: ' + message);
	}
}
