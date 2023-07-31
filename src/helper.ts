import { Injectable } from '@nestjs/common';
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
        // console.error(error.message);
    }
  }
}