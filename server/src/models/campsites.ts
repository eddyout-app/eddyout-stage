// import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

// interface CampsitesAttributes {
//   id: string;
//   date: Date;
//   campsite: string;
//   tripId: string;
// }

// interface CampsitesCreationAttributes
//   extends Optional<CampsitesAttributes, "id"> {}

// export class Campsites extends Model<
//   CampsitesAttributes,
//   CampsitesCreationAttributes
// > {
//   public id!: string;
//   public date!: Date;
//   public campsite!: string;
//   public tripId!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// export function CampsitesFactory(sequelize: Sequelize): typeof Campsites {
//   Campsites.init(
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       campsite: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       tripId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: "trips",
//           key: "id",
//         },
//       },
//     },
//     {
//       tableName: "campsites",
//       sequelize,
//     }
//   );
//   return Campsites;
// }
