import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

type mealType = "Breakfast" | "Lunch" | "Dinner";

interface MealAttributes {
  id: string;
  mealName: string;
  mealType: mealType;
  crewMember: string;
  tripId: string;
  date: string; // Store date for meal
  description: string;
}

//TODO create breakfast lunch and dinner objects

interface MealCreationAttributes extends Optional<MealAttributes, "id"> { }

export class Meals extends Model<MealAttributes, MealCreationAttributes> {
  public id!: string;
  public tripId!: string;
  public date!: string;
  public mealType!: string;
  public mealName!: string;
  public description!: string | null;
  public crewMember!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function MealFactory(sequelize: Sequelize): typeof Meals {
  Meals.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,  // Store date for meal
        allowNull: false,
      },
      mealType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mealName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      crewMember: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Meal",
      tableName: "meals",
      timestamps: true,
    }
  );

  return Meals;
}
