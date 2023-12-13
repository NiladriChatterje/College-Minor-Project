export default (sequelize, Datatypes) => {
    const Department = sequelize.define(
        "departments",
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            departmentName: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            numberOfSem: {
                type: Datatypes.INTEGER,
                allowNull: false,
                defaultValue: 4,
            },
        },
        {
            sequelize,
            modelName: "Department",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );
    return Department;
};
