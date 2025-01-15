import exerciseController from "./exercise";
import appController from './app'
import setsController from './sets'

export const API = {
    app: appController,
    exercise: exerciseController,
    sets: setsController
};