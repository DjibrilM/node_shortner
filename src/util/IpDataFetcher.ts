import { InternalServerErrorException } from '@nestjs/common';
import { IpInfo } from './shared/interfaces';

export const getVisitorInfo = async (ip: string):Promise<IpInfo> => {
  try {
    const response = fetch('http://ip-api.com/json');
    return (await response).json();
  } catch (error) {
    throw new InternalServerErrorException('failed to fetch the user');
  }
};
