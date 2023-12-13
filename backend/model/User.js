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
                type: Datatypes.ENUM("examiner", "scrutinizer", "headExaminer", "admin", "tabulator", "controller", "student"),
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
