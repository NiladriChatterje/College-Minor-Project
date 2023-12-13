export default (sequelize, Datatypes) => {
    const Subject = sequelize.define(
        "subjects",
        {
            subject_name: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            subject_code: {
                type: Datatypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Subject",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    return Subject;
};
