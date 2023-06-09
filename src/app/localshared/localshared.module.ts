import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSelectModule } from 'ngx-select-ex';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { DisplayFilteredComponent } from './components/display-filtered/display-filtered.component';
import { InputSearchableComponent } from './components/input-searchable/input-searchable.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProgressBarScrollComponent } from './components/progress-bar-scroll/progress-bar-scroll.component';
import { DragAndDropFileDirective } from './directives/dnd.file.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { MessageTranslatePipe } from './pipe/message.translate.pipe';
import { DisplayStringPipe } from './pipe/display.string.pipe';
import { AmtPatternDirective } from './directives/amt.pattern.directive';
import { FloatPatternDirective } from './directives/float.pattern.directive';
import { DropDownHoverComponent } from './components/dropdown-hover/dropdown-hover.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    InputSearchableComponent,
    DisplayFilteredComponent,
    ProgressBarScrollComponent,
    DropDownHoverComponent,
    DragAndDropFileDirective,
    AmtPatternDirective,
    FloatPatternDirective,
    DraggableDirective,
    DroppableDirective,
    MessageTranslatePipe,
    DisplayStringPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    HttpClientModule,
    OopsLib001Module,
    OopsLib002Module,
    SharedModule,
  ],
  exports: [
    SpinnerComponent,
    InputSearchableComponent,
    DisplayFilteredComponent,
    ProgressBarScrollComponent,
    DropDownHoverComponent,
    DragAndDropFileDirective,
    AmtPatternDirective,
    FloatPatternDirective,
    DraggableDirective,
    DroppableDirective,
    MessageTranslatePipe,
    DisplayStringPipe,
  ],
})
export class LocalsharedModule {}
