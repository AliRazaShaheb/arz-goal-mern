import asyncHanlder from 'express-async-handler'
import { msgObj } from '../utils/helpers.js'


export const home = async(req, res)=>{
    res.json(msgObj("Welcome from Home"))
}