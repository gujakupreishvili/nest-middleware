import { BadRequestException, ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
var geoip = require('geoip-lite');

@Injectable()
export class Checkdevice implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent']
    console.log(userAgent)
   let device =''
   if(userAgent.includes("Mobi")){
    device= "Mobile"
   }else if( userAgent.includes("Tablet")){
    device = "Tablet"
   }else{
    device = "Desktop"
   }
   if(device !== "Desktop"){
    throw new ForbiddenException('Only desktop devices are allowed')
   }

    next();
  }
}

@Injectable()
export class CheckUser implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction ) {
    const key = req.headers['permition']
    if(!key) throw new  BadRequestException()
    if(req.method === "GET" && key !== "read") throw new BadRequestException
    if(req.method === "POST" && key !== "creat") throw new BadRequestException
    next()
  } 
}
@Injectable()
export class CheckTime implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction ) {
    const morningTime = 10
    const nightTime = 18
    const current  = new Date().getHours()
    if(current  < morningTime || current  > nightTime) throw new ForbiddenException("something wrong")
    console.log(current )
  next()
  }
}
@Injectable()
export class FindUser implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction ) {
    const ip = req.ip;
    const geo = geoip.lookup(ip);
    console.log(geo, "geo ip")
    console.log(req.ip, "req.ip")
    next()
  }
}