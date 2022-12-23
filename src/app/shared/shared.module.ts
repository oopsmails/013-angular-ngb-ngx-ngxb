import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { GithubService } from './services/github.service';
import { SharedDataService } from './services/shared.data.service';
import { StateService } from './services/state.service';
import { UtilsService } from './services/utils.service';
import { WikipediaService } from './services/wikipedia.service';

@NgModule({
  declarations: [HighlighterPipe, NotFoundComponent, FooterComponent],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighlighterPipe,
    NotFoundComponent,
    FooterComponent,
  ],
  providers: [UtilsService, SharedDataService, WikipediaService, GithubService, StateService],
})
export class SharedModule {}
