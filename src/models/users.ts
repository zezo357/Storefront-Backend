import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env;

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

export class userStore {
  convertPassword(password: string):string{
    const hash = bcrypt.hashSync(
      password + (BCRYPT_PASSWORD as string), 
      parseInt((SALT_ROUNDS as string))
    );
    return hash;
  }
  updateUser(oldUser: User, newUser: User): User {
    let tempUser: User = oldUser;
    for (const [key, value] of Object.entries(tempUser)) {
      const temp = newUser[key as keyof User];
      if (
        temp != null &&
        temp != undefined &&
        temp != tempUser[key as keyof User]
      ) {
        console.log(
          'key:',
          key,
          '|||| old value:',
          value,
          '|||| new value:',
          temp
        );
        tempUser[key as keyof User] = temp;
      }
    }
    return tempUser;
  }
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM Users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cant index users ${err}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User|null> {
    try {
        const sql = "SELECT * FROM users WHERE username=($1)";
        const conn = await client.connect();
        const result = await conn.query(sql, [username]);
        conn.release();
        if(result.rows.length){
          const user = result.rows[0];
          //console.log(user);
          if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)){
            return user;
          }
        }
        return null;
      } catch (err) {
        throw new Error(`Could not find users ${username},${password}. Error: ${err}`);
      }
  }
  async insert(user: User): Promise<void> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO Users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.username,
        this.convertPassword(user.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant insert users ${err}`);
    }
  }
  async delete(id: String): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant delete users ${err}`);
    }
  }

  async show(id: String): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users ${id}. Error: ${err}`);
    }
  }
  async update(newUser: User): Promise<User> {
    let oldUser: User = await this.show(newUser.id);
    newUser = this.updateUser(oldUser, newUser);
    const hash = bcrypt.hashSync(
        newUser.password + (BCRYPT_PASSWORD as string), 
        parseInt((SALT_ROUNDS as string))
      );
    try {
      const conn = await client.connect();
      const sql = `Update users set first_name='${newUser.first_name}', last_name='${newUser.last_name}', username='${newUser.username}',password='${newUser.password}' WHERE id=($1) `;
      //console.log(sql);
      //const sql = 'Update set title FROM  books WHERE id=($1)';
      const result = await conn.query(sql, [newUser.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant Update users ${err}`);
    }
  }
}
