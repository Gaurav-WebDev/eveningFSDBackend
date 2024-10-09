const Student = require("../model/studentSchema");
const bcrypt = require("bcrypt");

// Api for Student Signup

exports.studentSignup = async(req , res)=>{

    try{
        const {password} = req.body;
        const hashPassword = bcrypt.hashSync(password ,  10);

        req.body.password = hashPassword;

        let newStudent = await new Student(req.body);
        let result = await newStudent.save()

        result = await result.toObject();  // POJO

        delete result.password;
        
        res.status(200).json({
            "message" : "Account Created" , 
            "data" : result
        })
    } catch(err){
        res.status(400).json({
            "message" : "Account not Created",
            "reason" : err.code == 11000 ? "Email already exist." : err
        })
    }
    
}

// API For get all students

exports.getAllStudents = async (req , res)=>{
    let students = await Student.find();
    res.status(200).json({"data" : students})
}


// API for Login Students
exports.loginStudentApi = async (req , res)=>{
    let {email , password} = req.body;

    let isUserExist = await Student.find({"email" : email});

    isUserExist = await isUserExist[0].json();

    if(isUserExist){
        let hashedPass = isUserExist.password;
        console.log(hashedPass);

        let isPasswordMatch = bcrypt.compareSync(password , hashedPass);

        delete isUserExist.password;

        if(isPasswordMatch){
            res.status(200).json({
                "message" : "Login Success",
                "data" : isUserExist
            })
        } else {
            res.status(400).json({
                "message" : "Login Failed",
                "reason" : "Password not Match!"
            })
        }

    } else {
        res.status(400).json({
            "message" : "Login Failed",
            "reason" : "Email not Found!" 
        })
    }


}