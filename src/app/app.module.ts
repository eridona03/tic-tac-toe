import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameBoardComponent } from './game-board/game-board.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { GameService } from './game.service';
import { PlayerVsComputerComponent } from './player-vs-computer/player-vs-computer.component';
import { PlayerVsPlayerComponent } from './player-vs-player/player-vs-player.component';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameBoardComponent, 
    FirstPageComponent, 
    PlayerVsComputerComponent, 
    PlayerVsPlayerComponent
  ],
  exports:[FirstPageComponent],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
