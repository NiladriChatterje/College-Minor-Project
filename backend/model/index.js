import { DB, USER, HOST, PASSWORD, pool, port, dialect } from "../config/dbConfig.js";
import { DataTypes, Sequelize } from "sequelize";
import Subject from "./Subject.js";
import Student from "./Student.js";
import Department from "./Department.js";
import Marks from "./Marks.js";
import Dept_Sem_Subject_map from "./Dept_Sem_Subject_map.js";
import Dept_Sem_Student_Subject_map from "./Dept_Sem_Student_Subject_map.js";
import User from "./User.js";

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    port: port,
    operatorsAliases: 0,
    logging: true,
    // timezone: '+5:30',
    ...pool,
});
sequelize
    .authenticate()
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    });

const db = {};
db.sequelize = sequelize;
db.subjects = Subject(sequelize, DataTypes);
db.department = Department(sequelize, DataTypes);
db.student = Student(sequelize, DataTypes);
db.marks = Marks(sequelize, DataTypes);
db.users = User(sequelize, DataTypes);
db.dept_sem_student_subject_map = Dept_Sem_Student_Subject_map(sequelize, DataTypes);
db.dept_sem_subject_map = Dept_Sem_Subject_map(sequelize, DataTypes);
// db.student.hasOne(db.department)
db.department.hasMany(db.student);
// db.department.hasMany(db.marks)
// db.subjects.hasMany(db.marks)
// db.student.hasMany(db.marks)

db.dept_sem_subject_map.belongsTo(db.department);
db.dept_sem_subject_map.belongsTo(db.subjects);

db.dept_sem_student_subject_map.belongsTo(db.department);
db.dept_sem_student_subject_map.belongsTo(db.student);
db.dept_sem_student_subject_map.belongsTo(db.subjects);

db.marks.belongsTo(db.department);
db.marks.belongsTo(db.student);
db.marks.belongsTo(db.subjects);
db.sequelize.sync({ force: false, alter: false }).then(() => {
    console.log("db Sync Done");
});
export default db;
