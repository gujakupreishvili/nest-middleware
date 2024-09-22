import { BadRequestException, ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as geoip from 'geoip-lite';

@Injectable()
export class Checkdevice implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'];
    console.log('User-Agent:', userAgent);

    let device = '';
    if (userAgent.includes('Mobi')) {
      device = 'Mobile';
    } else if (userAgent.includes('Tablet')) {
      device = 'Tablet';
    } else {
      device = 'Desktop';
    }

    if (device !== 'Desktop') {
      throw new ForbiddenException('Only desktop devices are allowed');
    }

    next();
  }
}

@Injectable()
export class CheckUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['permition'];
    
    if (!key) throw new BadRequestException('Permission header is missing');
    
    if (req.method === 'GET' && key !== 'read') throw new BadRequestException('Invalid permission for GET');
    if (req.method === 'POST' && key !== 'create') throw new BadRequestException('Invalid permission for POST');
    
    next();
  }
}

@Injectable()
export class CheckTime implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const morningTime = 10;
    const nightTime = 18;
    const current = new Date().getHours();

    if (current < morningTime || current > nightTime) {
      throw new ForbiddenException('Access is only allowed between 10 AM and 6 PM');
    }

    console.log('Current Hour:', current);
    next();
  }
}

@Injectable()
export class FindUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const geo = geoip.lookup(ip);
    console.log('Geo-location:', geo);
    if (geo) {
      console.log(`IP: ${ip}`);
      console.log(`Country: ${geo.country}`);
      console.log(`Region: ${geo.region}`);
      console.log(`City: ${geo.city}`);
    } else {
      console.log('Geo-location not found for IP:', ip);
    }
    next();
  }
}
