import exerciseController from "./exercise"
import appController from './app'
import setsController from './sets'
import userController from './user'

export const API = {
    app: appController,
    exercise: exerciseController,
    sets: setsController,
    user: userController
};