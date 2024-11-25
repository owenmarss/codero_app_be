const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../utils/jwt.utils");

// Create and Save a new User
exports.create = (req, res) => {
    if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.position ||
        !req.body.working_hour ||
        !req.body.branch
    ) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const user = {
        employee_id: req.body.employee_id || null,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        password: req.body.password,
        position: req.body.position,
        working_hour: req.body.working_hour,
        branch: req.body.branch,
        npwp: req.body.npwp || null,
        bank: req.body.bank || null,
        account_number: req.body.account_number || null,
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
        first_name,
        last_name,
        email,
        position,
        working_hour,
        branch,
        npwp,
        bank,
        account_number,
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
        if (first_name) {
            condition.first_name = { [Op.like]: `%${first_name}%` };
        }
        if (last_name) {
            condition.last_name = { [Op.like]: `%${last_name}%` };
        }
        if (email) {
            condition.email = { [Op.like]: `%${email}%` };
        }
        if (position) {
            condition.position = { [Op.like]: `%${position}%` };
        }
        if (working_hour) {
            condition.working_hour = { [Op.like]: `%${working_hour}%` };
        }
        if (branch) {
            condition.branch = { [Op.like]: `%${branch}%` };
        }
        if (npwp) {
            condition.npwp = { [Op.like]: `%${npwp}%` };
        }
        if (bank) {
            condition.bank = { [Op.like]: `%${bank}%` };
        }
        if (account_number) {
            condition.account_number = { [Op.like]: `%${account_number}%` };
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
        first_name,
        last_name,
        gender,
        birth_date,
        email,
        phone,
        address,
        city,
        position,
        working_hour,
        branch,
        npwp,
        bank,
        account_number
    } = req.body;

    // if (!first_name && !last_name && !email) {
    //     return res.status(400).send({
    //         message: "At least one field (name or email) must be provided!",
    //     });
    // }

    const updateData = {};
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (gender) updateData.gender = gender;
    if (birth_date) updateData.birth_date = birth_date;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (position) updateData.position = position;
    if (working_hour) updateData.working_hour = working_hour;
    if (branch) updateData.branch = branch;
    if (npwp) updateData.npwp = npwp;
    if (bank) updateData.bank = bank;
    if (account_number) updateData.account_number = account_number;

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
                employee_id: user.employee_id,
                position: user.position,
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
        !req.body.data.first_name ||
        !req.body.data.last_name ||
        !req.body.data.email ||
        !req.body.data.password ||
        !req.body.data.position ||
        !req.body.data.working_hour ||
        !req.body.data.branch 

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
                    employee_id: req.body.data.employee_id || null,
                    first_name: req.body.data.first_name,
                    last_name: req.body.data.last_name,
                    gender: req.body.data.gender,
                    birth_date: req.body.data.birth_date,
                    email: req.body.data.email,
                    phone: req.body.data.phone,
                    address: req.body.data.address,
                    city: req.body.data.city,
                    password: bcrypt.hashSync(req.body.data.password, 8),
                    position: req.body.data.position,
                    working_hour: req.body.data.working_hour,
                    branch: req.body.data.branch,
                    npwp: req.body.data.npwp || null,
                    bank: req.body.data.bank || null,
                    account_number: req.body.data.account_number || null,
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