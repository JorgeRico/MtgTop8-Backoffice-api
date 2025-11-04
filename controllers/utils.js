export class UtilsController {

    /**
     * @params page,  limit 
     * @returns 
     */
    static setPagination(page, limit) {
        if (!page || parseInt(page) <= 0) {
            page = 0;
        } else {
            page = (parseInt(page) - 1) * parseInt(limit);
        }
    
        return page;
    }

    /**
     * @params page, limit 
     * @returns 
     */
    static setLimit(page, limit) {
        if (!limit || parseInt(limit) <= 0) {
            limit = 10;
        }

        return parseInt(page) + parseInt(limit);
    }
}