import { getCollection } from '../utils/mongoClient.js';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'todo_mindora';

class Task {
  static async getCollection() {
    return await getCollection(COLLECTION_NAME);
  }

  static async findAll() {
    try {
      const collection = await this.getCollection();
      return await collection.find().toArray();
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const collection = await this.getCollection();
      
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const objectId = new ObjectId(id);
      return await collection.findOne({ _id: objectId });
    } catch (error) {
      throw new Error(`Error fetching task: ${error.message}`);
    }
  }
  // estado, debe ser un booleano
  static async findByStatus(estado) {
    try {
      const collection = await this.getCollection();
      return await collection.find({ completada: estado }).toArray();
    } catch (error) {
      throw new Error(`Error fetching tasks by status: ${error.message}`);
    }
  }

  static async create(taskData) {
    try {
      const collection = await this.getCollection();
      const result = await collection.insertOne({
        ...taskData,
        creadoEn: new Date(),
        actualizadoEn: new Date(),
        completada: false,
        completadaEn: null
      });
      return result.insertedId;
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }

  static async update(id, updateData) {
    try {
      const collection = await this.getCollection();
      
      // Validar y convertir el string a ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const objectId = new ObjectId(id);
      const result = await collection.updateOne(
        { _id: objectId },
        { 
          $set: {
            ...updateData,
            actualizadoEn: new Date()
          }
        }
      );
      return result.modifiedCount;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const collection = await this.getCollection();
      
      // Validar y convertir el string a ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      const objectId = new ObjectId(id);
      const result = await collection.deleteOne({ _id: objectId });
      return result.deletedCount;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }

}

export default Task;