import { connection } from '../middlewares/db.js';
export class TournamentModel {
    /**
     * Logic to get a tournament by ID from the database
     * @params id
     * @returns data
     */
    static async getTournamentById({ id }) {
        try {
            const data = await connection.from('tournaments').select().eq('id', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching tournament by ID:', error);
            return null;
        }
    }   

    /**
     * Logic to update a tournament by ID in the database
     * @params id, data
     * @returns data
     */
    static async updateTournamentById({ id, data }) {   
        try {
            const result = await connection.from('tournaments').update([data]).eq('id', id).select();

            return result;
        } catch (error) {
            console.error('Error updating tournament by ID:', error);
            return null;
        }
    }

    /**
     * Logic to create a new tournament in the database
     * @params data
     * @returns result
     */
    static async createTournament({ data }) {
        try {
            // Get the last inserted id and increment it by 1
            const last_id   = await connection.from('tournaments').select('id').order('id', { ascending: false }).limit(1);
            let lastIdValue = parseInt(last_id.data[0].id + 1);
            data.id = lastIdValue;

            const result = await connection.from('tournaments').insert([data]).select('*');

            return result;
        } catch (error) {
            console.error('Error creating tournament:', error);
            return null;
        }
    }

    /**
     * Logic to delete a tournament by ID from the database
     * Delete tournament players
     * Delete tournament decks + cards
     * Delete Tournament
     * @params id
     * @returns data
     */
    static async deleteTournamentById({ id }) {
        try {
            const result = await connection.from('players').select('idDeck').eq('idTournament', id);

            let deckList = []
            result.data.forEach(function(item) {
                deckList.push(item.idDeck);
            })
            
            const players = await connection.from('players').delete().eq('idTournament', id).select();
            const cards   = await connection.from('cards').delete().in('idDeck', deckList).select();
            const decks   = await connection.from('decks').delete().in('id', deckList).select();
            
            if (!players.error && !cards.error && !decks.error) {
                const data = await connection.from('tournaments').delete().eq('id', id).select();

                return data;
            }
        } catch (error) {
            console.error('Error deleting tournament by ID:', error);
            return null;
        } 
    }
    
    /**
     * Logic to get all tournaments from the database
     * @params current, year, page, limit
     * @returns result
     */
    static async getAllTournaments({ page, limit }) {
        try {
            let result = null;
            
            if (!page && !limit) {
                result = await connection.from('tournaments').select().order('id', { ascending: true })
            } else {
                result = await connection.from('tournaments').select().order('id', { ascending: true }).range(page, limit);
            }
            
            return result;
        } catch (error) {
            console.error('Error fetching tournaments:', error);
            return null;
        }
    }

    /**
     * Logic to get players by tournament ID from the database
     * @params id
     * @returns data
     */
    static async getPlayersByTournamentId({ id }) {
        try {
            const result = await connection.from('players').select().eq('idTournament', id).order('position', { ascending: true });
            
            return result;
        } catch (error) {
            console.error('Error fetching tournaments:', error);
            return null;
        }
    }

    /**
     * Logic to get decks by tournament ID from the database
     * @params id
     * @returns data
     */
    static async getTournamentDecks({ id }) {
        try {
            const result = await connection.from('players').select('id, name, decks(*)').eq('idTournament', id);
            
            return result;
        } catch (error) {
            console.error('Error fetching tournament decks:', error);
            return null;
        }
    }

     /**
     * Get number of tournaments on DB
     * @params
     * @returns 
     */
    static async getNumTournaments() {
        try {
            const result = await connection.from('tournaments').select('*', { count: 'exact', head: true });

            return result;
        } catch (error) {
            console.error('Error fetching tournaments:', error);
            return null;
        }
    }
}