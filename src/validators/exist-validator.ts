// import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
// import { Repository, EntityTarget } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

// @ValidatorConstraint({ async: true })
// export class ExistsValidator<Entity> implements ValidatorConstraintInterface {
//   constructor(
//     @InjectRepository() private readonly repository: Repository<Entity>,
//   ) {}

//   async validate(value: any, args: ValidationArguments) {
//     const [entityName, columnName] = args.constraints as [string, string];

//     const count = await this.repository
//       .createQueryBuilder(entityName)
//       .where(`${columnName} = :value`, { value })
//       .getCount();

//     return count > 0;
//   }

//   defaultMessage(args: ValidationArguments) {
//     const [entityName, columnName] = args.constraints as [string, string];
//     return `${columnName} does not exist in ${entityName}`;
//   }
// }

// export function Exists<Entity>(entityName: string, columnName: string, validationOptions?: ValidationOptions) {
//   return function (object: Record<string, any>, propertyName: string) {
//     const entityClass: EntityTarget<Entity> = object.constructor; // Get the entity class
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [entityName, columnName],
//       validator: ExistsValidator as any, // 'as any' is used here to bypass the TypeScript error
//       data: entityClass, // Pass the entity class using the 'data' property
//     });
//   };
// }
