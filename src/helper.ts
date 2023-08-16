import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { runCustomQuery } from 'data-source';

// @Injectable()
export class Helper {
  static async role(id: String) {
    try {
      const sqlQuery = "SELECT roles.name FROM users LEFT JOIN model_has_roles ON model_has_roles.model_id = users.id AND model_has_roles.model_type = 'User' LEFT JOIN roles ON roles.id = model_has_roles.role_id WHERE users.id = ?"; // Use "?" as a placeholder for parameters
      const parameters = [id]; // Pass the parameters as an array
      const result = await runCustomQuery(sqlQuery, parameters);
      return result[0]?.name ?? null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  static async getIdFromIndex(array, value):Promise <any> {
    try {
      return array.indexOf(value) + 1
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}