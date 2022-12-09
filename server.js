const express=require('express');
const mongoose = require("mongoose");
const app=express();
const cookieParser = require('cookie-parser');
const moment = require('moment');
app.set('view engine','ejs');
const Patient=require('./models/patient');
const patient=new Patient()
const Doctor=require('./models/doctor');
const Shedule=require('./models/shedule');
const available= require('./models/docAvaliable');
const pastApt=require('./models/pastApt');
const message=require('./models/msg');
const Query = require('./models/query');
const DupDoctor = require('./models/dupDoc');

const { stringify } = require('nodemon/lib/utils');
const { ObjectID } = require('bson');

let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aalhad.a20@iiits.in',
        pass: 'Jaysairaj@1'
    }
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const dbURI="mongodb+srv://aalhad:aalhad123@aalhad123.2dfdc.mongodb.net/project?retryWrites=true&w=majority"
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.log('connected to mongodb');
        app.listen(3000);
    })
    .catch((error)=>{
        console.log(error)
    })


class Patient123 {
    constructor(name,email,password,phone,dob,adhar,gender,allergies,medicalhistory) {
        this.name=name
        this.email=email
        this.password=password
        this.phone=phone
        this.dob=dob
        this.adhar=adhar
        this.gender=gender
        this.allergies=allergies
        this.medicalhistory=medicalhistory

    }
}
class Doctor123{

    constructor(name,email,password,phone,dob,adhar,gender,qu,dep,exp) {
        this.name=name
        this.email=email
        this.password=password
        this.phone=phone
        this.dob=dob
        this.adhar=adhar
        this.gender=gender
        this.experience=exp
        this.qualification=qu
        this.department=dep
    }
}
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.sendFile('views/home.html',{root:__dirname})
})
app.get('/forget',(req,res)=>{
    res.sendFile('views/forget.html',{root:__dirname})
})

app.post('/forget',async (req,res)=>{
console.log(req.body)
  Patient.findOne({email:req.body.email}, function(err, user) {
      if (err) {
          res.json({
              status: 0,
              message: err
          });
      }
      else if(user){

         let mailOptions = {
              from: 'aalhad.a20@iiits.in',
              to: req.body.email,
              subject: 'Your Password',
              text: "Your Password: "+ user.password
          };

          transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log(error);
                  res.json({
                      status: 0,
                      id: user._id,
                      message: "failed"
                  });
              } else {
                  console.log('Email sent: ' + info.response);
                  res.json({
                      status: 1,
                      id: user._id,
                      message: "success"
                  });
              }
          });


      }
      else
      {
          Doctor.findOne({email:req.body.email},function (err1,user1){
              if(err1){
                  res.json({
                      status: 0,
                      message: err1
                  });
              }
              else if(!user1)
              {
                  console.log('na')
                  res.json({
                      status: 0,
                      message: "not found"
                  });
              }
              else {

                  let mailOptions = {
                      from: 'aalhad.a20@iiits.in',
                      to: req.body.email,
                      subject: 'Your Password',
                      text: user.password
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                          console.log(error);
                      } else {
                          console.log('Email sent: ' + info.response);
                      }
                  });
                  res.json({
                      status: 1,
                      id: user1._id,
                      message: "successD"
                  });

              }
          })
      }


  })







})

app.get('/signup',(req,res)=>{
    res.sendFile('views/signup.html',{root:__dirname})
})
app.get('/signupd',(req,res)=>{
    res.sendFile('views/signupd.html',{root:__dirname})
})
app.get('/signin',(req,res)=>{
    res.sendFile('views/signin.html',{root:__dirname})
})
app.get('/doctorportal',(req,res)=>{


    message.find({idd: req.cookies.Did},(err5,msg)=>{
        pastApt.find({idd: req.cookies.Did},(err3,data3)=>{
            Patient.find({},(err2,data2)=>{
                Shedule.find({id: req.cookies.Did},(err,data1)=>{
                    console.log(data1)
                    Doctor.findOne({_id: req.cookies.Did}, (err, data) => {
                        res.render('doctorPortal', {data: data,data1: data1,pat:data2,past:data3,msg:msg,moment: moment })
                    })
                }).sort({slot :'asc'})
            })
        }).sort({date:'asc',slot:'asc'})
    }).sort({date:'asc'})







})


app.get('/patientportal',(req,res)=>{

   message.find({idp:req.cookies.id},(err5,msg)=>{
       pastApt.find({idp:req.cookies.id},(err2,data3)=>{
           Doctor.find({},(err,data)=>{

               Patient.findOne({_id:req.cookies.id},(err1,data1)=>{
                   res.render('patientPortal',{data:data,pdata:data1,past:data3,msg:msg,moment:moment})
               })
           })
       }).sort({date:'asc',slot:'asc'})

   }).sort({date:'asc'})
   })


