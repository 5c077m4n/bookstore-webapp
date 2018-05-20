export class Book {
    title: string;
    description: string;
    isbn: string;
    author: string;
    pubDate: number;
    genre: string;
    price: number;
	quantity: number;

	constructor(book?: Book) {
		if(book) {
			this.title = book.title;
			this.description = book.description;
			this.isbn = book.isbn;
			this.author = book.author;
			this.pubDate = book.pubDate;
			this.genre = book.genre;
			this.price = book.price;
			this.quantity = book.quantity;
		}
		else {
			this.title = '';
			this.description = '';
			this.isbn = '';
			this.author = '';
			this.pubDate = new Date().getFullYear();
			this.genre = '';
			this.price = 0;
			this.quantity = 1;
		}
	}
}