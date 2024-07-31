import { Model, DataTypes, Sequelize } from 'sequelize';

export class Category extends Model {
  public id!: number;
  public name!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Category',
      }
    );
  }
}

export class Product extends Model {
  public id!: number;
  public name!: string;
  public category!: string;
  public quantity!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        category: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Product',
      }
    );
  }
}
