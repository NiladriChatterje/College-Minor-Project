export default (sequelize, DataTypes) => {
    const Dept_Sem_Student_Subject_map = sequelize.define(
        "dept_sem_student_subject_maps",
        {
            semester: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Dept_Sem_Student_Subject_map",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    return Dept_Sem_Student_Subject_map;
};
