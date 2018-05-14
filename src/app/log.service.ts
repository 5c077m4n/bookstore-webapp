import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
	private messageLog = [];
	constructor() {}

	add(msg: string): string {
		this.messageLog.push(msg);
		return msg;
	}

	clear() {
		this.messageLog = [];
	}
}
