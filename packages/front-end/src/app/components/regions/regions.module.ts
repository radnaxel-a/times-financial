import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRegionsComponent } from './list-regions/list-regions.component';
import { RegionsFormComponent } from './regions-form/regions-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewRegionComponent } from './view-region/view-region.component';

const routes: Routes = [
    {
        path: '',
        component: ListRegionsComponent,
    },
    {
        path: 'create',
        component: RegionsFormComponent,
    },
    {
        path: 'edit/:id',
        component: RegionsFormComponent,
    },
    {
        path: 'details/:id',
        component: ViewRegionComponent,
    },
];

@NgModule({
    declarations: [
        ListRegionsComponent,
        RegionsFormComponent,
        ViewRegionComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    exports: [RouterModule],
})
export class RegionsModule {}
