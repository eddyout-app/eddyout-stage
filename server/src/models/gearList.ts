import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

interface GearListAttributes {
  id: string;
  gearList: string;
  tripId: string;
}

// EM: This warning appears to be a false positive warning on the UserCreationAttributes, leaving warning for now.
interface GearListCreationAttributes
  extends Optional<GearListAttributes, "id"> {}

export class GearList
  extends Model<GearListAttributes, GearListCreationAttributes>
  implements GearListAttributes
{
  public id!: string;
  public gearList!: string;
  public tripId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GearListFactory(sequelize: Sequelize): typeof GearList {
  GearList.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      gearList: {
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
      sequelize,
      tableName: "GearLists",
      timestamps: true,
    }
  );
  return GearList;
}
