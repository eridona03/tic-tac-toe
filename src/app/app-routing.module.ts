import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { PlayerVsComputerComponent } from './player-vs-computer/player-vs-computer.component';
import { PlayervsplayerComponent } from './playervsplayer/playervsplayer.component';
import { GameResultsComponent } from './game-results/game-results.component';
const routes: Routes = [
  
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: FirstPageComponent },
  {
    path: 'gameboard',
    children: [
      { path: 'player-vs-player', component: PlayervsplayerComponent },
      { path: 'player-vs-computer', component: PlayerVsComputerComponent },
  
    ],
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
