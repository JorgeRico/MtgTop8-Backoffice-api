import { connection } from '../middlewares/db.js';
export class LeagueModel {
    /**
     * Logic to get a league by ID from the database
     * @params id
     * @returns data
     */
    static async getLeagueById({ id }) {
        try {
            const data = await connection.from('leagues').select().eq('id', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching league by ID:', error);
            return null;
        }
    }

    /**
     * Logic to update a league by ID in the database
     * @params id, data 
     * @returns 
     */
    static async updateLeagueById({ id, data }) {
        try {
            const result = await connection.from('leagues').update([data]).eq('id', id).select();

            return result;
        } catch (error) {
            console.error('Error updating league by ID:', error);
            return null;
        }
    }

    /**
     * Logic to create a new league in the database
     * @params data
     * @returns result
     */
    static async createLeague({ data }) {
        try {
            // Get the last inserted id and increment it by 1
            const last_id   =  await connection.from('leagues').select('id').neq('id', 230000).order('id', { ascending: false }).limit(1);
            let lastIdValue = parseInt(last_id.data[0].id + 1);
            data.id = lastIdValue;

            const result = await connection.from('leagues').insert([data]).select('*');

            return result;
        } catch (error) {
            console.error('Error creating league:', error);
            return null;
        }
    }

    /**
     * Logic to delete a league by ID from the database
     * Delete league tournament Players + cars + decks
     * Delete league tournaments
     * Delete League
     * @params id
     * @returns data
     */
    static async deleteLeagueById({ id }) { 
        try {
            const result = await connection.from('tournaments').select('id').eq('idLeague', id);

            let tournamentsList = []
            result.data.forEach(function(item) {
                tournamentsList.push(item.id);
            })

            // delete info from tournaments
            const tournamentDecks = await connection.from('players').select('idDeck').in('idTournament', tournamentsList);

            let deckList = []
            tournamentDecks.data.forEach(function(item) {
                deckList.push(item.idDeck);
            })
            
            const players = await connection.from('players').delete().in('idTournament', tournamentsList).select();
            const cards   = await connection.from('cards').delete().in('idDeck', deckList).select();
            const decks   = await connection.from('decks').delete().in('id', deckList).select();
            
            // delete tournaments
            if (!players.error && !cards.error && !decks.error) {
                await connection.from('tournaments').delete().in('id', tournamentsList).select();
            }

            // delete league
            const data = await connection.from('leagues').delete().eq('id', id).select();

            return data;
        } catch (error) {
            console.error('Error deleting league by ID:', error);
            return null;
        } 
    }

    /**
     * Logic to get all leagues from the database
     * @params current, year, page, limit
     * @returns result
     */
    static async getAllLeagues({ data = null, page, limit }) {
        try {
            let result = null;

            if (isNaN(page)) {
                result = await connection.from('leagues').select('id, name').order('id', { ascending: true })
            }

            if (page >= 0 && limit > 1 &&  data.data.current === undefined && data.data.year === undefined) {
                result = await connection.from('leagues').select().order('year', { ascending: true }).range(page, limit);
            }

            if (data && data.data.current && !data.data.year) {
                result = await connection.from('leagues').select().eq('current', data.data.current).order('id', { ascending: true }).range(page, limit);
            }

            if (data && !data.data.current && data.data.year) {
                result = await connection.from('leagues').select().eq('year', data.data.year).order('id', { ascending: true }).range(page, limit);
            }

            return result;
        } catch (error) {
            console.error('Error fetching leagues:', error);
            return null;
        }
    }

    /**
     * Logic to get tournaments by league ID from the database
     * @params id
     * @returns data
     */
    static async getTournamentsByLeagueId({ id }) {
        try {
            const data = await connection.from('tournaments').select().eq('idLeague', id).order('date', { ascending: true });
            
            return data;    
        } catch (error) {
            console.error('Error fetching tournaments by league ID:', error);
            return null;
        }
    }

    /**
     * Get number of leagues on DB
     * @params
     * @returns 
     */
    static async getNumLeagues() {
        try {
            const result = await connection.from('leagues').select('*', { count: 'exact', head: true });

            return result;
        } catch (error) {
            console.error('Error fetching leagues:', error);
            return null;
        }
    }
}