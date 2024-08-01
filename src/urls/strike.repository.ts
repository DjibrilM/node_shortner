import { Repository, EntityRepository } from 'typeorm';
import { Strike } from './strike.entity';
import { Url } from './url.entity';
import { getVisitorInfo } from 'src/util/IpDataFetcher';
import { Logger } from '@nestjs/common';

const logger = new Logger();

@EntityRepository(Strike)
export class StrikeRepository extends Repository<Strike> {
  async createStrike(url: Url, visitorIpAddress: string) {
    const visiotorInformation = await getVisitorInfo(visitorIpAddress); //contain thing link visitor's region,country, and all the geographical informations

    const newstrike = new Strike();
    newstrike.city = visiotorInformation.city;
    newstrike.country = visiotorInformation.country;
    newstrike.countryCode = visiotorInformation.countryCode;
    newstrike.lat = visiotorInformation.lat;
    newstrike.lon = visiotorInformation.lon;
    newstrike.region = visiotorInformation.region;
    newstrike.regionName = visiotorInformation.regionName;
    newstrike.timezone = visiotorInformation.timezone;
    newstrike.zip = visiotorInformation.zip;

    newstrike.url = url;

    try {
      return await newstrike.save();
    } catch (error) {
      console.log(error.message);
      logger.fatal('failed to create a strike ');
      return null;
    }
  }
}
