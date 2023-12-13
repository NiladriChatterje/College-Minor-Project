import db from "../model/index.js";

const UserDb = db.users;

export const ValidateUser = async (body) => {
    return await UserDb.findOne({
        where: {
            userId: body.id,
            password: body.password,
        },
        raw: true,
    }).catch((err) => {
        console.log(err);
    });
};
