import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Book} from './book';
import {LogService} from './log.service';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BookstoreService {
	private API_URL = 'http://0.0.0.0:3000/books';
	constructor(
		private http: HttpClient,
		private logService: LogService
	) {}

	testConnection() {
		if(this.http.get<string>('http://0.0.0.0:3000')) {
			this.log('Connection established');
			return true;
		}
		else {
			this.log('There is a problem with the connection to the API');
			return false;
		}
	}

	/** GET all books from the server */
	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(this.API_URL)
			.pipe(
				tap(_ => this.log('Fetched all books')),
				catchError(this.handleError('getBooks', []))
			);
	}
	/** GET book by ISBN. Will 404 if id not found */
	getBook(isbn: string): Observable<Book> {
		return this.http.get<Book>(`${this.API_URL}/${isbn}`).pipe(
			tap(_ => this.log(`fetched book ISBN #${isbn}`)),
			catchError(this.handleError<Book>(`getBook ISBN #${isbn}`))
		);
	}
	/** GET hero by id. Return `undefined` when id not found */
	getBookNo404<Data>(isbn: string): Observable<Book> {
		const url = `${this.API_URL}/?isbn=${isbn}`;
		return this.http.get<Book[]>(url)
			.pipe(
				map(books => books[0]),
				tap(bks => this.log(`${bks? `Fetched` : `Did not find`} book ISBN #${isbn}`)),
				catchError(this.handleError<Book>(`getBook ISBN number #${isbn}`))
			);
	}
	/** POST: add a new hero to the server */
	addBook(book: Book): Observable<Book> {
		return this.http.post<Book>(this.API_URL, book, httpOptions).pipe(
			tap((book: Book) => this.log(`Added book w/ ISBN #${book.isbn}`)),
			catchError(this.handleError<Book>('addBook'))
		);
	}
	/** PUT: update the book on the server */
	updateBook(book: Book): Observable<any> {
		return this.http.put(this.API_URL, book, httpOptions).pipe(
			tap(_ => this.log(`Updated Book ISBN #${book.isbn}`)),
			catchError(this.handleError<any>('updateBook'))
		);
	}
	/** DELETE: delete the book from the server */
	deleteBook(book: Book | string): Observable<Book> {
		const isbn = (typeof book === 'string')? book : book.isbn;
		const url = `${this.API_URL}/${isbn}`;
		return this.http.delete<Book>(url, httpOptions).pipe(
			tap(_ => this.log(`Deleted book ISBN #${isbn}`)),
			catchError(this.handleError<Book>('deleteBook'))
		);
	}

	/**
	 * @function handleError<T> - Handle HTTP operations that failed and let the app continue
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	/** Log a BookService message with the LogService */
	private log(message: string) {
		this.logService.add(`BookstoreService: ${message}`);
	}
}
