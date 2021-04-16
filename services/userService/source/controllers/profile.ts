import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Profile from '../models/profile';



const createProfileForUser = (req: Request, res: Response) : Response<unknown, Record<string, unknown>> | void => {
    const { username, imageUrl, selfIntro, roomId } = req.body;

    const userId = req.params.uid;

    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        userId,
        username,
        imageUrl,
        selfIntro,
        roomId
    });

    Profile.find({ userId: req.params.uid })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    response: {},
                    message: 'user profile already exists',
                    isOK: false
                });
            } else {
                return profile
                    .save()
                    .then((result) => {
                        return res.status(201).json({
                            response: { result },
                            message: 'create profile for user successfully',
                            isOK: true
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            response: {},
                            message: error.message,
                            isOK: false
                        });
                    });
            }
        });
};

const getProfileById = (req: Request, res: Response): void => {
    const id = req.params.pid;

    Profile.findById(id)
        .exec()
        .then((data) => {
            if (!data)
                res.status(404).send({
                    response: {},
                    message: `profile id=${id} was not found`,
                    isOK: false
                });
            else
                res.status(200).send({
                    response: { data },
                    isOK: true,
                    message: 'get profile by ID successfully'
                });
        })
        .catch(() => {
            res.status(500).send({
                response: {},
                message: 'catch error and cannot get',
                isOK: false
            });
        });
};

const getAllProfiles = (req: Request, res: Response) : Response<unknown, Record<string, unknown>> | void => {
    Profile.find()
        .exec()
        .then((profiles) => {
            return res.status(200).json({
                response: { profiles },
                isOK: true,
                message: 'get all profiles successfully'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                response: {},
                message: error.message,
                isOK: false
            });
        });
    
};

const updateProfile = (req: Request, res: Response) : Response<unknown, Record<string, unknown>> | void => {
    if (!req) {
        return res.status(400).send({
            response: {},
            message: 'data to update can not be empty',
            isOK: false
        });
    }

    const id = req.params.pid;

    Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    response: {},
                    message: `profile id=${id} was not found`,
                    isOK: false
                });
            } else
                res.send({
                    response: {},
                    message: 'successfully update',
                    isOK: true
                });
        })
        .catch(() => {
            res.status(500).send({
                response: {},
                message: 'catch error and cannot update',
                isOK: false
            });
        });
};

const deleteProfile = (req: Request, res: Response) : Response<unknown, Record<string, unknown>> | void=> {
    const id = req.params.pid;

    Profile.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `profile id=${id} was not found`
                });
            } else {
                res.send({
                    message: 'successfully delete'
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: 'catch error and cannot delete'
            });
        });
};

const findProfileForUser = (req: Request, res: Response): void => {
    const userId = req.params['uid'];

    Profile.findOne({ userId: req.params['uid'] })
        .exec()
        .then((data) => {
            if (!data)
                res.status(404).send({
                    response: {},
                    message: `user id=${userId} was not found`,
                    isOK: false
                });
            else
                res.send({
                    response: { data },
                    isOK: true,
                    message: 'find profile for user successfully'
                });
        })
        .catch(() => {
            res.status(500).send({
                message: 'catch error and cannot get',
                isOK: false
            });
        });
};

export default { createProfileForUser, getAllProfiles, getProfileById, updateProfile, deleteProfile, findProfileForUser };
