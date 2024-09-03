

export interface UserAttributes { // attributes sent by the user
    
    email: string;
    password: string;
    username: string;
    role: string;
    verified: boolean;
  }
  
  export interface findReturnAttributes {   //attributes returned by the database
  
    readonly id: number;
    email: string;
    username: string;
    password: string;
    role: string;
    verified: boolean;
  }

  export interface createReturnAttributes {   //attributes returned by the database
    readonly id: number;
    email: string;
    username: string;
  }

  export interface apiRegisterReturnAttributes{
    status: string,
    data: object,
    message: string,
    statusCode: number
  }

  export interface userLogin {
   email: string
   password: string
  }