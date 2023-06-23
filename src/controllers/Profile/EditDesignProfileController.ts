import { Request, Response } from 'express';
import { EditDesignProfileService } from '../../services/Profile/EditDesignProfileService';

class EditDesignProfileController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { background,
            button_color,
            font_button_color,
            font_color,
            font,
            background_visible,
            background_blur,
            button_opacity,
            save_contact,
            view_profile
        } = req.body

        let userId = req.userId

        let background_image = ""

        if (req.file) {
            background_image = req.file.filename
        }


        const editDesignProfileService = new EditDesignProfileService

        const profileEdited = await editDesignProfileService.execute({
            userId, id, background,
            button_color,
            font_button_color,
            font_color,
            font,
            background_image,
            background_visible,
            background_blur,
            button_opacity,
            save_contact,
            view_profile
        })

        return res.json(profileEdited)
    }
}

export { EditDesignProfileController }