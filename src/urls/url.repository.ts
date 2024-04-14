import { EntityRepository, Repository } from 'typeorm';
import { Url } from 'src/urls/url.entity';
import getPageMetaData from 'src/util/getPageMetadata';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {
  async creatUrl({
    owner,
    url,
    shortUrl,
    description,
    identifier,
  }: {
    owner: string;
    url: string;
    shortUrl: string;
    description: string;
    identifier: string;
  }) {
    const newUrl = new Url();
    const metadatas = await getPageMetaData();
    newUrl.description = description;
    newUrl.url = url;
    newUrl.owner = owner;
    newUrl.shortUrl = shortUrl;
    newUrl.urlIdentifier = identifier;
    newUrl.metadas = metadatas.metaDatas;
    newUrl.title = metadatas.title;
    return await newUrl.save();
  }

  async findUrlByShortUrl(urlIdentifier: string) {
    const url = await Url.findOne({ where: { urlIdentifier:urlIdentifier } });
    if (!url) throw new NotFoundException('Unkonown url');
    return url;
  }

  async findUserUrls(userid:string){
    return await Url.find({where:{owner:userid}});
  }
}
