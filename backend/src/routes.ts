import {Router, Request, Response } from 'express';
import multer from 'multer';

import { CreateUserController } from './controlles/user/createUserController';
import { AuthUserController } from './controlles/user/AuthUserController';
import { DetailuserController} from './controlles/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controlles/category/CreateCategoryController';
import { ListCategoryController } from './controlles/category/ListCategoryController';
import { CreateProductController } from './controlles/product/CreateProductController';
import { ListByCategoryController } from './controlles/product/ListByCategoryController';

import uploadConfig from './config/multer';
import { CreateOrderController } from './controlles/order/CreateOrderController';
import { RemoveOrderController } from './controlles/order/RemoveOrderController';
import { AddItemController } from './controlles/order/AddItemController';
import { RemoveItemController } from './controlles/order/RemoveItemController';
import { SendOrderController } from './controlles/order/SendOrderController';
import { ListOrderController } from './controlles/order/ListOrderController';
import { DetailOrderController } from './controlles/order/DetailOrderController';
import { FinishOrderController } from './controlles/order/FinishOrderController';


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//rotas de usuario

router.post('/user', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailuserController().handle)


//rotas de categoria

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//rotas de produtos

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//rotas order

router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrderController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };