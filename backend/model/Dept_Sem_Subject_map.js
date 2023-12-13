export default (sequelize, Datatypes) => {
    const Dept_Sem_Subject_map = sequelize.define(
        "dept_sem_subject_maps",
        {
            semester: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Dept_Sem_Subject_map",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    return Dept_Sem_Subject_map;
};
