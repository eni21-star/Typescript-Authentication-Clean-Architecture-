import { DataTypes, Model, Optional } from "sequelize";
import { pg } from "../config/pgConfig";

// Define the shape of the user attributes
interface UserAttributes {
    id: number;
    email: string;
    username: string;
    password?: string | null;
    role: string;
    verified: boolean
}

// Define creation attributes for a user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public readonly id!: number;
    public email!: string;
    public username!: string;
    public password?: string | null;
    public role!: string;
    public verified!: boolean
    
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export const userModel = pg.define<User>('users',{

    id: 
    {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    email: 
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: 
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: 
    {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    tableName: 'users'
})

