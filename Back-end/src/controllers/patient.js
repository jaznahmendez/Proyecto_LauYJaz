const patient = require('../models/patient');
const { response } = require('express');
// nombre, correo, género

const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const file = require('../models/files')
const fs = require('fs');
const path = require('path')

const googleClient = new OAuth2Client(process.env.GOOGLE_ID)

class controladorPatient{
    static getPatientByToken(req, res) {
        let token = req.params.token
        let a = {}
        patient.find()
        .then(response => {
            for(let i = 0; i < response.length; i++)
            {
                let t = response[i]
                if(t.token == token) a = t; 
            }
            
            res.send(a)
        })
        .catch(error => {
            res.status(400).send()
        })
    }
    static upload(req, res) {
        //console.log('File: ', req.file);
        if(!req.file) {
            res.status(400).send("archivo no soportado")
            return
        }
        else {
            file.create({
                name: req.file.originalname,
                filename: req.file.filename,
                userId: req.params.id
            }).then(res => {
                res.send(response);
            }).catch(err => {
                const uri = path.join(__dirname, '..', '..', 'uploads', req.file.filename)
                fs.unlinkSync(uri);
                res.status(400).send(err)
            });
        }
    }
    static attachments(req, res) {
        file.find({
            userId: req.params.id
        }).then(response => {
            res.send(response)
        }).catch(err => {
            res.status(400).send(err)
        })
    }
    static googleLogin(req, res) {
        const idToken = req.body.googleToken
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            let a = {}
            patient.find()
            .then(response => {
                let exists = false;
                for(let i = 0; i < response.length; i++)
                {
                    let t = response[i]
                    if(t.email == user.email)
                    {
                        exists = true
                        a = t;
                    }
                }
                res.send(a)
            })
            .catch(error => {
                res.status(400).send()
            })
            res.send(a)
        }).catch(err => {
            res.status(401).send({msg: 'token inválido'})
        })
    }
    static updatePaciente(req, res){
        let obj = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age
        }
        let id = req.params.id;
        patient.findByIdAndUpdate(id, req.body, {new:true})
            .then(patient => {
                console.log('Paciente Actualizado');
                res.status(200).send(patient);
            })
            .catch(err => {
                console.log('error');
                res.send('No se logro actualizar el paciente ' + err);
            });
    }
}

module.exports = controladorPatient;