import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuListComponent } from './menu-list/menu-list.component';
import { AgePipe } from './pipes/age.pipe';

// PrimeNg
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DividerModule} from 'primeng/divider';
import {ChipModule} from 'primeng/chip';
import {AccordionModule} from 'primeng/accordion';
import {TimelineModule} from 'primeng/timeline';
import {TableModule} from 'primeng/table';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import {ChartModule} from 'primeng/chart';
import {ScrollPanelModule} from 'primeng/scrollpanel';



@NgModule({
  declarations: [
    MenuListComponent,
    AgePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNg
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    DividerModule,
    ChipModule,
    AccordionModule,
    TimelineModule,
    TableModule,
    FieldsetModule,
    TabViewModule,
    SelectButtonModule,
    FileUploadModule,
    DialogModule,
    CheckboxModule,
    ChartModule,
    ScrollPanelModule
  ],
  exports: [
    MenuListComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgePipe,
    // PrimeNg
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    DividerModule,
    ChipModule,
    AccordionModule,
    TimelineModule,
    TableModule,
    FieldsetModule,
    TabViewModule,
    SelectButtonModule,
    FileUploadModule,
    DialogModule,
    CheckboxModule,
    ChartModule,
    ScrollPanelModule
  ]
})
export class SharedModule { }
