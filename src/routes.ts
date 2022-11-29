import { Router } from 'express'
import multer from 'multer'

import { AuthUserController } from './controllers/User/AuthUserController'
import { CreateUserController } from './controllers/User/CreateUserController'
import { EditUserController } from './controllers/User/EditUserController'


import { isAuthenticated } from './middlewares/isAuthenticated'

import { CreateProfileController } from './controllers/Profile/CreateProfileController'
import { ListProfilesController } from './controllers/Profile/ListProfilesController'
import { EditProfileController } from './controllers/Profile/EditProfileController'
import { EditDesignProfileController } from './controllers/Profile/EditDesignProfileController'
import { DeleteProfileController } from './controllers/Profile/DeleteProfileController'
import { ViewProfilePublicController } from './controllers/Profile/ViewProfilePublicController'

import { ListModulesController } from './controllers/Modules/ListModulesController'
import { OrderModulesController } from './controllers/Modules/OrderModulesController'

import { CreateLinkController } from './controllers/Link/CreateLinkController'
import { EditLinkController } from './controllers/Link/EditLinkController'
import { DeleteLinkController } from './controllers/Link/DeleteLinkController'

import { CreateSocialController } from './controllers/Social/CreateSocialController'
import { ListSociaisController } from './controllers/Social/ListSociaisController'
import { EditSocialController } from './controllers/Social/EditSocialController'
import { OrderSociaisController } from './controllers/Social/OrderSociaisController'
import { DeleteSocialController } from './controllers/Social/DeleteSocialController'

import { CreateTagController } from './controllers/Tag/CreateTagController'
import { ListTagsController } from './controllers/Tag/ListTagsController'
import { EditTagController } from './controllers/Tag/EditTagController'
import { DeleteTagController } from './controllers/Tag/DeleteTagController'
import { LinkTagController } from './controllers/Tag/LinkTagController'

import uploadConfig from './config/multer'

import { ShowCountViewController } from './controllers/Profile/ShowCountViewController'
import { ListUsersController } from './controllers/Admin/ListUsersController'
import { ListBatchsController } from './controllers/Admin/ListBatchsController'
import { CreateBatchController } from './controllers/Admin/CreateBatchController'
import { GetBatchController } from './controllers/Admin/GetBatchController'
import { AuthAdminController } from './controllers/Admin/AuthAdminController'
import { CreateAdminController } from './controllers/Admin/CreateAdminController'
import { DeleteUserController } from './controllers/User/DeleteUserController'
import { PasswordForgotController } from './controllers/User/PasswordForgotController'
import { PasswordResetController } from './controllers/User/PasswordResetController'
import { GetUserController } from './controllers/Admin/GetUserController'
import { GetProfileController } from './controllers/Profile/GetProfileController'
import { CreateTextController } from './controllers/Text/CreateTextController'
import { EditTextController } from './controllers/Text/EditTextController'
import { DeleteTextController } from './controllers/Text/DeleteTextController'
import { ListAdminProfilesController } from './controllers/Admin/ListAdminProfilesController'

const upload = multer(uploadConfig)

const router = Router()

// Routes Public

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.post('/session-admin', new AuthAdminController().handle)

router.get('/profile/:id', new ViewProfilePublicController().handle)
router.post('/password-forgot', new PasswordForgotController().handle)
router.post('/password-reset', new PasswordResetController().handle)

router.use(isAuthenticated)

// Routes Users
// router.post('/admin', new CreateAdminController().handle)
//router.post('/tag', new CreateTagController().handle)
router.put('/user', new EditUserController().handle)
router.post('/user-delete', new DeleteUserController().handle)

router.get('/modules/:id', new ListModulesController().handle)
router.put('/order-modules/:id', new OrderModulesController().handle)

router.post('/link', new CreateLinkController().handle)
router.put('/link/:id', new EditLinkController().handle)
router.delete('/link/:id', new DeleteLinkController().handle)

router.post('/text', new CreateTextController().handle)
router.put('/text/:id', new EditTextController().handle)
router.delete('/text/:id', new DeleteTextController().handle)

router.get('/sociais/:id', new ListSociaisController().handle)
router.post('/social', new CreateSocialController().handle)
router.put('/social/:id', new EditSocialController().handle)
router.put('/order-sociais/:id', new OrderSociaisController().handle)
router.delete('/social/:id', new DeleteSocialController().handle)


router.get('/profile-views/:profile_id', new ShowCountViewController().handle)
router.get('/profiles', new ListProfilesController().handle)
router.post('/profile', upload.single("file"), new CreateProfileController().handle)
router.get('/my-profile/:id', new GetProfileController().handle)
router.put('/profile/:id', upload.single("file"), new EditProfileController().handle)
router.put('/design-profile/:id', upload.single("file"), new EditDesignProfileController().handle)
router.delete('/profile/:id', new DeleteProfileController().handle)


router.get('/tags/:id', new ListTagsController().handle)
router.put('/tag/:id', new EditTagController().handle)
router.put('/link-tag/:id', new LinkTagController().handle)
router.delete('/tag/:id', new DeleteTagController().handle)

// Routes Admin

router.get('/admin/users', new ListUsersController().handle)
router.get('/admin/profiles', new ListAdminProfilesController().handle)
router.get('/admin/user/:id', new GetUserController().handle)
router.get('/admin/batchs', new ListBatchsController().handle)
router.get('/admin/batch/:id', new GetBatchController().handle)
router.post('/admin/batch', new CreateBatchController().handle)

export { router }