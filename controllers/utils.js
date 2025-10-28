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
     * @params limit 
     * @returns 
     */
    static setLimit(limit) {
        if (!limit || parseInt(limit) <= 0) {
            limit = 10;
        }

        return limit;
    }
}