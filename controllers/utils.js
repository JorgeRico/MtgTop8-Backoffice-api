export class UtilsController {

    /**
     * @params page,  limit 
     * @returns 
     */
    static setPagination(page, limit) {
        return (page-1) * parseInt(limit);
    }

    /**
     * @params page, limit 
     * @returns 
     */
    static setLimit(page, limit) {
        return (parseInt(page) * parseInt(limit))-1;
    }
}