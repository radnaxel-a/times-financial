import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'regions',
        pathMatch: 'full',
    },
    {
        path: 'regions',
        loadChildren: () =>
            import('./components/regions/regions.module').then(
                (m) => m.RegionsModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
