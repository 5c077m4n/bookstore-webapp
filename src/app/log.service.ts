import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
	private messageLog: string[] = [];
	constructor() {}

	getLogs(): string[] {
		return this.messageLog;
	}
	add(msg: string): string {
		this.messageLog.push(msg);
		return msg;
	}
	clear(): void {
		this.messageLog = [];
	}
	length(): number {
		return this.messageLog.length;
	}
}
