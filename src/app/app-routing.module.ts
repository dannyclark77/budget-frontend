import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BudgetComponent } from './budget/budget.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
  },
  {
    path: 'budget',
    component: BudgetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
