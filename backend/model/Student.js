export default (sequelize, Datatypes) => {
    const Student = sequelize.define(
        "students",
        {
            studentName: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            stream: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            yearOfJoin: {
                type: Datatypes.DATEONLY,
                allowNull: false,
            },
            aadhaarNumber: {
                type: Datatypes.BIGINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Student",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    // Student.belongsTo(Department)
    return Student;
};
