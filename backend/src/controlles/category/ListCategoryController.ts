import { Response, Request } from "express";
import {ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController{
    async handle(req: Request, res: Response){

    const listCategoryService = new ListCategoryService();

    const categry = await listCategoryService.execute();

    return res.json(categry);
        
    }
}

export {ListCategoryController}