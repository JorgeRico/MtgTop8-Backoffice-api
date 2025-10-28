import { connection } from '../middlewares/db.js';
export class CardModel {
    /**
     * Logic to get a card by ID from the database
     * @params id
     * @returns data
     */
    static async getCardById({ id }) {
        try {
            const data = await connection.from('cards').select().eq('id', id);
            
            return data;
        } catch (error) {
            console.error('Error fetching Card by ID:', error);
            return null;
        }
    }   

    /**
     * Logic to update a card by ID in the database
     * @params id, data
     * @returns 
     */
    static async updateCardById({ id, data }) {
        try {
            const result = await connection.from('cards').update([data]).eq('id', id).select();

            return result;
        } catch (error) {
            console.error('Error updating Card by ID:', error);
            return null;
        }
    }       

    /**
     * Logic to create a new card in the database
     * @params data
     * @returns data
     */
    static async createCard({ data }) {
        try {
            // Get the last inserted id and increment it by 1
            const last_id   =  await connection.from('cards').select('id').order('id', { ascending: false }).limit(1);
            let lastIdValue = parseInt(last_id.data[0].id + 1);
            data.id = lastIdValue;

            const result = await connection.from('cards').insert([data]).select('*');

            return result;
        } catch (error) {
            console.error('Error creating Card:', error);
            return null;
        }
    }

    /**
     * Logic to delete a card by ID from the database
     * @params id
     * @returns 
     */
    static async deleteCardById({ id }) {
        try {
            const data = await connection.from('cards').delete().eq('id', id).select();

            return data;
        } catch (error) {
            console.error('Error deleting Card by ID:', error);
            return null;
        } 
    }
}