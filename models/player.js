import { connection } from '../middlewares/db.js';
export class PlayerModel {
    /**
     * Logic to get a player by ID from the database
     * @params id 
     * @returns data
     */
    static async getPlayerById({ id }) {
        try {
            const data = await connection.from('players').select().eq('id', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching player by ID:', error);
            return null;
        }
    }   

    /**
     * Logic to update a player by ID in the database
     * @params id, data
     * @returns data
     */
    static async updatePlayerById({ id, data }) {   
        try {
            const result = await connection.from('players').update([data]).eq('id', id).select();

            return result;
        } catch (error) {
            console.error('Error updating player by ID:', error);
            return null;
        }
    }

    /**
     * Logic to create a new player in the database
     * @params data
     * @returns data
     */
   static async createPlayer({ data }) {
        try {
            // Get the last inserted id and increment it by 1
            const last_id   = await connection.from('players').select('id').order('id', { ascending: false }).limit(1);
            let lastIdValue = parseInt(last_id.data[0].id + 1);
            data.id = lastIdValue;

            const result = await connection.from('players').insert([data]).select('*');

            return result;
        } catch (error) {
            console.error('Error creating player:', error);
            return null;
        }
    }

    /**
     * Logic to delete a player by ID from the database
     * Delete player associated deck
     * Delete deck cards
     * Delete player
     * @params id
     * @returns data
     */
    static async deletePlayerById({ id }) {
        try {
            const result = await connection.from('players').select().eq('id', id);

            if (!result.error) {
                if (!cards.error) {
                    // delete deck
                    const data = await connection.from('players').delete().eq('id', id).select();
                    if (!data.error) {
                        // delete cards deck
                        const cards = await connection.from('cards').delete().eq('idDeck', result.data[0].idDeck).select(); 
                        // delete deck
                        const deck  = await connection.from('decks').delete().eq('id', result.data[0].idDeck).select();

                        return data;
                    }
                }
            }
        } catch (error) {
            console.error('Error deleting player by ID:', error);
            return null;
        }
    }

    /**
     * Logic to get all players from the database
     * @params page, limit
     * @returns 
     */
    static async getAllPlayers({ page, limit }) {
        try {
            // needs a view - supabase actually does not support order by with more than 1 deep join
            const result = await connection.from('group_players_by_league_year').select().range(page, limit);

            return result;
        } catch (error) {
            console.error('Error fetching players:', error);
            return null;
        }
    }

    /**
     * Logic to get all player decks 
     * @params id
     * @returns 
     */
    static async getPlayerDeck({ id }) {
        try {
            const result = await connection.from('decks').select().eq('idPlayer', id).order('id', { ascending: true });
            
            return result;
        } catch (error) {
            console.error('Error fetching decks:', error);
            return null;
        }
    }

    /**
     * Get number of players on DB
     * @params
     * @returns 
     */
    static async getNumPlayers() {
        try {
            const result = await connection.from('players').select('*', { count: 'exact', head: true });

            return result;
        } catch (error) {
            console.error('Error fetching players:', error);
            return null;
        }
    }
}