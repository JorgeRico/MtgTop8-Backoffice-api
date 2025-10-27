export class LeagueModel {
    static async getLeagueById({ id }) {
        // Logic to get a league by ID from the database
    }       
    static async updateLeagueById({ id, data }) {
        // Logic to update a league by ID in the database
    }
    static async createLeague({ data }) {
        // Logic to create a new league in the database
    }
    static async deleteLeagueById({ id }) { 
        // Logic to delete a league by ID from the database
    }
    static async getAllLeagues({ page, limit }) {
        // Logic to get all leagues from the database
    }
    static async getTournamentsByLeagueId({ id }) {
        // Logic to get tournaments by league ID from the database
    }
}