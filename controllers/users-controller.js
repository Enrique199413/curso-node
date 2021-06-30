'use strict'

// Get all users
exports.getUsers = async (req, res) => { res.status(200).json({user:'Richie'}) }

// Add new user
exports.addUser = async (req, res) => { res.status(201).json({addedUser:'Richie'}) }
