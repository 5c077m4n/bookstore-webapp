import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retryWhen, delay, take } from 'rxjs/operators';

import {Book} from './book';
import {LogService} from './log.service';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BookstoreService {
	private _apiUrl = 'http://0.0.0.0:3000/books';

	constructor(
		private http: HttpClient,
		private logService: LogService
	) {}

	testConnection() {
		return this.http.get<Object>('http://0.0.0.0:3000')
			.pipe(
				catchError(this.handleErrorThrow),
				retryWhen(errors => errors.pipe(delay(30000), take(10)))
			)
			.subscribe(_ => console.log('The connection to the API has been successful.'));
	}

	/** @method GET all books from the server */
	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(this._apiUrl)
			.pipe(
				tap(_ => this.log('Fetched all books')),
				catchError(this.handleError('getBooks', []))
			);
	}
	/** @method GET book by ISBN. Will 404 if id not found */
	getBook(isbn: string): Observable<Book> {
		return this.http.get<Book>(`${this._apiUrl}/${isbn}`).pipe(
			tap(_ => this.log(`fetched book ISBN #${isbn}`)),
			catchError(this.handleError<Book>(`getBook ISBN #${isbn}`))
		);
	}
	/** @method GET hero by id. Return `undefined` when id not found */
	getBookNo404<Data>(isbn: string): Observable<Book> {
		return this.http.get<Book[]>(`${this._apiUrl}/?isbn=${isbn}`)
			.pipe(
				map(books => books[0]),
				tap(bks => this.log(`${bks? `Fetched` : `Did not find`} book ISBN #${isbn}`)),
				catchError(this.handleError<Book>(`getBook ISBN #${isbn}`))
			);
	}
	/** @method POST: add a new hero to the server */
	addBook(book: Book): Observable<Book> {
		return this.http.post<Book>(this._apiUrl, book, httpOptions).pipe(
			tap((book: Book) => this.log(`Added book w/ ISBN #${book.isbn}`)),
			catchError(this.handleError<Book>('addBook'))
		);
	}
	/** @method PUT: update the book on the server */
	updateBook(book: Book): Observable<any> {
		return this.http.put<Book>(this._apiUrl, book, httpOptions).pipe(
			tap(_ => this.log(`Updated Book ISBN #${book.isbn}`)),
			catchError(this.handleError<any>('updateBook'))
		);
	}
	/** @method DELETE: delete the book from the server */
	deleteBook(bookOrCode: Book | string): Observable<Book> {
		const isbn = (typeof bookOrCode === 'string')? bookOrCode : bookOrCode.isbn;
		return this.http.delete<Book>(`${this._apiUrl}/${isbn}`, httpOptions).pipe(
			tap(_ => this.log(`Deleted book ISBN #${isbn}`)),
			catchError(this.handleError<Book>('deleteBook'))
		);
	}

	/**
	 * @function handleError<T> - Handle HTTP operations that failed and let the app continue.
	 * @param operation - name of the operation that failed.
	 * @param result - optional value to return as the observable result.
	 */
	private handleError<T>(operation: string = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	/**
	 * @function handleErrorThrow - Handle HTTP operations that failed.
	 * @param error - an error of type ErrorObservable.
	 */
	private handleErrorThrow(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			/** A client-side or network error occurred.
			 * Handle it accordingly. */
			console.error(`An error occurred: ${error.error.message}`);
		}
		else {
			/** The backend returned an unsuccessful response code.
			 * The response body may contain clues as to what went wrong, */
			console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
		}
		/** return an observable with a user-facing error message */
		return throwError('Something bad happened; please try again later.');
	};

	/** Log a BookService message with the LogService */
	private log(message: string) {
		this.logService.add(`BookstoreService: ${message}`);
	}
}
