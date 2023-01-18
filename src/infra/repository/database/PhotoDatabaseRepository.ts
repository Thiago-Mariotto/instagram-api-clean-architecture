import Photography from '../../../domain/entity/Photo';
import PhotoRepository from '../../../domain/repository/PhotoRepository';
import Connection from '../../database/Connection';

export default class PhotoDatabaseRepository implements PhotoRepository {
  constructor(readonly connection: Connection) { }
  async getById(id: string): Promise<Photography | undefined> {
    try {
      return await this.connection.query('SELECT * FROM photos WHERE id = ?', [id]);
    } catch (error: any) {
      console.log(`Error on SELECT Photos, ${error.message}`);
      throw { name: 'ServiceUnavailable' }
    }
  }
  async save(photo: Photography): Promise<void> {
    try {
      this.connection.query('INSERT INTO photos (id, owner_id, active, url, createad_at) VALUES (?, ?, ?, ?, ?)',
        [photo.identifier, photo.ownerId, photo.active, photo.url, photo.createdAt]);
    } catch (error: any) {
      console.log(`Error on SELECT Photos, ${error.message}`);
      throw { name: 'ServiceUnavailable' }
    }
  }
}