var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, Datatypes) {
    var User = sequelize.define("User", {

        name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            } // end of validate
        }, // end of firstname


        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }, // end of password
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }, // end of email
        bio: {
            type: Datatypes.TEXT,
            validate: {
                len: [1]
            } // end of validate
        }, // end of bio
        age: {
            type: Datatypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        }, // end of age
        sex: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        }, // end of sex
        picture: {
            type: Datatypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }, // end of picture
        uquizresults: {
            type: Datatypes.STRING
        },
        creditcard:{
            type: Datatypes.INTEGER,
            validate:{
                isCreditCard: true
            }
        },
        cvc: {
            type: Datatypes.INTEGER,
            validate: {
                isInt: true
            }
        }
    }, {
        // We're saying that we want our Author to have Posts
        // timestamps: false,
        classMethods: {
            associate: function(models) {
                // An Author (foreignKey) is required or a Post can't be made
                User.hasMany(models.Signup, {
                    onDelete: "cascade",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            validPassword: function(password, passwd, done, user) {
                bcrypt.compare(password, passwd, function(err, isMatch) {
                    if (err) console.log(err);
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        }
    });
    return User;
}
