const router = require('express').Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require("nodemailer");

dotenv.config();

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const frontEndData = JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
      const token = jwt.sign(
        frontEndData,
        process.env.JWT_SECRET,
        (err, token) => {
          res.status(200).send({
            msg: 'Usuário Conectado com Sucesso!',
            data: token,
            user: user,
          });
          if (err) console.log(err);
        },
        { expiresIn: 6 * 6 },
      );
    } else {
      res.status(401).json({ msg: 'Email ou Senha Inválido!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

router.post(
  '/register',
  check('email', 'O Email está Inválido').isEmail(),
  check(
    'password',
    'A senha precisa de pelo menos uma letra maíscula, minuscula, um numero e caractere especial',
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      let userRegisted = await User.findOne({ email });
      if (userRegisted) {
        res
          .status(400)
          .json({ erros: [{ msg: 'Este email já está cadastrado' }] });
      } else {
        await User.create({
          name,
          email,
          password: hash,
        });
        res.status(201).json({
          msg: 'Usuário criado com sucesso!',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Error');
    }
  },
);

router.post('/logout', (req, res) => {
  res.removeHeader('x-auth-token');
  res.send('You are Logged Out!');
});

router.post("/reset-password", async (req, res) => {
  console.log(req.body)

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, "msg": "Entre um email válido" })
  }

  try {
    const userfind = await User.findOne(email);
    if (userfind) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: userfind.email,
        subject: "Emai para troca de senha!",
        text: `Para trocar a senha acesse o link: https://sigus-app.vercel.app/forgotpassword/${userfind.id}/`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, "msg": "Email não enviado" })
        } else {
          res.status(201).json({ status: 201, "msg": "Email de reset de senha enviado com sucesso!" })
        }
      })
    }

  } catch (error) {
    res.status(401).json({ "msg": "invalid user" })
  }

});

router.get("/forgotpassword/:id", async (req, res) => {
  try {
    const validuser = await User.findById(req.params.id);

    if (validuser) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const updateUser = await User.findByIdAndUpdate(editUser._id, {
        password: hash,
      });
      updateUser.save();
      console.log(hash)
      console.log(password)

      res.status(201).json(updateUser)
    } else {
      res.status(401).json({ "msg": "Usuário não existe!" })
    }

  } catch (error) {
    res.status(401).json({ error })
  }
});


module.exports = router;
