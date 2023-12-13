export default (sequelize, Datatypes) => {
    const Users = sequelize.define(
        "users",
        {
            userId: {
                type: Datatypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            authorityLevel: {
                type: Datatypes.ENUM("examiner", "scrutinizer", "head_examiner", "admin", "tabulator", "controller_of_examination", "student"),
            },
        },
        {
            sequelize,
            modelName: "Users",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    return Users;
};
