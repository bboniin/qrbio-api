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
import { DeleteUserController } from './controllers/User/DeleteUserController'
import { PasswordForgotController } from './controllers/User/PasswordForgotController'
import { PasswordResetController } from './controllers/User/PasswordResetController'
import { GetAdminUserController } from './controllers/Admin/GetAdminUserController'
import { GetProfileController } from './controllers/Profile/GetProfileController'
import { CreateTextController } from './controllers/Text/CreateTextController'
import { EditTextController } from './controllers/Text/EditTextController'
import { DeleteTextController } from './controllers/Text/DeleteTextController'
import { ListAdminProfilesController } from './controllers/Admin/ListAdminProfilesController'
import { PrintedBatchController } from './controllers/Admin/PrintedBatchController'
import { PrintedTagController } from './controllers/Admin/PrintedTagController'
import { PlanProfileController } from './controllers/Admin/PlanProfileController'
import { CreatePixController } from './controllers/Pix/CreatePixController'
import { EditPixController } from './controllers/Pix/EditPixController'
import { DeletePixController } from './controllers/Pix/DeletePixController'
import { CreatePixKeysController } from './controllers/Pix/CreatePixKeysController'
import { EditPixKeysController } from './controllers/Pix/EditPixKeysController'
import { DeletePixKeysController } from './controllers/Pix/DeletePixKeysController'
import { VerifyNicknameController } from './controllers/Profile/VerifyNicknameController'
import { ActivePixKeysController } from './controllers/Pix/ActivePixKeysController'
import { RelocateProfileController } from './controllers/Admin/RelocateTagController'
import { EditAdminUserController } from './controllers/Admin/EditAdminUserController'
import { GetUserController } from './controllers/User/GetUserController'
import { CreatePartnerController } from './controllers/Partner/CreatePartnerController'
import { ListPartnersController } from './controllers/Partner/ListPartnersController'
import { GetPartnerController } from './controllers/Partner/GetPartnerController'
import { EditPartnerController } from './controllers/Partner/EditPartnerController'
import { LinkPartnerController } from './controllers/Partner/LinkPartnerController'
import { DeletePartnerController } from './controllers/Partner/DeletePartnerController'
import { EditPasswordUserController } from './controllers/User/EditPasswordUserController'
import { NicknameProfileController } from './controllers/Admin/NicknameProfileController'
import { CreateEmergencyController } from './controllers/Emergency/CreateEmergencyController'
import { EditEmergencyController } from './controllers/Emergency/EditEmergencyController'
import { DeleteEmergencyController } from './controllers/Emergency/DeleteEmergencyController'
import { ActiveEmergencyContactController } from './controllers/Emergency/ActiveEmergencyContactController'
import { CreateEmergencyContactController } from './controllers/Emergency/CreateEmergencyContactController'
import { EditEmergencyContactController } from './controllers/Emergency/EditEmergencyContactController'
import { DeleteEmergencyContactController } from './controllers/Emergency/DeleteEmergencyContactController'
import { GetTagController } from './controllers/Tag/GetTagController'
import { ListAllPartnersController } from './controllers/Partner/ListAllPartnersController'
import { EditBatchController } from './controllers/Admin/EditBatchController'
import { CountProfilesController } from './controllers/Statistics/CountProfilesController'
import { ViewProfilesController } from './controllers/Statistics/ViewProfilesController'
import { ClearTagController } from './controllers/Tag/ClearTagController'
import { AddPlanController } from './controllers/Plan/AddPlanController'
import { GetPlanController } from './controllers/Plan/GetPlanController'
import { ListPurchasesController } from './controllers/Plan/ListPurchasesController'
import { CountProfileMonthController } from './controllers/Profile/CountProfileMonthController'
import { EmailConfirmController } from './controllers/User/EmailConfirmController'
import { SendEmailConfirmController } from './controllers/User/SendEmailConfirmController'
import { GetCouponController } from './controllers/Coupon/GetCouponController'
import { CreateBatchCouponController } from './controllers/Coupon/CreateBatchCouponController'
import { RescueCouponController } from './controllers/Coupon/RescueCouponController'
import { GetBatchCouponController } from './controllers/Coupon/GetBatchCouponController'
import { ListBatchCouponController } from './controllers/Coupon/ListBatchCouponController'
import { EditBatchCouponController } from './controllers/Coupon/EditBatchCouponController'
import { AdminDeleteUserController } from './controllers/Admin/AdminDeleteUserController'
import { PartnersProfileController } from './controllers/Profile/PartnersProfileController'
import { ActiveSocialController } from './controllers/Social/ActiveSocialController'

const upload = multer(uploadConfig)

const router = Router()

// Routes Public

router.get('/email-confirmation/:id', new EmailConfirmController().handle)
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

router.post('/send-email-confirmation', new SendEmailConfirmController().handle)
router.post('/plan', new AddPlanController().handle)
router.get('/plan/:id', new GetPlanController().handle)
router.get('/purchases/:id', new ListPurchasesController().handle)

router.put('/user', new EditUserController().handle)
router.put('/password', new EditPasswordUserController().handle)
router.get('/user', new GetUserController().handle)
router.post('/user-delete', new DeleteUserController().handle)

