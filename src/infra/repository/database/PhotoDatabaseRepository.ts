import Photography from '../../../domain/entity/Photography';
import PhotoRepository from '../../../domain/repository/PhotographyRepository';
import Connection from '../../database/Connection';

export default class PhotoDatabaseRepository implements PhotoRepository {

  constructor(readonly connection: Connection) { }
  getById(id: string): Promise<Photography[]> {
    throw new Error('Method not implemented.');
  }

  async save(photo: Photography): Promise<void> {
    this.connection.query('INSERT INTO photos (id, owner_id, active, url, createad_at) VALUES (?, ?, ?, ?, ?)',
      [photo.identifier, photo.ownerId, photo.active, photo.url, photo.createdAt]);
  }
}