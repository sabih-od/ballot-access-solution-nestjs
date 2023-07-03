// import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

// @ValidatorConstraint({ async: true })
// export class ExistsValidator implements ValidatorConstraintInterface {
//   constructor(
//     @InjectRepository() private readonly repository: Repository<any>,
//   ) {}

//   async validate(value: any, args: ValidationArguments) {
//     const [entityName, columnName] = args.constraints as [string, string];

//     const count = await this.repository
//       .createQueryBuilder('entity')
//       .where(`entity.${columnName} = :value`, { value })
//       .getCount();

//     return count > 0;
//   }

//   defaultMessage(args: ValidationArguments) {
//     const [entityName, columnName] = args.constraints as [string, string];
//     return `${columnName} does not exist in ${entityName}`;
//   }
// }

// export function Exists(entityName: string, columnName: string, validationOptions?: ValidationOptions) {
//   return function (object: Record<string, any>, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [entityName, columnName],
//       validator: ExistsValidator,
//     });
//   };
// }