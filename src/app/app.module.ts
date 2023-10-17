import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameBoardComponent } from './game-board/game-board.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { GameService } from './game.service';
import { PlayerVsComputerComponent } from './player-vs-computer/player-vs-computer.component';
import { PlayervsplayerComponent } from './playervsplayer/playervsplayer.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { GameResultsComponent } from './game-results/game-results.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

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
    PlayervsplayerComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    GameResultsComponent,
    BrowserAnimationsModule, MatDialogModule
  ],
  exports:[FirstPageComponent],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