app.get('/available',async(req,res)=>{
    available.find({idd:req.cookies.check},(err,data)=>{

            console.log(req.cookies.check)
            res.render('avaliable',{data:data})

    }).sort({slot:'asc'})
})
app.post('/doctorportal',(async (req ,res)=>{


      if(req.body.flag=='info')
      {

          let docObj= new Doctor123(req.body.name,undefined, req.body.pass1,req.body.phno,req.body.dob,req.body.adhar,req.body.gender,req.body.qualification,req.body.department,req.body.experience)
          delete docObj.email
          console.log(docObj)

          Doctor.findByIdAndUpdate(req.cookies.Did,docObj,(err,data)=>{
              if (err){
                  console.log(err)
              }
              else{
                  console.log("Updated User : ", data);
              }
          })

          res.json({status:"updated"});
      }
      if(req.body.flag=='slot')
      {
        await Shedule.insertMany([{
          id: req.cookies.Did,
          slot:req.body.slot
        }])
          await available.insertMany([{
              idd:req.cookies.Did,
              idp: "",
              slot:req.body.slot,
              available:'false',
              date: new Date()

          }])
          res.json({status:"slot"});
      }
    if(req.body.flag=='del')
    {
        console.log(req.body)
        await Shedule.findOneAndDelete([{
            id: req.cookies.Did,
            slot:req.body.slot
        }])
        res.json({status:"del"});
    }
    if(req.body.flag=="cancel")
    {
        console.log(req.body)
        available.findOneAndUpdate({idd:req.cookies.Did,idp:req.body.patid,slot:req.body.slot,available:'true'},{available:'false'},{},(err,doc)=>{
            if(doc)
            {
                let last = Date.now()- 1000*60*60*13;


                pastApt.findOneAndUpdate({idd:req.cookies.Did,idp:req.body.patid,slot:req.body.slot,status:'true',created_at:{$gt:last}},{status:'false'},{},(err1,apt)=>{
                    if(apt)
                    {
                        message.insertMany([{
                            idd:req.cookies.Did,
                            idp:req.body.patid,
                            slot:req.body.slot,
                            date:new Date()
                        }])
                        res.json({status:"yes"});

                    }
                    else {
                        console.log('not2');
                        res.json({status:"no"});
                    }
                })

            }
            else
            {
                console.log('not');
                res.json({status:"no"});
            }
        })
    }


}))
app.post('/patientportal',(async (req ,res)=>{

      if(req.body.flag=='info')
      {
          let patObj = new Patient123( req.body.name,null,req.body.pass1, req.body.phno, req.body.dob,req.body.adno,req.body.gender,null,null)
          delete patObj.medicalhistory
          delete patObj.allergies
          delete patObj.email
          // let up={
          //
          //
          //   password: req.body.pass1,
          //   name: req.body.name,
          //   phone: req.body.phno,
          //   dob: req.body.dob,
          //   adhar: req.body.adno,
          //   gender: req.body.gender,
          //
          //
          // }
          Patient.findByIdAndUpdate(req.cookies.id,patObj,(err,data)=>{
              if (err){
                  console.log(err)
              }
              else{
                  console.log("Updated User : ", data);
              }
          })

          res.json({status:"updated"});
      }
      else if(req.body.flag=='ok')
    {

        console.log(req.body)
         available.findOneAndUpdate({idd:req.body.docid,slot:req.body.slot,available:'false'},{idp:req.cookies.id,date:new Date(),available:'true'},null,async(err,doc)=>{

             if(doc)
             {

                await pastApt.insertMany([{
                    idd:req.body.docid,
                    idp:req.cookies.id,
                    date:new Date(),
                    slot:req.body.slot,
                    status:'true'

                }])
                 res.json({status:"ok"});

             }
             else {
                 available.findOne({idd:req.body.docid,slot:req.body.slot,available:'true'},async(err,res1)=>{
                     if(res1){

                         if(res1.date.getDate()!=new Date().getDate()) {
                             available.updateOne({idd:req.body.docid,slot:req.body.slot},{idp:req.cookies.id,date:new Date(),available:'true'},null,async(er1,da1)=>{

                                 if(da1)
                                 {
                                     await pastApt.insertMany([{
                                         idd:req.body.docid,
                                         idp:req.cookies.id,
                                         date:new Date(),
                                         slot:req.body.slot,
                                         status:'true'

                                     }])
                                     res.json({status:"ok"});
                                 }

                             })
                         }
                         else
                         {
                             res.json({status:"no"});
                         }

                     }
                     else
                     {
                         res.json({status:"no"});
                     }
                 })
             }
         })





    }
      else if(req.body.flag=="cancel")
      {
          available.findOneAndUpdate({idd:req.body.docid,idp:req.cookies.id,slot:req.body.slot,available:'true'},{available:'false'},{},(err,doc)=>{
              if(doc)
              {
                  let last = Date.now()- 1000*60*60*13;
                  console.log()

                  pastApt.findOneAndUpdate({idd:req.body.docid,idp:req.cookies.id,slot:req.body.slot,status:'true',created_at:{$gt:last}},{status:'false'},{},(err1,apt)=>{
                      if(apt)
                      {
                          message.insertMany([{
                              idd:req.body.docid,
                              idp:req.cookies.id,
                              slot:req.body.slot,
                              date:new Date()
                          }])
                          res.json({status:"yes"});
                      }
                      else {
                          console.log('not2');
                          res.json({status:"no"});
                      }
                  })

              }
              else
              {
                  console.log('not');
                  res.json({status:"no"});
              }
          })
      }
      else if(req.body.flag=="avb")
      {
          console.log(req.body);
          res.clearCookie('check');
          res.cookie('check',req.body.docid);
          res.json({status:"ok"});
      }



}))
app.post('/signup',(async (req, res) => {
    console.log(req.body);
    let patObj = new Patient123( req.body.name,req.body.email,req.body.pass1, req.body.phno, req.body.dob,req.body.adno,req.body.gender,req.body.allergies,req.body.history)
    await Patient.insertMany([patObj])
    res.json({status:"working"});
}))
app.post('/signupd',(async (req, res) => {

    let docObj= new Doctor123(req.body.name,req.body.email, req.body.pass1,req.body.phno,req.body.dob,req.body.adhar,req.body.gender,req.body.qualification,req.body.department,req.body.experience)

    await DupDoctor.insertMany([docObj])


    res.json({status:"working"});
}))
app.post('/signin',(async (req,res)=>{

    console.log((req.body));
    res.clearCookie('id');
    res.clearCookie('Did');
    // res.json({status:"working"})

   let data={
       email: req.body.email,
       password:req.body.password
   }


let to=0;
    Patient.findOne(data, function(err, user) {
        if (err) {
            res.json({
                status: 0,
                message: err
            });
        }
        else if(user){

        res.cookie('id',user._id);

        res.json({
            status: 1,
            id: user._id,
            message: "success"
        });

        }
        else
        {
            Doctor.findOne(data,function (err1,user1){
                if(err1){
                    res.json({
                        status: 0,
                        message: err1
                    });
                }
                else if(!user1)
                {
                    console.log('na')
                    res.json({
                        status: 0,
                        message: "not found"
                    });
                }
                else {
                    res.cookie('Did',user1._id);

                    res.json({
                        status: 1,
                        id: user1._id,
                        message: "successD"
                    });

                }
            })
        }


    })

}))
app.get('/admin', (req, res) => {
    Query.find({}, (err, qu) => {
        Patient.find({}, (err, pat) => {
            Doctor.find({}, (err, doc) => {
                DupDoctor.find({}, function (err, dupdoctors) {
                    res.render('admin', {
                        dupdoctorsList: dupdoctors,
                        patientsList: pat,
                        queriesList: qu,
                        doctorsList: doc
                    })
                })
            })
        })
    })
})
app.post('/admin', async (req, res) => {

    Query.deleteOne({ _id: ObjectID(req.body.queryname) }, (err, data) => {
        console.log("Doctor with id" + req.body.queryname + "is removed")
    })

    Doctor.deleteOne({ _id: ObjectID(req.body.docname) }, (err, data) => {
        console.log("Doctor with id" + req.body.docname + "is removed")
    })

    if(req.body.docdname!=undefined){
        DupDoctor.findOne({ _id: ObjectID(req.body.docdname) })
            .then(doc => {
                if(doc.email!=null){
                    console.log(doc.email);

                    Doctor.insertMany([doc])
                        .then(d => {
                            console.log("Saved Successfully");
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    let mailOptions = {
                        from: 'sricharand01@gmail.com',
                        to: doc.email,
                        subject: 'Accout',
                        text: 'Your Account is verified successfully.Now you can login to check your profile'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    DupDoctor.deleteOne({ _id: ObjectID(req.body.docdname) })
                        .then(d => {
                            console.log("Removed succesfully")
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }})
    }


    Patient.deleteOne({ _id: ObjectID(req.body.patname) }, (err, data) => {
        console.log("Patient with id" + req.body.patname + "is removed")
    })

    res.redirect('/admin')
})

app.post('/', (req, res) => {

    console.log(req.body)
    Query.insertMany([{
        email: req.body.emaiil,
        name: req.body.namee,
        phone: req.body.phonee,
        query: req.body.queryy,
    }])
    res.sendFile('views/home.html',{root:__dirname});

})