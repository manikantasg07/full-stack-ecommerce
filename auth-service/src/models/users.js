module.exports = (sequalize,DataTypes)=>{
    const users = sequalize.define(
        'users',
        {
            id:{
                type :DataTypes.UUID,
                defaultValue : DataTypes.UUIDV4,
                allowNull : false,
                primaryKey : true
            },
            firstName : {
                type : DataTypes.STRING(255),
                allowNull : false,
            },
            lastName : {
                type : DataTypes.STRING(255),
                allowNull : false,
            },
            email :{
                type : DataTypes.STRING(255),
                allowNull : false,
                unique:true
            },
            password:{
                type : DataTypes.STRING(255),
                allowNull : false,
            },
            role:{
                type :DataTypes.ENUM('admin','seller','customer'),
                allowNull:false,
                defaultValue : 'customer'
            }
        },{
            timestamps: true,
        }
    )
    // console.log("Model name: ",users.name);

    return users;
    
}