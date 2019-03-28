const bcrypt = require( 'bcrypt' );

module.exports = {

  Query: {
    /*
     ** Product fetching 
     */
    getProducts: async ( _, args, {
      Product
    } ) => {
      const product = await Product.find( {} ).sort( {
        dateOfAdd: 'desc'
      } ).populate( {
        path: 'createdBy',
        model: 'Shop'
      } );
      return product;
    },
    /*
     ** User fetching 
     */
    getUser: async ( _, {
      userName
    }, {
      User
    } ) => {
      const user = await User.findOne( {
        userName
      } );
      if ( user ) {
        return user;
      } else {
        throw new Error( 'User dosen\'t exists' );
      }
    }
  },

  Mutation: {
    /*
     ** User signup 
     */
    signup: async ( _, {
      firstName,
      lastName,
      contactNo,
      email,
      password,
      userName,
      dateOfBirth,
    }, {
      User
    } ) => {
      const user = await User.findOne( {
        userName
      } );
      if ( user ) {
        throw new Error( 'User already exists' );
      }

      const newUser = await new User( {
        firstName,
        lastName,
        contactNo,
        email,
        password,
        userName,
        dateOfBirth,
      } ).save();
      return newUser;

    },
    /*
     ** Sign in user
     */
    signin: async ( _, {
      userName,
      password
    }, {
      User
    } ) => {
      const user = await User.findOne( {
        userName
      } );
      if ( !user ) {
        throw new Error( 'User not found' );
      }

      const isValidPassword = await bcrypt.compare( password, user.password );
      if ( !isValidPassword ) {
        throw new Error( "Invalid password" );
      }
      return user;
    },

    /*
     ** Add new product 
     */
    addProduct: async ( _, {
      productName,
      price,
      description,
      tag,
      category,
      size,
      color,
      parent,
      picture,
      creatorId,
    }, {
      Product
    } ) => {
      const newProduct = new Product( {
        productName,
        price,
        description,
        tag,
        category,
        size,
        color,
        parent,
        picture,
        createdBy: creatorId,
      } ).save();
      return newProduct;
    },
    /*
     ** New shop created here 
     */
    createShop: async ( _, {
      shopName,
      ownerId,
      email,
      contactNo,
      address,
    }, {
      Shop
    } ) => {
      const shop = await Shop.findOne( {
        shopName
      } );
      if ( shop ) {
        throw new Error( 'This shop name already exists' );
      }

      const newShop = new Shop( {
        shopName,
        owner: ownerId,
        email,
        contactNo,
        address,
      } ).save();
      return newShop;
    }

    /* new one starts here */

  }
}
