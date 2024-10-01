const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../utils/jwt.utils");

// Create and Save a new User
exports.create = (req, res) => {
    if (
        !req.body.namaDepan ||
        !req.body.namaBelakang ||
        !req.body.email ||
        !req.body.password ||
        !req.body.posisi ||
        !req.body.divisi ||
        !req.body.cabang
    ) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const user = {
        userId: req.body.userId || null,
        namaDepan: req.body.namaDepan,
        namaBelakang: req.body.namaBelakang,
        jenisKelamin: req.body.jenisKelamin,
        tanggalLahir: req.body.tanggalLahir,
        email: req.body.email,
        noTelp: req.body.noTelp,
        alamat: req.body.alamat,
        kota: req.body.kota,
        password: req.body.password,
        posisi: req.body.posisi,
        divisi: req.body.divisi,
        cabang: req.body.cabang,
    };

    User.create(user)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the User.",
            });
        });
};

exports.findAll = (req, res) => {
    const {
        namaDepan,
        namaBelakang,
        email,
        posisi,
        divisi,
        cabang,
        sort,
        order = "ASC",
        and,
        or,
    } = req.query;
    let condition = {};

    if (and) {
        const andConditions = JSON.parse(and).map((cond) => {
            const key = Object.keys(cond)[0];
            return { [key]: { [Op.like]: `%${cond[key]}%` } };
        });
        condition = { [Op.and]: andConditions };
    } else if (or) {
        const orConditions = JSON.parse(or).map((cond) => {
            const key = Object.keys(cond)[0];
            return { [key]: { [Op.like]: `%${cond[key]}%` } };
        });
        condition = { [Op.or]: orConditions };
    } else {
        if (namaDepan) {
            condition.namaDepan = { [Op.like]: `%${namaDepan}%` };
        }
        if (namaBelakang) {
            condition.namaBelakang = { [Op.like]: `%${namaBelakang}%` };
        }
        if (email) {
            condition.email = { [Op.like]: `%${email}%` };
        }
        if (posisi) {
            condition.posisi = { [Op.like]: `%${posisi}%` };
        }
        if (divisi) {
            condition.divisi = { [Op.like]: `%${divisi}%` };
        }
        if (cabang) {
            condition.cabang = { [Op.like]: `%${cabang}%` };
        }
    }

    let orderCondition = [];
    if (sort) {
        orderCondition = [[sort, order.toUpperCase()]];
    }

    User.findAll({
        where: condition,
        order: orderCondition,
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id,
            });
        });
};

exports.updatePassword = (req, res) => {
    const id = req.params.id;
    const { password } = req.body;

    if (!password) {
        return res.status(400).send({
            message: "Password cannot be empty!",
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    User.update(
        { password: hashedPassword },
        {
            where: { id: id },
        }
    )
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User password was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating User with id=" + id,
            });
        });
};

exports.updateUserDetails = (req, res) => {
    const id = req.params.id;
    const {
        namaDepan,
        namaBelakang,
        jenisKelamin,
        tanggalLahir,
        email,
        noTelp,
        alamat,
        kota,
        posisi,
        divisi,
        cabang,
    } = req.body;

    // if (!namaDepan && !namaBelakang && !email) {
    //     return res.status(400).send({
    //         message: "At least one field (name or email) must be provided!",
    //     });
    // }

    const updateData = {};
    if (namaDepan) updateData.namaDepan = namaDepan;
    if (namaBelakang) updateData.namaBelakang = namaBelakang;
    if (jenisKelamin) updateData.jenisKelamin = jenisKelamin;
    if (tanggalLahir) updateData.tanggalLahir = tanggalLahir;
    if (email) updateData.email = email;
    if (noTelp) updateData.noTelp = noTelp;
    if (alamat) updateData.alamat = alamat;
    if (kota) updateData.kota = kota;
    if (posisi) updateData.posisi = posisi;
    if (divisi) updateData.divisi = divisi;
    if (cabang) updateData.cabang = cabang;

    User.update(updateData, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User details were updated successfully.",
                });
            } else {
                console.log(num);
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating User with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all users.",
            });
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body.data;
    
    User.findOne({
        where: { email: email },
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found!",
                });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!",
                });
            }

            const token = generateToken(user);
            
            User.update({accessToken: token}, {
                where: { id: user.id },
            })

            res.send({
                id: user.id,
                userId: user.userId,
                posisi: user.posisi,
                accessToken: token
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while logging in.",
            });
        });
};

exports.register = (req, res) => {
    console.log(req.body.data);
    
    // Check if all required fields are present
    if (
        !req.body.data.namaDepan ||
        !req.body.data.namaBelakang ||
        !req.body.data.email ||
        !req.body.data.password ||
        !req.body.data.posisi ||
        !req.body.data.divisi ||
        !req.body.data.cabang
    ) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Check if the user already exists
    User.findOne({
        where: { email: req.body.data.email },
    })
        .then((user) => {
            if (user) {
                return res.status(400).send({
                    message: "User already exists!",
                });
            } else {
                const newUser = {
                    userId: req.body.data.userId || null,
                    namaDepan: req.body.data.namaDepan,
                    namaBelakang: req.body.data.namaBelakang,
                    jenisKelamin: req.body.data.jenisKelamin,
                    tanggalLahir: req.body.data.tanggalLahir,
                    email: req.body.data.email,
                    noTelp: req.body.data.noTelp,
                    alamat: req.body.data.alamat,
                    kota: req.body.data.kota,
                    password: bcrypt.hashSync(req.body.data.password, 8),
                    posisi: req.body.data.posisi,
                    divisi: req.body.data.divisi,
                    cabang: req.body.data.cabang,
                };

                User.create(newUser)
                    .then((data) => {
                        // Exclude the password field in the response
                        const { password, ...userData } = data.toJSON();
                        res.send(userData);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating the User.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking for existing User.",
            });
        });
};

exports.checkToken = (req, res) => {
    const accessToken = req.params.accessToken;
    const decoded = verifyToken(accessToken);

    console.log(decoded);

    User.findOne({
        where: { id: decoded.id },
    }).then((user) => {
        if (user.accessToken == accessToken) {
            return res.status(200).send({
                message: "Token is valid!",
            });
        } else if (user.accessToken == null) {
            return res.status(401).send({
                message: "There is no token!",
            });
        }

        return res.status(401).send({
            message: "Token is invalid!",
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while checking token.",
        });
    });
}