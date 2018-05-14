import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {BooksComponent} from './books/books.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{path: '/dashboard', component: BooksComponent}
	{ path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: []
})
export class AppRoutingModule { }
