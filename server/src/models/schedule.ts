import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

interface ScheduleAttributes {
  id: string;
  date: Date;
  campsite: string;
  tripId: string;
}

interface ScheduleCreationAttributes
  extends Optional<ScheduleAttributes, "id"> {}

export class Schedule extends Model<
  ScheduleAttributes,
  ScheduleCreationAttributes
> {
  public id!: string;
  public date!: Date;
  public campsite!: string;
  public tripId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function ScheduleFactory(sequelize: Sequelize): typeof Schedule {
  Schedule.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      campsite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "trips",
          key: "id",
        },
      },
    },
    {
      tableName: "schedule",
      sequelize,
    }
  );
  return Schedule;
}
