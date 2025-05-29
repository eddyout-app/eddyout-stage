import { DataTypes, type Sequelize, Model, Optional } from "sequelize";
//Create the items that are unique to crew
interface CrewAttributes {
  id: string;
  tripId: string;
  userId: string;
}

//extends the trip information associated with the crew member
interface CrewCreationAttributes extends Optional<CrewAttributes, "id"> {}

export class Crew extends Model<CrewAttributes, CrewCreationAttributes> {
  public id!: string;
  public tripId!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CrewFactory(sequelize: Sequelize): typeof Crew {
  Crew.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "trips",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "crew",
      sequelize,
    }
  );
  return Crew;
}
