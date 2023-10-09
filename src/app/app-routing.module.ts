import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { PlayerVsComputerComponent } from './player-vs-computer/player-vs-computer.component';
import { PlayerVsPlayerComponent } from './player-vs-player/player-vs-player.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: FirstPageComponent },
  {
    path: 'gameboard',
    children: [
      { path: 'player-vs-player', component: PlayerVsPlayerComponent },
      { path: 'player-vs-computer', component: PlayerVsComputerComponent },
      
    ],
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
