export default (sequelize, Datatypes) => {
    const Marks = sequelize.define(
        "marks",
        {
            semesterNo: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            marks: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            yearOfExam: {
                type: Datatypes.DATEONLY,
                allowNull: false,
            },
            creditPoint: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            remarks: {
                type: Datatypes.STRING,
                allowNull: true,
            },
            authorityLevel: {
                type: Datatypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Marks",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    return Marks;
};
