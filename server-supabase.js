import { LeagueModel } from './models/league.js';
import { TournamentModel } from './models/tournament.js';
import { PlayerModel } from './models/player.js';
import { DeckModel } from './models/deck.js';
import { CardModel } from './models/card.js';
import { createApp } from './app.js';

createApp({ leagueModel: LeagueModel, tournamentModel: TournamentModel, playerModel: PlayerModel, deckModel: DeckModel, cardModel: CardModel })