router.get('/modules/:id', new ListModulesController().handle)
router.put('/order-modules/:id', new OrderModulesController().handle)

router.post('/link', new CreateLinkController().handle)
router.put('/link/:id', new EditLinkController().handle)
router.delete('/link/:id', new DeleteLinkController().handle)

router.post('/text', new CreateTextController().handle)
router.put('/text/:id', new EditTextController().handle)
router.delete('/text/:id', new DeleteTextController().handle)

router.post('/text', new CreateTextController().handle)
router.put('/text/:id', new EditTextController().handle)
router.delete('/text/:id', new DeleteTextController().handle)

router.post('/pix', new CreatePixController().handle)
router.put('/pix/:id', new EditPixController().handle)
router.delete('/pix/:id', new DeletePixController().handle)

router.put('/active-pix-keys/:id', new ActivePixKeysController().handle)
router.post('/pix-keys', new CreatePixKeysController().handle)
router.put('/pix-keys/:id', new EditPixKeysController().handle)
router.delete('/pix-keys/:id', new DeletePixKeysController().handle)

router.post('/emergency', new CreateEmergencyController().handle)
router.put('/emergency/:id', new EditEmergencyController().handle)
router.delete('/emergency/:id', new DeleteEmergencyController().handle)

router.put('/active-emergency-contacts/:id', new ActiveEmergencyContactController().handle)
router.post('/emergency-contacts', new CreateEmergencyContactController().handle)
router.put('/emergency-contacts/:id', new EditEmergencyContactController().handle)
router.delete('/emergency-contacts/:id', new DeleteEmergencyContactController().handle)

router.get('/sociais/:id', new ListSociaisController().handle)
router.post('/social', new CreateSocialController().handle)
router.put('/social/:id', new EditSocialController().handle)
router.put('/order-sociais/:id', new OrderSociaisController().handle)
router.put('/active-sociais/:id', new ActiveSocialController().handle)
router.delete('/social/:id', new DeleteSocialController().handle)

router.get('/verify-nickname/:nickname', new VerifyNicknameController().handle)
router.get('/profile-views/:profile_id', new ShowCountViewController().handle)
router.get('/views-month/:profile_id', new CountProfileMonthController().handle)
router.get('/profiles', new ListProfilesController().handle)
router.post('/profile', upload.single("file"), new CreateProfileController().handle)
router.get('/my-profile/:id', new GetProfileController().handle)
router.put('/profile/:id', upload.single("file"), new EditProfileController().handle)
router.put('/design-profile/:id', upload.single("file"), new EditDesignProfileController().handle)
router.delete('/profile/:id', new DeleteProfileController().handle)

router.get('/tags/:id', new ListTagsController().handle)
router.put('/tag/:id', new EditTagController().handle)
router.put('/link-tag/:id', new LinkTagController().handle)
router.put('/clear-tag/:id', new ClearTagController().handle)
router.delete('/tag/:id', new DeleteTagController().handle)

router.get('/coupon/:id', new GetCouponController().handle)
router.post('/rescue-coupon/:id', new RescueCouponController().handle)

// Routes Admin

router.get('/admin/tag-batch/:id', new GetTagController().handle)
router.post('/admin/partner', upload.single("file"), new CreatePartnerController().handle)
router.get('/admin/all-partners', new ListAllPartnersController().handle)
router.get('/admin/partners', new ListPartnersController().handle)
router.get('/admin/partner/:id', new GetPartnerController().handle)
router.put('/admin/partner/:id', upload.single("file"), new EditPartnerController().handle)
router.put('/admin/association/:batch_id', new LinkPartnerController().handle)
router.delete('/admin/partner/:id', new DeletePartnerController().handle)

router.get('/admin/users', new ListUsersController().handle)
router.delete('/admin/delete-user/:user_id', new AdminDeleteUserController().handle)
router.get('/admin/profiles', new ListAdminProfilesController().handle)
router.post('/admin/partner-profile/:profile_id', new PartnersProfileController().handle)
router.put('/admin/profile-relocate/:nickname', new RelocateProfileController().handle)
router.post('/admin/plan-profile/:profile_id', new PlanProfileController().handle)
router.get('/admin/user/:id', new GetAdminUserController().handle)
router.get('/admin/batchs', new ListBatchsController().handle)
router.get('/admin/batch/:id', new GetBatchController().handle)
router.put('/admin/change-nickname/:id', new NicknameProfileController().handle)
router.post('/admin/batch', new CreateBatchController().handle)
router.put('/admin/batch/:id', new EditBatchController().handle)
router.put('/admin/print-batch/:id', new PrintedBatchController().handle)
router.put('/admin/print-tag/:id', new PrintedTagController().handle)
router.put('/admin/user-edit/:user_id', new EditAdminUserController().handle)

router.get('/admin/statistics/counts', new CountProfilesController().handle)
router.get('/admin/statistics/features', new ViewProfilesController().handle)

router.get('/admin/batchs-coupons', new ListBatchCouponController().handle)
router.get('/admin/batch-coupons/:id', new GetBatchCouponController().handle)
router.post('/admin/batch-coupons', new CreateBatchCouponController().handle)
router.put('/admin/batch-coupons/:id', new EditBatchCouponController().handle)

export { router }