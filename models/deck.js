import { connection } from '../middlewares/db.js';
export class DeckModel {
    /**
     * Logic to get a deck by ID from the database
     * @params id
     * @returns 
     */
    static async getDeckById({ id }) {
        try {
            const data = await connection.from('decks').select().eq('id', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching Deck by ID:', error);
            return null;
        }
    }

    static async playerHasDeck({ id }) {
        try {
            const data = await connection.from('decks').select('idPlayer').eq('id', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching Deck by ID:', error);
            return null;
        }
    }

    /**
     * Logic to get a deck by ID from the database
     * @params id
     * @returns 
     */
    static async getDeckCards({ id }) {
        try {
            const data = await connection.from('cards').select().eq('idDeck', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching Deck Cards:', error);
            return null;
        }
    }

    /**
     * Logic to update a deck by ID in the database
     * @params id, data
     * @returns 
     */
    static async updateDeckById({ id, data }) {
        try {
            const result = await connection.from('decks').update([data]).eq('id', id).select();

            return result;
        } catch (error) {
            console.error('Error updating Deck by ID:', error);
            return null;
        }
    }

    /**
     * Logic to create a new deck in the database
     * @params data
     * @returns 
     */
    static async createDeck({ data }) {
        try {
            // Get the last inserted id and increment it by 1
            const last_id   =  await connection.from('decks').select('id').order('id', { ascending: false }).limit(1);
            let lastIdValue = parseInt(last_id.data[0].id + 1);
            data.id = lastIdValue;

            const result = await connection.from('decks').insert([data]).select('*');

            return result;
        } catch (error) {
            console.error('Error creating Deck:', error);
            return null;
        }
    }

    /**
     * Logic to delete a deck by ID from the database
     * Delete idDeck from player
     * Delete cards related to deck
     * Delete deck
     * @params id
     * @returns 
     */
    static async deleteDeckById({ id }) {
        try {
            // delete idDeck on Player relation before delete deck
            const result = await connection.from('players').update([{'idDeck': null}]).eq('idDeck', id).select();
            if (!result.error) {
                // delete deck cards
                const cards = await connection.from('cards').delete().eq('idDeck', id).select(); 
                if (!cards.error) {
                    const data  = await connection.from('decks').delete().eq('id', id).select();
                    return data;
                }
            }
        } catch (error) {
            console.error('Error deleting Deck by ID:', error);
            return null;
        } 
    }

    /**
     * Get all decks with pagination
     * @params page, limit 
     * @returns 
     */
    static async getAllDecks({ page, limit }) {
        try {
            // needs a view - supabase actually does not support order by with more than 1 deep join
            const result = await connection.from('group_decks_by_league_year').select().range(page, limit);
            
            return result;
        } catch (error) {
            console.error('Error fetching decks:', error);
            return null;
        }
    }

    /**
     * Get number of decks on DB
     * @params
     * @returns 
     */
    static async getNumDecks() {
        try {
            const result = await connection.from('decks').select('*', { count: 'exact', head: true });

            return result;
        } catch (error) {
            console.error('Error fetching decks:', error);
            return null;
        }
    }
}   