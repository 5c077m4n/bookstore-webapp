import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {BooksComponent} from './books/books.component';

const routes: Routes = [
	{path: '', component: BooksComponent},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class AppRoutingModule { }
