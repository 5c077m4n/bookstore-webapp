import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
	private _messageLog: string[] = [];
	constructor() {}

	getLogs(): string[] {
		return this._messageLog;
	}
	add(msg: string): string {
		this._messageLog.push(`${msg} @${(new Date()).toLocaleString()}`);
		console.log(`${msg} @${(new Date()).toLocaleString()}`);
		return msg;
	}
	clear(): void {
		this._messageLog = [];
	}
	length(): number {
		return this._messageLog.length;
	}
}
