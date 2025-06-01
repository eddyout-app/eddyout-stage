import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";
// import { User } from "./user.js";

interface TripAttributes {
  id: string;
  riverName: string;
  startDate: string;
  endDate: string;
  putIn: string;
  takeOut: string;
  crewNum: number;
  organizerId: string;
}

interface TripCreationAttributes extends Optional<TripAttributes, "id"> {}

export class Trip
  extends Model<TripAttributes, TripCreationAttributes>
  implements TripAttributes
{
  public id!: string;
  public riverName!: string;
  public startDate!: string;
  public endDate!: string;
  public putIn!: string;
  public takeOut!: string;
  public crewNum!: number;
  public organizerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TripFactory(sequelize: Sequelize): typeof Trip {
  Trip.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      riverName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isBeforeEndDate(value: string) {
            if (new Date(value) >= new Date(this.endDate as string)) {
              throw new Error("Start date must be before the end date");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAfterStartDate(value: string) {
            if (new Date(value) <= new Date(this.startDate as string)) {
              throw new Error("End date must be after the start date");
            }
          },
        },
      },
      putIn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      takeOut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      crewNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organizerId: {
        type: DataTypes.UUID, // ✅ match the type used in User
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Trip",
      tableName: "trips",
      timestamps: true,
    }
  );

  return Trip;
}
