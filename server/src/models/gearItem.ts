import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

interface GearItemAttributes {
  id: string;
  gearItem: string;
  quantity: number;
  claimedBy?: string;
  tripId?: string;
  gearListId: string;
  // gearListId: number;
}

// EM: This warning appears to be a false positive warning on the UserCreationAttributes, leaving warning for now.
interface GearItemCreationAttributes
  extends Optional<GearItemAttributes, "id" | "claimedBy"> {}

export class GearItem
  extends Model<GearItemAttributes, GearItemCreationAttributes>
  implements GearItemAttributes
{
  public id!: string;
  public gearItem!: string;
  public quantity!: number;
  public claimedBy?: string;
  public tripId?: string;
  public gearListId!: string;
  // public gearListId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GearItemFactory(sequelize: Sequelize): typeof GearItem {
  GearItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      gearItem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      claimedBy: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      gearListId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "GearItems",
      timestamps: true,
    }
  );
  return GearItem;
}
